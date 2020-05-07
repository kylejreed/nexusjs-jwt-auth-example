import { createTestContext as originalCreateTestContext, TestContext } from 'nexus/testing'
export function createTestContext(): TestContext {
  let ctx = {} as TestContext

  beforeAll(async () => {
    Object.assign(ctx, await originalCreateTestContext())
    await ctx.app.server.start()
  })

  afterAll(async () => {
    await ctx.app.server.stop()
    // await ctx.app.db.client.disconnect()
  })

  return ctx
}