
// Super simple approach - no imports at module level
let prismaClient: any = null

export async function getPrismaClient() {
  if (!prismaClient) {
    const { PrismaClient } = await import('@prisma/client')
    prismaClient = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
    })
  }
  return prismaClient
}
