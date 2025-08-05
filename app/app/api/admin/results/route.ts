
import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";
export const runtime = 'nodejs';

export async function GET() {
  try {
    // Import at runtime to avoid build-time issues
    const { prisma } = await import('@/lib/db');
    
    const results = await prisma.quizResult.findMany({
      select: {
        id: true,
        totalScore: true,
        resultType: true,
        categoryScores: true,
        createdAt: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching results:', error);
    return NextResponse.json(
      { error: 'Fehler beim Laden der Ergebnisse' },
      { status: 500 }
    );
  }
}
