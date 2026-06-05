export const categoryConfig = {
  Groceries: { icon: "🛒", color: "#f97316" },
  Rent: { icon: "🏠", color: "#ef4444" },
  Salary: { icon: "💼", color: "#10b981" },
  Miscellaneous: { icon: "📦", color: "#ec4899" },
  Entertainment: { icon: "🎭", color: "#eab308" },
  Health: { icon: "🩺", color: "#3b82f6" },
  Investment: { icon: "📈", color: "#06b6d4" },
  Utilities: { icon: "⚡", color: "#8b5cf6" },
  Education: { icon: "📚", color: "#14b8a6" },
  Restaurants: { icon: "🍽️", color: "#f59e0b" },
  Savings: { icon: "💰", color: "#22c55e" },
  Transportation: { icon: "🚌", color: "#6366f1" },
  Insurance: { icon: "🛡️", color: "#84cc16" },
};

export function getIcon(category) {
  return categoryConfig[category]?.icon || "•";
}

export function getCategoryColor(category) {
  return categoryConfig[category]?.color || "#ef4444";
}
