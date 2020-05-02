import { schema } from "nexus"
import { getToken } from "../plugins/jwt"


schema.mutationType({
  definition(t) {
    t.field('login', {
      type: 'AuthenticatedUser',
      args: {
        username: schema.stringArg()
      },
      resolve: async (_, { username }, { db }) => {
        const foundUser = await db.user.findOne({ where: { username } })
        if (!foundUser) return null

        return {
          token: getToken({ userId: foundUser.id, username: foundUser.username }),
          user: foundUser
        }
      }
    })

    t.field('register', {
      type: 'AuthenticatedUser',
      args: {
        user: schema.arg({
          type: 'RegisterInput',
          required: true
        })
      },
      resolve: async (_, { user }, { db, token }) => {
        const foundUser = await db.user.create({ data: { username: user.username } })
        if (!foundUser) return null

        return {
          token: getToken({ userId: foundUser.id, username: foundUser.username }),
          user: foundUser
        }
      }
    })

    t.crud.createOnePost({
      computedInputs: {
        author: ({ ctx }) => ({ connect: { id: ctx.token.userId } })
      }
    })
    t.field('likePost', {
      type: 'Boolean',
      args: {
        postId: schema.intArg({ required: true })
      },
      resolve: async (root, args, ctx) => {
        const hasBeenLiked = (await ctx.db.likedContent.findMany({ where: { entity: 'Post', entityId: args.postId, userId: ctx.token.userId } })).length > 0
        if (hasBeenLiked) {
          return false
        }
        await ctx.db.likedContent.create({ data: { entity: 'Post', entityId: args.postId, user: { connect: { id: ctx.token.userId } } } })
        return true
      },
    })
  }
})