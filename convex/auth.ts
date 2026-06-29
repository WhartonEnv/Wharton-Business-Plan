import { UserIdentity } from "convex/server";
import { QueryCtx, MutationCtx } from "./_generated/server";

/**
 * Returns the signed-in user's identity, or throws if not authenticated.
 * Clerk's "convex" JWT template should expose `role` from public metadata.
 */
export async function requireUser(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Not authenticated. Please sign in.");
  }
  return identity;
}

/** Role comes from Clerk public metadata, surfaced as a custom JWT claim. */
export function roleOf(identity: UserIdentity): string {
  const role = (identity as unknown as { role?: unknown }).role;
  return typeof role === "string" ? role : "viewer";
}

/** Throws unless the signed-in user has the `admin` role. */
export async function requireAdmin(ctx: QueryCtx | MutationCtx) {
  const identity = await requireUser(ctx);
  if (roleOf(identity) !== "admin") {
    throw new Error("Forbidden: this action requires an admin (director) role.");
  }
  return identity;
}
