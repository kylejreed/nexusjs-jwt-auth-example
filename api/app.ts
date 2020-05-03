import { use, server, schema } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'
import jwt from './plugins/jwt'
import { graphqlUploadExpress, GraphQLUpload } from 'graphql-upload'

use(prisma())
use(jwt)

schema.addToContext((req) => {
  return {
    request: req
  }
})

schema.scalarType({ ...GraphQLUpload })
server.express.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))