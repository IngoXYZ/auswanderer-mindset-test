
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { categories } from '@/lib/questions';
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  Home,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface QuizResult {
  id: number;
  totalScore: number;
  resultType: string;
  categoryScores: Record<string, number>;
  recommendations: string[];
  user: {
    name: string;
    email: string;
  };
}

export function ResultsClient() {
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchResult = async () => {
      const resultId = sessionStorage.getItem('resultId');
      if (!resultId) {
        router.push('/');
        return;
      }

      try {
        const response = await fetch(`/api/results/${resultId}`);
        if (!response.ok) {
          throw new Error('Fehler beim Laden der Ergebnisse');
        }

        const data = await response.json();
        setResult(data);
      } catch (error) {
        toast.error('Fehler beim Laden der Ergebnisse');
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResult();
  }, [router]);



  const getResultIcon = (resultType: string) => {
    switch (resultType) {
      case 'bereit':
        return <Trophy className="h-8 w-8 text-green-600" />;
      case 'bedingt_bereit':
        return <Target className="h-8 w-8 text-yellow-600" />;
      default:
        return <Home className="h-8 w-8 text-red-600" />;
    }
  };

  const getResultDetails = (resultType: string) => {
    const details = {
      bereit: {
        title: 'Auswanderer-Typ: Bereit für das Abenteuer! 🌟',
        description: 'Du bist mental und emotional gut auf eine Auswanderung vorbereitet. Du bringst die richtige Mischung aus Mut, Flexibilität und Realismus mit.',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200'
      },
      bedingt_bereit: {
        title: 'Vorsichtiger Planer: Bedingt bereit 🤔',
        description: 'Du hast gute Grundvoraussetzungen, aber es gibt noch einige Bereiche, in denen du dich weiterentwickeln könntest, um für das Auswanderer-Leben optimal gerüstet zu sein.',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200'
      },
      nicht_bereit: {
        title: 'Heimatverbunden: Noch nicht bereit 🏠',
        description: 'Momentan scheinst du noch stark an dein aktuelles Umfeld gebunden zu sein. Das ist völlig okay! Wenn der Wunsch nach Veränderung wächst, gibt es viele Wege, sich weiterzuentwickeln.',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200'
      }
    };
    return details[resultType as keyof typeof details];
  };

  const getCategoryIcon = (score: number) => {
    if (score >= 4) return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (score >= 3) return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    return <XCircle className="h-5 w-5 text-red-600" />;
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Deine Ergebnisse werden geladen...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <p className="text-gray-600">Keine Ergebnisse gefunden.</p>
        <Button onClick={() => router.push('/')} className="mt-4">
          Zurück zum Start
        </Button>
      </div>
    );
  }

  const details = getResultDetails(result.resultType);
  const maxScore = 75; // 15 questions × 5 points max

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Welcome */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Herzlichen Glückwunsch, {result.user.name}!
        </h2>
        <p className="text-gray-600">Hier sind deine persönlichen Testergebnisse</p>
      </div>

      {/* Main Result */}
      <Card className={`${details.bgColor} ${details.borderColor} border-2`}>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {getResultIcon(result.resultType)}
          </div>
          <CardTitle className={`text-2xl ${details.color}`}>
            {details.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-700 mb-6">{details.description}</p>
          <div className="flex justify-center items-center gap-4">
            <Badge variant="outline" className="text-lg px-4 py-2">
              {result.totalScore} von {maxScore} Punkten
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2">
              {Math.round((result.totalScore / maxScore) * 100)}%
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Detailauswertung nach Kategorien
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {Object.entries(result.categoryScores).map(([category, score]) => (
              <div key={category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(score)}
                    <span className="font-medium text-gray-900">
                      {categories[category as keyof typeof categories]}
                    </span>
                  </div>
                  <Badge variant="outline">{score.toFixed(1)}/5.0</Badge>
                </div>
                <Progress value={(score / 5) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-600" />
            Persönliche Empfehlungen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {result.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">{recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-center">
        <Button
          onClick={() => router.push('/')}
          className="bg-black text-white hover:bg-gray-800 flex items-center gap-2"
        >
          <Home className="h-4 w-4" />
          Neuen Test starten
        </Button>
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>Deine Ergebnisse wurden erfolgreich gespeichert und ausgewertet.</p>
        <p className="mt-1">Vielen Dank für deine Teilnahme am The Small Reset Auswanderer-Mindset Test!</p>
      </div>
    </div>
  );
}
