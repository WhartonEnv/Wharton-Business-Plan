import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin, roleOf } from "./auth";

// --- Reads (any signed-in user) ---

export const list = query({
  args: {},
  handler: async (ctx) => {
    // Always-subscribed read: return [] (don't throw) before the auth token is
    // attached, to avoid console error spam on load and token refresh.
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    return await ctx.db.query("teamMembers").withIndex("by_order").collect();
  },
});

/** Convenience: is the current user an admin (director)? */
export const myRole = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    return { name: identity.name ?? null, role: roleOf(identity) };
  },
});

// --- Writes (admin only) ---

export const update = mutation({
  args: {
    id: v.id("teamMembers"),
    salary: v.optional(v.number()),
    grade: v.optional(v.string()),
    ratePerHour: v.optional(v.number()),
    targetUtilPct: v.optional(v.number()),
    contractedHoursPerWeek: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const { id, ...patch } = args;
    // Drop undefined keys so we only patch provided fields.
    const clean = Object.fromEntries(
      Object.entries(patch).filter(([, val]) => val !== undefined)
    );
    await ctx.db.patch(id, clean);
    return id;
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    grade: v.string(),
    salary: v.number(),
    feeEarner: v.boolean(),
    ratePerHour: v.optional(v.number()),
    targetUtilPct: v.optional(v.number()),
    contractedHoursPerWeek: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const existing = await ctx.db.query("teamMembers").collect();
    const order = existing.length;
    return await ctx.db.insert("teamMembers", { ...args, order });
  },
});

export const remove = mutation({
  args: { id: v.id("teamMembers") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.delete(args.id);
  },
});
