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
         clerkId: identity.subject
      });

      if (!currentUser) {
         throw new ConvexError("User not Found");
      }

      const friendships1 = await ctx.db
         .query("friends")
         .withIndex("by_user1", q => q.eq("user1", currentUser._id))
         .collect();

      const friendships2 = await ctx.db
         .query("friends")
         .withIndex("by_user2", q => q.eq("user2", currentUser._id))
         .collect();

      const friendships = [...friendships1, ...friendships2];
      
      const friends =  Promise.all(friendships.map(async friendship => {
      	const friend = await ctx.db.get(friendship.user1 === currentUser._id ?
      	friendship.user2 : friendship.user1)
      	
      	if(!friend) {
      		throw new ConvexError("Friend could not be found")
      	}
      	
      	return friend;
      }))
   }
});
