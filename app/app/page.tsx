
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserForm } from '@/components/user-form';
import { MapPin, Users, TrendingUp, Globe, Brain, DollarSign, Target, Heart } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-black tracking-tight">THE SMALL RESET</h1>
              <p className="text-sm text-gray-600 mt-1 tracking-widest">Release. Rediscover. Rise.</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Earth Background Inspiration */}
      <section className="relative py-20 px-4 tsr-hero-bg">
        <div className="max-w-5xl mx-auto text-center">
          {/* The Small Reset Logo */}
          <div className="mb-8">
            <img 
              src="/the-small-reset-logo.png" 
              alt="The Small Reset Logo" 
              className="w-96 h-auto mx-auto mb-6"
            />
            <h2 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                Auswanderer Mindset Test
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Finde in nur 5 Minuten heraus, wie gut du mental und emotional auf eine Auswanderung vorbereitet bist.
              <br className="hidden md:block" />
              Release your limitations. Rediscover your potential. Rise to new horizons.
            </p>
          </div>

          {/* Stats in The Small Reset Style */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-black mb-2">15</div>
              <p className="text-sm text-gray-600 uppercase tracking-wide">Fragen</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-black mb-2">8</div>
              <p className="text-sm text-gray-600 uppercase tracking-wide">Kategorien</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-black mb-2">5</div>
              <p className="text-sm text-gray-600 uppercase tracking-wide">Minuten</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-black mb-2">100%</div>
              <p className="text-sm text-gray-600 uppercase tracking-wide">Kostenlos</p>
            </div>
          </div>

          {/* Categories Preview in 2 rows */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white/80 border border-gray-200 hover:shadow-lg transition-all hover:scale-105">
              <CardHeader className="pb-3 text-center">
                <Brain className="h-6 w-6 mx-auto mb-2 text-black" />
                <CardTitle className="text-sm font-medium text-black">Veränderungsbereitschaft</CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-white/80 border border-gray-200 hover:shadow-lg transition-all hover:scale-105">
              <CardHeader className="pb-3 text-center">
                <Target className="h-6 w-6 mx-auto mb-2 text-black" />
                <CardTitle className="text-sm font-medium text-black">Anpassungsfähigkeit</CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-white/80 border border-gray-200 hover:shadow-lg transition-all hover:scale-105">
              <CardHeader className="pb-3 text-center">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-black" />
                <CardTitle className="text-sm font-medium text-black">Risikobereitschaft</CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-white/80 border border-gray-200 hover:shadow-lg transition-all hover:scale-105">
              <CardHeader className="pb-3 text-center">
                <Globe className="h-6 w-6 mx-auto mb-2 text-black" />
                <CardTitle className="text-sm font-medium text-black">Growth Mindset</CardTitle>
              </CardHeader>
            </Card>
          </div>
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            <Card className="bg-white/80 border border-gray-200 hover:shadow-lg transition-all hover:scale-105">
              <CardHeader className="pb-3 text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-black" />
                <CardTitle className="text-sm font-medium text-black">Konformität vs. Rebell</CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-white/80 border border-gray-200 hover:shadow-lg transition-all hover:scale-105">
              <CardHeader className="pb-3 text-center">
                <DollarSign className="h-6 w-6 mx-auto mb-2 text-black" />
                <CardTitle className="text-sm font-medium text-black">Finanzielle Situation</CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-white/80 border border-gray-200 hover:shadow-lg transition-all hover:scale-105">
              <CardHeader className="pb-3 text-center">
                <Heart className="h-6 w-6 mx-auto mb-2 text-black" />
                <CardTitle className="text-sm font-medium text-black">Wertekompass</CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-white/80 border border-gray-200 hover:shadow-lg transition-all hover:scale-105">
              <CardHeader className="pb-3 text-center">
                <MapPin className="h-6 w-6 mx-auto mb-2 text-black" />
                <CardTitle className="text-sm font-medium text-black">Sicherheitsbedürfnis</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* User Form Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white shadow-xl border-0">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-black mb-4">Starte jetzt deinen Test</CardTitle>
              <CardDescription className="text-lg text-gray-700">
                Gib deine Daten ein, um deine persönliche Auswertung zu erhalten
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <UserForm />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="mb-4">
            <h3 className="text-2xl font-bold mb-2">THE SMALL RESET</h3>
            <p className="text-gray-300 text-sm tracking-widest">Release. Rediscover. Rise.</p>
          </div>
          <p className="text-gray-400">
            © 2025 The Small Reset. Dein Weg ins Ausland beginnt hier.
          </p>
        </div>
      </footer>
    </div>
  );
}
