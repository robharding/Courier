import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createFile = mutation({
  args: {
    name: v.string(),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("You must be logged in to create a file");
    }

    const file = await ctx.db.insert("files", {
      name: args.name,
    });
    return file;
  },
});

export const getFiles = query({
  args: {},
  async handler(ctx) {
    const files = ctx.db.query("files").collect();
    return files;
  },
});
