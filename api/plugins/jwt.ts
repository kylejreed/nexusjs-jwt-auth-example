import { auth } from 'nexus-plugin-jwt-auth'
import { sign } from 'jsonwebtoken';

const APP_SECRET = 'mysupersecret'
const protectedPaths = [
  'Query.myPosts',
  'Mutation.createOnePost'
]

export interface AuthTokenContext {
  userId: number
  username: string
}

export const getToken = (data: AuthTokenContext) => {
  return sign(data, APP_SECRET)
}

export default auth({
  appSecret: 'mysupersecret',
  protectedPaths
})