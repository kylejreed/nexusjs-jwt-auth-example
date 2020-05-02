import { schema } from "nexus"

schema.queryType({
  definition(t) {
    t.crud.users()
    t.list.field('myPosts', {
      type: 'Post',
      description: "All of the posts the authenticated user has.",
      resolve: (root, args, ctx) => {
        return ctx.db.post.findMany({ where: { authorId: ctx.token.userId } })
      }
    })
  }
})
