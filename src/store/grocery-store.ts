import { create } from "zustand";
import { Platform } from "react-native";

// ========================
// BASE URL
// ========================
const getBaseUrl = () => {
  // 🔥 PRODUCTION (after deploy)
  const PROD_URL = "https://grocify.onrender.com";

  // 🔧 DEVELOPMENT (local testing)
  if (__DEV__) {
    if (Platform.OS === "android") {
      return "http://10.0.2.2:3000";
    }
    return "http://localhost:3000";
  }

  // 🚀 APK / Production
  return PROD_URL;
};

const BASE_URL = getBaseUrl();

// ========================
// TYPES
// ========================
export type GroceryCategory =
  | "Produce"
  | "Dairy"
  | "Bakery"
  | "Pantry"
  | "Snacks";

export type GroceryPriority = "low" | "medium" | "high";

export type GroceryUnit = "pcs" | "kg" | "gm" | "litre" | "ml";

export type GroceryItem = {
  id: string;
  name: string;
  category: GroceryCategory;
  quantity: number;
  unit: GroceryUnit;
  purchased: boolean;
  priority: GroceryPriority;
};

export type CreateItemInput = {
  name: string;
  category: GroceryCategory;
  quantity: number;
  priority: string;
  unit: GroceryUnit;
};

type ItemsResponse = { items: GroceryItem[] };
type ItemResponse = { item: GroceryItem };

// ========================
// STORE TYPE
// ========================
type GroceryStore = {
  items: GroceryItem[];
  isLoading: boolean;
  error: string | null;

  loadItems: () => Promise<void>;
  addItem: (input: CreateItemInput) => Promise<GroceryItem | void>;
  removeItem: (id: string) => Promise<void>;
  togglePurchased: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
};

// ========================
// STORE
// ========================
export const useGroceryStore = create<GroceryStore>((set, get) => ({
  items: [],
  isLoading: false,
  error: null,

  // ========================
  // LOAD ITEMS
  // ========================
  loadItems: async () => {
    set({ isLoading: true, error: null });

    try {
      const res = await fetch(`${BASE_URL}/api/items`);

      if (!res.ok) {
        const text = await res.text();
        console.log("❌ Server error:", text);
        throw new Error(`Request failed (${res.status})`);
      }

      const data = (await res.json()) as ItemsResponse;
      set({ items: data.items });
    } catch (err) {
      console.error("❌ Load error:", err);
      set({ error: "Failed to load items" });
    } finally {
      set({ isLoading: false });
    }
  },

  // ========================
  // ADD ITEM
  // ========================
  addItem: async (input) => {
    set({ error: null });

    try {
      if (!input.name?.trim()) {
        set({ error: "Item name required" });
        return;
      }

      const body = {
        name: input.name.trim(),
        category: input.category,
        quantity: Math.max(1, input.quantity),
        priority: input.priority.toLowerCase(),
        unit: input.unit,
      };

      const res = await fetch(`${BASE_URL}/api/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const text = await res.text();
        console.log("❌ Server error:", text);
        throw new Error(`Request failed (${res.status})`);
      }

      const data = (await res.json()) as ItemResponse;

      set((state) => ({
        items: [data.item, ...state.items],
      }));

      return data.item;
    } catch (err) {
      console.error("❌ Add error:", err);
      set({ error: "Failed to add item" });
    }
  },

  // ========================
  // REMOVE ITEM
  // ========================
  removeItem: async (id) => {
    try {
      await fetch(`${BASE_URL}/api/items/${id}`, {
        method: "DELETE",
      });

      set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      }));
    } catch (err) {
      console.error("❌ Remove error:", err);
    }
  },

  // ========================
  // TOGGLE PURCHASED
  // ========================
  togglePurchased: async (id) => {
    const item = get().items.find((i) => i.id === id);
    if (!item) return;

    try {
      const res = await fetch(`${BASE_URL}/api/items/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          purchased: !item.purchased,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.log("❌ Server error:", text);
        throw new Error("Update failed");
      }

      const data = (await res.json()) as ItemResponse;

      set((state) => ({
        items: state.items.map((i) =>
          i.id === id ? data.item : i
        ),
      }));
    } catch (err) {
      console.error("❌ Toggle error:", err);
    }
  },

  // ========================
  // UPDATE QUANTITY
  // ========================
  updateQuantity: async (id, quantity) => {
    try {
      const res = await fetch(`${BASE_URL}/api/items/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: Math.max(1, quantity),
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.log("❌ Server error:", text);
        throw new Error("Update failed");
      }

      const data = (await res.json()) as ItemResponse;

      set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? data.item : item
        ),
      }));
    } catch (err) {
      console.error("❌ Quantity update error:", err);
    }
  },
}));