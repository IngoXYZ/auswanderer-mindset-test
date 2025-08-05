
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = "force-dynamic";
export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Import at runtime to avoid build-time issues
    const { prisma } = await import('@/lib/db');
    
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'Ergebnis-ID ist erforderlich' },
        { status: 400 }
      );
    }

    const result = await prisma.quizResult.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!result) {
      return NextResponse.json(
        { error: 'Ergebnis nicht gefunden' },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching result:', error);
    return NextResponse.json(
      { error: 'Fehler beim Laden der Ergebnisse' },
      { status: 500 }
    );
  }
}
