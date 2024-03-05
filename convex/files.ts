import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getLoggedInUser, getUser, isUserInOrg } from "./users";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const createFile = mutation({
  args: {
    name: v.string(),
    orgId: v.string(),
    storageId: v.id("_storage"),
    userId: v.string(),
  },
  async handler(ctx, { name, orgId, storageId, userId }) {
    const user = await getLoggedInUser(ctx);
    if (!user) throw new ConvexError("User not found");

    if (!isUserInOrg(user, orgId)) {
      throw new ConvexError(
        "You must be a member of the organization to create a file"
      );
    }

    const file = await ctx.db.insert("files", {
      name,
      orgId,
      storageId,
      userId,
    });
    return file;
  },
});

export const getFiles = query({
  args: {
    orgId: v.string(),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await getUser(ctx, identity.tokenIdentifier);
    if (!user) return [];

    if (!isUserInOrg(user, args.orgId)) return [];

    const files = ctx.db
      .query("files")
      .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
      .collect();
    return files;
  },
});
