export function getCategoryColor(category) {
  const colors = {
    Rent: "#ef4444",
    Groceries: "#f97316",
    Entertainment: "#eab308",
    Health: "#3b82f6",
    Utilities: "#8b5cf6",
    Salary: "#10b981",
    Investment: "#06b6d4",
    Miscellaneous: "#ec4899",
    Education: "#14b8a6",
    Restaurants: "#f59e0b",
    Savings: "#22c55e",
    Transportation: "#6366f1",
    Insurance: "#84cc16",
  };
  return colors[category] || "#ef4444";
}
