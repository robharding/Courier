import { ConvexError, v } from "convex/values";
import { MutationCtx, QueryCtx, internalMutation } from "./_generated/server";
import { Doc } from "./_generated/dataModel";

export async function getUser(
  ctx: QueryCtx | MutationCtx,
  tokenIdentifier: string
) {
  const user = await ctx.db
    .query("users")
    .withIndex("by_tokenIdentifier", (q) =>
      q.eq("tokenIdentifier", tokenIdentifier)
    )
    .unique();

  return user;
}

export async function getLoggedInUser(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) {
    throw new ConvexError("Not logged in");
  }

  const user = await getUser(ctx, identity.tokenIdentifier);

  return user;
}

export function isUserInOrg(user: Doc<"users">, orgId: string) {
  return user.orgIds.includes(orgId);
}

export const createUser = internalMutation({
  args: {
    tokenIdentifier: v.string(),
    id: v.string(),
  },
  async handler(ctx, args) {
    await ctx.db.insert("users", {
      tokenIdentifier: args.tokenIdentifier,
      orgIds: [args.id], // make user a member of their personal organization
    });
  },
});

export const createOrganizationMembership = internalMutation({
  args: {
    tokenIdentifier: v.string(),
    organizationId: v.string(),
  },
  async handler(ctx, args) {
    const user = await getUser(ctx, args.tokenIdentifier);
    if (!user) throw new ConvexError("User not found");

    await ctx.db.patch(user._id, {
      orgIds: [...user.orgIds, args.organizationId],
    });
  },
});
