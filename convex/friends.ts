import { query } from "./_generated/server.js";
import { getUserByClerkId } from "./utils";
import { Id } from "./_generated/dataModel";
import { ConvexError } from "convex/values";
import { QueryCtx, MutationCtx } from "./_generated/server.js";

export const get = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });

    if (!currentUser) {
      throw new ConvexError("User not found");
    }

    const friendships1 = await ctx.db
      .query("friends")
      .withIndex("by_user1", (q) => q.eq("user1", currentUser._id))
      .collect();

    const friendships2 = await ctx.db
      .query("friends")
      .withIndex("by_user2", (q) => q.eq("user2", currentUser._id))
      .collect();

    const friendships = [...friendships1, ...friendships2];

    const friends = await Promise.all(
      friendships.map(async (friendship) => {
        const friendId =
          friendship.user1 === currentUser._id ? friendship.user2 : friendship.user1;
        const friend = await ctx.db.get(friendId);

        // Hanya tambahkan teman jika ditemukan
        return friend || null;
      })
    );

    // Filter out null values
    return friends.filter(Boolean);
  },
});
