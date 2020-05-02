import { use } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'
import jwt from './plugins/jwt'

use(prisma())
use(jwt)