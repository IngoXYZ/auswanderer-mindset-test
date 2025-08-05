
import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";
export const runtime = 'nodejs';

export async function GET() {
  try {
    // Import at runtime to avoid build-time issues
    const { prisma } = await import('@/lib/db');
    
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        _count: {
          select: {
            quizResults: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Fehler beim Laden der Benutzer' },
      { status: 500 }
    );
  }
}
