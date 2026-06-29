import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./auth";

const DEFAULTS = {
  key: "global",
  fullTimeWeekHours: 39.5,
  availableHoursPerYear: 1798,
  mileageAndExpenses: 41000,
  otherIncome: 42000,
  employerNiRate: 0.138,
};

export const get = query({
  args: {},
  handler: async (ctx) => {
    // Don't throw before the token is attached; defaults are safe to return.
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return DEFAULTS;
    const row = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "global"))
      .unique();
    return row ?? DEFAULTS;
  },
});

export const update = mutation({
  args: {
    fullTimeWeekHours: v.optional(v.number()),
    availableHoursPerYear: v.optional(v.number()),
    mileageAndExpenses: v.optional(v.number()),
    otherIncome: v.optional(v.number()),
    employerNiRate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const row = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "global"))
      .unique();
    const clean = Object.fromEntries(
      Object.entries(args).filter(([, val]) => val !== undefined)
    );
    if (row) {
      await ctx.db.patch(row._id, clean);
    } else {
      await ctx.db.insert("settings", { ...DEFAULTS, ...clean });
    }
  },
});
