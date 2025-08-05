
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { questions, categories, getResultType, getRecommendations } from '@/lib/questions';

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { userId, answers } = await request.json();

    if (!userId || !answers) {
      return NextResponse.json(
        { error: 'Benutzer-ID und Antworten sind erforderlich' },
        { status: 400 }
      );
    }

    // Calculate scores
    let totalScore = 0;
    const categoryScores: Record<string, number[]> = {};

    // Initialize category score arrays
    Object.keys(categories).forEach(category => {
      categoryScores[category] = [];
    });

    // Save individual responses and calculate scores
    for (const [questionId, score] of Object.entries(answers)) {
      const question = questions.find(q => q.id === questionId);
      if (!question) continue;

      totalScore += Number(score);
      categoryScores[question.category]?.push(Number(score));

      // Save individual response
      await prisma.quizResponse.create({
        data: {
          userId: parseInt(userId),
          questionId,
          answer: Number(score),
          category: question.category,
        },
      });
    }

    // Calculate average scores per category
    const finalCategoryScores: Record<string, number> = {};
    Object.entries(categoryScores).forEach(([category, scores]) => {
      if (scores.length > 0) {
        finalCategoryScores[category] = scores.reduce((a, b) => a + b, 0) / scores.length;
      }
    });

    const resultType = getResultType(totalScore);
    const recommendations = getRecommendations(finalCategoryScores);

    // Save final result
    const result = await prisma.quizResult.create({
      data: {
        userId: parseInt(userId),
        totalScore,
        resultType,
        categoryScores: finalCategoryScores,
        recommendations,
      },
    });

    return NextResponse.json({ resultId: result.id });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    return NextResponse.json(
      { error: 'Fehler beim Speichern der Quiz-Antworten' },
      { status: 500 }
    );
  }
}
