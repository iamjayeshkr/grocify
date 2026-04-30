import { useGroceryStore } from "@/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

const CompletedItems = () => {
  const { removeItem, togglePurchased, items } = useGroceryStore();
  const completedItems = items.filter((item) => item.purchased);

  if (!completedItems.length) return null;

  return (
    <View className="mt-4 rounded-3xl border border-border bg-secondary/60 p-4">
      {/* Header */}
      <Text className="text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
        Completed
      </Text>

      {/* Items */}
      <View className="mt-3 gap-3">
        {completedItems.map((item) => (
          <View
            key={item.id}
            className="flex-row items-center justify-between rounded-2xl border border-border bg-card px-4 py-3"
          >
            {/* Left Section */}
            <View className="flex-1 flex-row items-center gap-3">
              {/* Checkbox */}
              <Pressable
                onPress={() => togglePurchased(item.id)}
                className="h-7 w-7 items-center justify-center rounded-full bg-primary"
              >
                <FontAwesome6 name="check" size={12} color="#fff" />
              </Pressable>

              {/* Name + Quantity */}
              <View>
                <Text className="text-base text-muted-foreground line-through">
                  {item.name}
                </Text>
                <Text className="text-xs text-muted-foreground">
                  {item.quantity} {item.unit || "pcs"}
                </Text>
              </View>
            </View>

            {/* Delete Button */}
            <Pressable
              onPress={() => removeItem(item.id)}
              className="ml-3 h-9 w-9 items-center justify-center rounded-xl bg-destructive/20"
            >
              <FontAwesome6 name="trash" size={14} color="#d45f58" />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};

export default CompletedItems;