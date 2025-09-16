import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons/logo';
import { Gamepad2 } from 'lucide-react';
import { GameUpdatesSection } from '@/components/game-updates/game-updates-section';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo className="size-8 text-primary" />
          <span className="text-2xl font-bold font-headline">ProphetGaming</span>
        </div>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Iniciar Sesión</Link>
          </Button>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_theme(colors.primary/50%)]">
            <Link href="/dashboard">Registrarse</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        <section className="relative py-32 md:py-48 flex items-center justify-center text-center overflow-hidden">
           <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
           <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-transparent"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold font-headline tracking-tight">
              Tu Universo de Juegos Conectado
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
              Descubre, juega y conecta con amigos en una plataforma diseñada por y para jugadores.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_theme(colors.primary/50%)]">
                <Link href="/dashboard">
                  <Gamepad2 className="mr-2" />
                  Entrar a la Plataforma
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-headline">¿Por qué ProphetGaming?</h2>
              <p className="mt-2 text-muted-foreground">Todo lo que necesitas en un solo lugar.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-lg bg-secondary/30 transition-all duration-300 hover:bg-secondary/60 hover:shadow-[0_0_20px_theme(colors.primary/20%)]">
                <h3 className="text-xl font-semibold mb-2">Conecta con Amigos</h3>
                <p className="text-muted-foreground">Ve quién está en línea, únete a sus partidas y chatea en tiempo real.</p>
              </div>
              <div className="text-center p-8 rounded-lg bg-secondary/30 transition-all duration-300 hover:bg-secondary/60 hover:shadow-[0_0_20px_theme(colors.primary/20%)]">
                <h3 className="text-xl font-semibold mb-2">Descubre Novedades</h3>
                <p className="text-muted-foreground">Mantente al día con las últimas noticias y actualizaciones de tus juegos y amigos.</p>
              </div>
              <div className="text-center p-8 rounded-lg bg-secondary/30 transition-all duration-300 hover:bg-secondary/60 hover:shadow-[0_0_20px_theme(colors.primary/20%)]">
                <h3 className="text-xl font-semibold mb-2">Personaliza tu Perfil</h3>
                <p className="text-muted-foreground">Muestra tus logros, juegos favoritos y comparte tu identidad gamer.</p>
              </div>
            </div>
          </div>
        </section>
        
        <GameUpdatesSection />

      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} ProphetGaming. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
