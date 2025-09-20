export const mockGrantAgreements = [
  {
    id: 1,
    donor: "Healthcare Foundation",
    amount: 150000,
    available: 45000,
    restrictions: [
      "Emergency medical supplies only",
      "No administrative costs",
      "Must serve low-income populations"
    ],
    allowedCategories: ["medical supplies", "emergency", "healthcare", "medication"],
    prohibitedCategories: ["administrative", "salaries", "office supplies"]
  },
  {
    id: 2,
    donor: "Community Support Fund",
    amount: 75000,
    available: 28000,
    restrictions: [
      "Housing and shelter programs only",
      "Maximum 10% for utilities",
      "Must provide quarterly reports"
    ],
    allowedCategories: ["housing", "shelter", "utilities", "rent", "emergency housing"],
    prohibitedCategories: ["medical", "food", "transportation"]
  },
  {
    id: 3,
    donor: "Emergency Relief Grant",
    amount: 200000,
    available: 75000,
    restrictions: [
      "Emergency response only",
      "Must be used within 30 days of disaster declaration",
      "Transportation and food assistance allowed"
    ],
    allowedCategories: ["emergency", "disaster", "food", "transportation", "evacuation"],
    prohibitedCategories: ["long-term programs", "construction", "equipment"]
  },
  {
    id: 4,
    donor: "General Operations Fund",
    amount: 100000,
    available: 60000,
    restrictions: [
      "Unrestricted use for organizational operations",
      "Preference for program support over administrative"
    ],
    allowedCategories: ["operations", "administrative", "programs", "general", "office"],
    prohibitedCategories: []
  }
];