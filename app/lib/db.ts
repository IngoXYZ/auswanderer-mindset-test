
import { PrismaClient } from '@prisma/client'

// Simple singleton pattern that works better with Vercel
let prismaInstance: PrismaClient | undefined

export function getPrismaClient(): PrismaClient {
  if (!prismaInstance) {
    try {
      prismaInstance = new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
      })
    } catch (error) {
      console.error('Failed to initialize Prisma client:', error)
      throw error
    }
  }
  return prismaInstance
}

// Function-based export to avoid initialization during build
export const db = {
  get client() {
    return getPrismaClient()
  }
}

// Legacy export for compatibility - use function call
export const prisma = () => getPrismaClient()
