
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = "force-dynamic";
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    // Import at runtime to avoid build-time issues
    const { prisma } = await import('@/lib/db');
    
    const { name, email } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name und E-Mail sind erforderlich' },
        { status: 400 }
      );
    }

    // Check if user already exists, if so, return existing user
    let user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: name.trim(),
          email: email.toLowerCase().trim(),
        },
      });
    }

    return NextResponse.json({ userId: user.id });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Fehler beim Speichern der Benutzerdaten' },
      { status: 500 }
    );
  }
}
