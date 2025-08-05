
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export async function GET() {
  try {
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
