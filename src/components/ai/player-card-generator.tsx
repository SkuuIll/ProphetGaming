"use client";

import React, { useState, useTransition } from 'react';
import Image from 'next/image';
import { Sparkles, Wand2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '../ui/badge';
import { Skeleton } from '../ui/skeleton';
import { generatePlayerCardElements } from '@/ai/flows/generate-player-card';
import { USERS } from '@/lib/placeholder-data';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const promptSuggestions = [
    "A majestic lion with a cosmic mane",
    "A cyberpunk cityscape at night",
    "A serene fantasy forest landscape",
    "An astronaut floating in space with planets",
    "A cute robot holding a flower",
];

export function PlayerCardGenerator() {
    const [prompt, setPrompt] = useState('A valiant knight in pixel art style');
    const [backgroundImageUrl, setBackgroundImageUrl] = useState<string | null>('https://picsum.photos/seed/pc-bg/800/450');
    const [motto, setMotto] = useState<string>('Forged in pixels, bound by honor.');
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();
    const currentUser = USERS[0];

    const handleSuggestionClick = (suggestion: string) => {
        setPrompt(suggestion);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!prompt) {
            toast({
                title: 'Prompt is empty',
                description: 'Please enter a prompt to generate an image.',
                variant: 'destructive',
            });
            return;
        }

        startTransition(async () => {
            try {
                setBackgroundImageUrl(null);
                setMotto('');
                const result = await generatePlayerCardElements({ prompt });
                setBackgroundImageUrl(result.backgroundImageUri);
                setMotto(result.motto);
                toast({
                    title: 'Player Card Generated!',
                    description: 'Your new player card is ready.',
                });
            } catch (error) {
                console.error('Failed to generate player card:', error);
                toast({
                    title: 'Generation Failed',
                    description: 'Could not generate card. Please try again later.',
                    variant: 'destructive',
                });
                // Restore placeholder on failure
                setBackgroundImageUrl('https://picsum.photos/seed/pc-bg-error/800/450');
                setMotto('Try generating again!');
            }
        });
    };

    return (
        <Card className="overflow-hidden shadow-lg bg-secondary/30">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-primary" />
                    <CardTitle className="font-headline">AI Player Card Generator</CardTitle>
                </div>
                <CardDescription>Describe a theme and generate a unique background and motto for your player card.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
                <div className="w-full aspect-[16/9] rounded-lg bg-muted/50 flex items-center justify-center overflow-hidden border-2 border-dashed relative">
                    {isPending ? (
                        <Skeleton className="w-full h-full" />
                    ) : backgroundImageUrl ? (
                        <Image
                            src={backgroundImageUrl}
                            alt="Generated background"
                            fill
                            className="object-cover"
                        />
                    ) : (
                         <div className="text-center text-muted-foreground p-4">
                            <Sparkles className="mx-auto h-12 w-12 mb-2" />
                            <p>Your generated card will appear here.</p>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 flex flex-col justify-end">
                       <div className="flex items-center gap-4">
                            <Avatar className="w-16 h-16 border-2 border-primary/70">
                                <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="text-xl font-bold text-white font-headline">{currentUser.name}</h3>
                                {isPending ? (
                                    <Skeleton className="h-5 w-48 mt-1" />
                                ) : (
                                    <p className="text-sm text-primary-foreground/80 italic">"{motto}"</p>
                                )}
                            </div>
                       </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="prompt-input" className="font-semibold">Your Theme</label>
                        <Input
                            id="prompt-input"
                            placeholder="e.g., A valiant knight in pixel art style"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            disabled={isPending}
                        />
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Or try a suggestion:</p>
                        <div className="flex flex-wrap gap-2">
                            {promptSuggestions.map((suggestion) => (
                                <Badge
                                    key={suggestion}
                                    variant="outline"
                                    className="cursor-pointer hover:bg-accent"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    {suggestion}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={isPending}>
                        <Wand2 className="mr-2" />
                        {isPending ? 'Generating...' : 'Generate Player Card'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
