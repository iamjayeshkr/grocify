import { create } from "zustand";
import { Platform } from "react-native";

// 🔥 AUTO FIX BASE URL
const getBaseUrl = () => {
  if (Platform.OS === "android") {
    // Android emulator
    return "http://10.0.2.2:3000";
  }
  // iOS simulator works with localhost
  return "http://localhost:3000";
};

// 👉 IF USING REAL PHONE → replace manually:
// return "http://192.168.X.X:3000";

const BASE_URL = getBaseUrl();

export type GroceryCategory =
  | "Produce"
  | "Dairy"
  | "Bakery"
  | "Pantry"
  | "Snacks";

export type GroceryPriority = "low" | "medium" | "high";

export type GroceryItem = {
  id: string;
  name: string;
  category: GroceryCategory;
  quantity: number;
  purchased: boolean;
  priority: GroceryPriority;
};

export type CreateItemInput = {
  name: string;
  category: GroceryCategory;
  quantity: number;
  priority: string; // UI value (Low/Medium/High)
};

type ItemsResponse = { items: GroceryItem[] };
type ItemResponse = { item: GroceryItem };

type GroceryStore = {
  items: GroceryItem[];
  isLoading: boolean;
  error: string | null;
  loadItems: () => Promise<void>;
  addItem: (input: CreateItemInput) => Promise<GroceryItem | void>;
};

export const useGroceryStore = create<GroceryStore>((set) => ({
  items: [],
  isLoading: false,
  error: null,

  // ✅ LOAD ITEMS
  loadItems: async () => {
    set({ isLoading: true, error: null });

    try {
      console.log("📡 Fetching:", `${BASE_URL}/api/items`);

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

  // ✅ ADD ITEM
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
        priority: input.priority.toLowerCase(), // 🔥 FIX
      };

      console.log("📤 Sending:", body);

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
}));