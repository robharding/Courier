import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getLoggedInUser, getUser, isUserInOrg } from "./users";
import { fileTypes } from "./schema";

export const generateUploadUrl = mutation(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new ConvexError("You must be logged in to generate an upload url");
  }
  return await ctx.storage.generateUploadUrl();
});

export const createFile = mutation({
  args: {
    name: v.string(),
    type: fileTypes,
    orgId: v.string(),
    storageId: v.id("_storage"),
    userId: v.string(),
  },
  async handler(ctx, { name, type, orgId, storageId, userId }) {
    const user = await getLoggedInUser(ctx);
    if (!user) throw new ConvexError("User not found");

    if (!isUserInOrg(user, orgId)) {
      throw new ConvexError(
        "You must be a member of the organization to create a file"
      );
    }

    const file = await ctx.db.insert("files", {
      name,
      type,
      orgId,
      storageId,
      userId,
    });
    return file;
  },
});

export const deleteFile = mutation({
  args: {
    fileId: v.id("files"),
  },
  async handler(ctx, { fileId }) {
    const user = await getLoggedInUser(ctx);
    if (!user) throw new ConvexError("User not found");

    const file = await ctx.db.get(fileId);
    if (!file) throw new ConvexError("File not found");

    if (isUserInOrg(user, file.orgId)) {
      await ctx.db.delete(fileId);
    } else {
      throw new ConvexError("You don't have permission to delete this file");
    }

    return true;
  },
});

export const getFiles = query({
  args: {
    orgId: v.string(),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return undefined;

    const user = await getUser(ctx, identity.tokenIdentifier);
    if (!user) return undefined;

    if (!isUserInOrg(user, args.orgId)) return undefined;

    const files = ctx.db
      .query("files")
      .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
      .collect();
    return files;
  },
});
