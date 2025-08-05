
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Question } from '@/lib/questions';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface QuizClientProps {
  questions: Question[];
}

export function QuizClient({ questions }: QuizClientProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user data exists
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      router.push('/');
      return;
    }
  }, [router]);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  const handleAnswer = (score: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQ?.id || '']: score
    }));
  };

  const handleNext = () => {
    if (!answers[currentQ?.id || '']) {
      toast.error('Bitte wähle eine Antwort aus');
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      router.push('/');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: parseInt(userId),
          answers
        }),
      });

      if (!response.ok) {
        throw new Error('Fehler beim Speichern der Antworten');
      }

      const { resultId } = await response.json();
      sessionStorage.setItem('resultId', resultId.toString());
      
      router.push('/results');
    } catch (error) {
      toast.error('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentQ) {
    return <div>Laden...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            Frage {currentQuestion + 1} von {questions.length}
          </span>
          <span className="text-sm text-gray-600">
            {Math.round(progress)}% abgeschlossen
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">
            {currentQ.text}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.score)}
              className={`w-full p-4 text-left rounded-lg border transition-all hover:shadow-md ${
                answers[currentQ.id] === option.score
                  ? 'border-blue-500 bg-blue-50 text-blue-900'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  answers[currentQ.id] === option.score
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {answers[currentQ.id] === option.score && (
                    <CheckCircle className="w-3 h-3 text-white" />
                  )}
                </div>
                <span className="text-sm">{option.text}</span>
              </div>
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück
        </Button>

        <Button
          onClick={handleNext}
          disabled={!answers[currentQ.id] || isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
        >
          {isSubmitting ? (
            'Wird ausgewertet...'
          ) : currentQuestion === questions.length - 1 ? (
            <>
              Auswertung starten
              <CheckCircle className="w-4 h-4" />
            </>
          ) : (
            <>
              Weiter
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
