"use client";

import { useEffect, useState } from 'react';
import { generateGameUpdates, type GameUpdate } from '@/ai/flows/generate-game-updates';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Rss } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Skeleton } from '../ui/skeleton';

export function GameUpdatesSection() {
  const [updates, setUpdates] = useState<GameUpdate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        setLoading(true);
        const result = await generateGameUpdates();
        const sortedUpdates = result.updates.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setUpdates(sortedUpdates);
      } catch (error) {
        console.error("Failed to fetch game updates:", error);
        // Optionally, set some error state here to show in the UI
      } finally {
        setLoading(false);
      }
    };
    fetchUpdates();
  }, []);

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-headline">Últimas Noticias de Juegos</h2>
          <p className="mt-2 text-muted-foreground">
            Mantente al día con las actualizaciones de tus juegos favoritos, generadas por IA.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => <GameUpdateCardSkeleton key={index} />)
          ) : (
            updates.slice(0, 3).map((update) => (
              <GameUpdateCard key={update.title} update={update} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function GameUpdateCard({ update }: { update: GameUpdate }) {
  const timeAgo = formatDistanceToNow(new Date(update.date), {
    addSuffix: true,
    locale: es,
  });

  return (
    <Card className="flex flex-col overflow-hidden bg-secondary/30 transition-all duration-300 hover:bg-secondary/60 hover:shadow-[0_0_20px_theme(colors.primary/20%)]">
      <div className="relative aspect-video">
        <Image
          src={update.imageUrl!}
          alt={`Imagen de ${update.gameName}`}
          fill
          className="object-cover"
          data-ai-hint={update.imageHint}
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle>{update.title}</CardTitle>
                <CardDescription className='font-bold text-primary pt-1'>{update.gameName}</CardDescription>
            </div>
            <p className="text-xs text-muted-foreground whitespace-nowrap">{timeAgo}</p>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{update.summary}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <Rss className="mr-2" />
          Leer Más
        </Button>
      </CardFooter>
    </Card>
  );
}

function GameUpdateCardSkeleton() {
    return (
        <Card className="flex flex-col overflow-hidden bg-secondary/30">
            <Skeleton className="aspect-video w-full" />
            <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </CardContent>
            <CardFooter>
                <Skeleton className="h-10 w-full" />
            </CardFooter>
        </Card>
    )
}
