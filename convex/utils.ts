import { QueryCtx, MutationCtx } from "./_generated/server.js";

export const getUserByClerkId = async ({
   ctx,
   clerkId
}: {
   ctx: QueryCtx | MutationCtx;
   clerkId: string;
}) => {
   return await ctx.db
      .query("users")
      .withIndex("by_clerkId", q => q.eq("clerkId", clerkId))
      .unique();
};
