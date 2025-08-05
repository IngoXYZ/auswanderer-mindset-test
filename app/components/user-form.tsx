
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, Mail, User } from 'lucide-react';
import { toast } from 'sonner';

export function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      toast.error('Bitte fülle alle Felder aus');
      return;
    }

    if (!email.includes('@')) {
      toast.error('Bitte gib eine gültige E-Mail-Adresse ein');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });

      if (!response.ok) {
        throw new Error('Fehler beim Speichern der Daten');
      }

      const { userId } = await response.json();
      
      // Store user data in sessionStorage for the quiz
      sessionStorage.setItem('userId', userId.toString());
      sessionStorage.setItem('userName', name.trim());
      sessionStorage.setItem('userEmail', email.trim());
      
      router.push('/quiz');
    } catch (error) {
      toast.error('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
          Vorname
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="name"
            type="text"
            placeholder="Dein Vorname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          E-Mail-Adresse
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="email"
            type="email"
            placeholder="deine@email.de"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-black text-white hover:bg-gray-800"
        disabled={isLoading}
      >
        {isLoading ? (
          'Wird verarbeitet...'
        ) : (
          <>
            Test starten
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        Deine Daten werden nur für die Auswertung verwendet und nicht an Dritte weitergegeben.
        <br />Nach dem Test erhältst du deine persönlichen Ergebnisse direkt angezeigt.
      </p>
    </form>
  );
}
