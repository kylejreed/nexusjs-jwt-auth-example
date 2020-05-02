import { schema } from "nexus"


schema.objectType({
  name: 'Post',
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.content()
    t.model.author()
    t.model.comments()
    t.int('numberOfLikes', {
      resolve: async (root, args, ctx) => {
        return (await ctx.db.likedContent.findMany({ where: { entity: 'Post', AND: { entityId: root.id } } })).length
      },
    })
  }
})