
import Image from 'next/image';

interface AppHeaderProps {
  showLogo?: boolean;
}

export function AppHeader({ showLogo = false }: AppHeaderProps) {
  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center">
          <div className="text-center">
            {showLogo && (
              <img 
                src="/the-small-reset-logo.png" 
                alt="The Small Reset Logo" 
                className="w-72 h-auto mx-auto mb-4"
              />
            )}
            <h1 className="text-3xl font-bold text-black tracking-tight">THE SMALL RESET</h1>
            <p className="text-sm text-gray-600 mt-1 tracking-widest">Release. Rediscover. Rise.</p>
            <p className="text-lg font-medium text-black mt-2">
              <span className="bg-gradient-to-r from-blue-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                Auswanderer Mindset Test
              </span>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
