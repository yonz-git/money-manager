export function getIcon(category) {
  const map = {
    Groceries: "🛒",
    Rent: "🏠",
    Salary: "💼",
    Miscellaneous: "📦",
    Entertainment: "🎭",
    Health: "🩺",
    Investment: "📈",
    Utilities: "⚡",
    Education: "📚",
    Restaurants: "🍽️",
    Savings: "💰",
    Transportation: "🚌",
    Insurance: "🛡️",
  };
  return map[category] || "•";
}
