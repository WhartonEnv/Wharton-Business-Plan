import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // The team — drives the Salary, Bonus and Utilisation tracker tabs.
  teamMembers: defineTable({
    name: v.string(),
    grade: v.string(),
    salary: v.number(), // annual gross salary in £
    feeEarner: v.boolean(),
    // Fee-earner-only fields (optional for support/admin staff)
    ratePerHour: v.optional(v.number()), // charge-out rate £/hr
    targetUtilPct: v.optional(v.number()), // e.g. 80 means 80%
    contractedHoursPerWeek: v.optional(v.number()), // full time = 39.5
    order: v.number(), // display order
  }).index("by_order", ["order"]),

  // Global assumptions shared across calculations (single row, key "global").
  settings: defineTable({
    key: v.string(),
    fullTimeWeekHours: v.number(), // 39.5
    availableHoursPerYear: v.number(), // 1798 at full time / 100% util
    mileageAndExpenses: v.number(), // recharge income
    otherIncome: v.number(), // Roots + other
    employerNiRate: v.number(), // 0.138
  }).index("by_key", ["key"]),
});
