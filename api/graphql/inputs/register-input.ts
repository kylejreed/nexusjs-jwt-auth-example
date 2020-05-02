import { schema } from 'nexus'

schema.inputObjectType({
  name: 'RegisterInput',
  definition(t) {
    t.string('username', { required: true })
  }
})