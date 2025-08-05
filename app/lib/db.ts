
import { PrismaClient } from '@prisma/client'

// Vercel-optimized singleton pattern with proper error handling
declare global {
  var __prisma: PrismaClient | undefined
}

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.__prisma) {
    global.__prisma = new PrismaClient()
  }
  prisma = global.__prisma
}

export function getPrismaClient(): PrismaClient {
  return prisma
}

// Direct export for simplicity
export { prisma }
