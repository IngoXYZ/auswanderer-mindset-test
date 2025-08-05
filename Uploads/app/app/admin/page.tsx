
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Mail, 
  Download, 
  Eye, 
  Calendar,
  TrendingUp,
  BarChart3,
  Filter
} from 'lucide-react';
import { toast } from 'sonner';

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  _count: {
    quizResults: number;
  };
}

interface QuizResult {
  id: number;
  totalScore: number;
  resultType: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
  categoryScores: Record<string, number>;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('');

  const handleLogin = () => {
    // Simple password protection - in production use proper authentication
    if (password === 'thesmallreset2025') {
      setIsAuthenticated(true);
      loadData();
    } else {
      toast.error('Falsches Passwort');
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [usersRes, resultsRes] = await Promise.all([
        fetch('/api/admin/users'),
        fetch('/api/admin/results')
      ]);
      
      if (usersRes.ok && resultsRes.ok) {
        const usersData = await usersRes.json();
        const resultsData = await resultsRes.json();
        setUsers(usersData);
        setResults(resultsData);
      }
    } catch (error) {
      toast.error('Fehler beim Laden der Daten');
    }
    setLoading(false);
  };

  const exportCSV = async () => {
    try {
      const response = await fetch('/api/admin/export');
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `auswanderer-test-daten-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        toast.success('CSV-Export erfolgreich');
      }
    } catch (error) {
      toast.error('Fehler beim Export');
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(filter.toLowerCase()) ||
    user.email.toLowerCase().includes(filter.toLowerCase())
  );

  const getResultTypeBadge = (type: string) => {
    const variants = {
      'bereit': 'bg-green-100 text-green-800',
      'bedingt_bereit': 'bg-yellow-100 text-yellow-800',
      'nicht_bereit': 'bg-red-100 text-red-800'
    };
    return variants[type as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  const getResultTypeText = (type: string) => {
    const texts = {
      'bereit': 'Bereit zum Auswandern',
      'bedingt_bereit': 'Bedingt bereit',
      'nicht_bereit': 'Noch nicht bereit'
    };
    return texts[type as keyof typeof texts] || type;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-black">THE SMALL RESET</CardTitle>
            <CardDescription>Admin-Panel Zugang</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Passwort eingeben"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <Button onClick={handleLogin} className="w-full bg-black text-white hover:bg-gray-800">
              Anmelden
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <img 
                src="/the-small-reset-logo.png" 
                alt="The Small Reset Logo" 
                className="w-48 h-auto mx-auto mb-2"
              />
              <h1 className="text-2xl font-bold text-black">THE SMALL RESET</h1>
              <p className="text-xs text-gray-600 tracking-widest">Release. Rediscover. Rise.</p>
              <p className="text-sm font-medium text-black mt-1">Admin-Panel</p>
            </div>
            <Button onClick={exportCSV} className="bg-black text-white hover:bg-gray-800">
              <Download className="h-4 w-4 mr-2" />
              CSV Export
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Gesamt Teilnehmer</CardTitle>
                <Users className="h-4 w-4 text-gray-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Abgeschlossene Tests</CardTitle>
                <BarChart3 className="h-4 w-4 text-gray-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{results.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Bereit zum Auswandern</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {results.filter(r => r.resultType === 'bereit').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Noch nicht bereit</CardTitle>
                <Calendar className="h-4 w-4 text-red-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {results.filter(r => r.resultType === 'nicht_bereit').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter & Suche
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Nach Name oder E-Mail suchen..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="max-w-md"
            />
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              E-Mail-Adressen ({filteredUsers.length})
            </CardTitle>
            <CardDescription>
              Alle registrierten Teilnehmer des Auswanderer-Mindset Tests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">Name</th>
                    <th className="text-left py-3 px-2">E-Mail</th>
                    <th className="text-left py-3 px-2">Registriert</th>
                    <th className="text-left py-3 px-2">Tests</th>
                    <th className="text-left py-3 px-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => {
                    const userResult = results.find(r => r.user.email === user.email);
                    return (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-2 font-medium">{user.name}</td>
                        <td className="py-3 px-2">{user.email}</td>
                        <td className="py-3 px-2">
                          {new Date(user.createdAt).toLocaleDateString('de-DE')}
                        </td>
                        <td className="py-3 px-2">
                          <Badge variant="outline">{user._count.quizResults}</Badge>
                        </td>
                        <td className="py-3 px-2">
                          {userResult ? (
                            <Badge className={getResultTypeBadge(userResult.resultType)}>
                              {getResultTypeText(userResult.resultType)}
                            </Badge>
                          ) : (
                            <Badge variant="outline">Kein Test</Badge>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Recent Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Neueste Test-Ergebnisse
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.slice(0, 10).map((result) => (
                <div key={result.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">{result.user.name}</div>
                    <div className="text-sm text-gray-500">{result.user.email}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{result.totalScore} Punkte</div>
                    <Badge className={getResultTypeBadge(result.resultType)}>
                      {getResultTypeText(result.resultType)}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(result.createdAt).toLocaleDateString('de-DE')}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
