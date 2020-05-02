import { schema } from "nexus"

schema.objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.username()
    t.model.posts()
  }
})

schema.objectType({
  name: 'AuthenticatedUser',
  definition(t) {
    t.string('token')
    t.field('user', {
      type: 'User'
    })
  }
})