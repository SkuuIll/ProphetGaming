'use server';
/**
 * @fileOverview Un flujo de IA para generar dinámicamente noticias de juegos simuladas.
 *
 * - generateGameUpdates - Una función que devuelve una lista de actualizaciones de juegos generadas por IA.
 * - GameUpdate - El tipo de datos para una sola actualización de juego.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GameUpdateSchema = z.object({
  gameName: z.string().describe('El nombre del juego ficticio.'),
  title: z.string().describe('El título de la actualización o noticia.'),
  summary: z.string().describe('Un breve y creativo resumen de la actualización.'),
  date: z.string().describe('La fecha de la actualización en formato ISO. Debe ser reciente.'),
  imageHint: z.string().describe('Una pista de dos o tres palabras para generar una imagen para la actualización (ej. "fantasy battle", "cyberpunk city").'),
});
export type GameUpdate = z.infer<typeof GameUpdateSchema>;

const GenerateGameUpdatesOutputSchema = z.object({
    updates: z.array(GameUpdateSchema)
});
export type GenerateGameUpdatesOutput = z.infer<typeof GenerateGameUpdatesOutputSchema>;

export async function generateGameUpdates(): Promise<GenerateGameUpdatesOutput> {
  const llmResponse = await generateGameUpdatesFlow();
  // Add plausible image URLs based on the image hint
  const updatesWithImages = llámoResponse.updates.map(update => ({
    ...update,
    imageUrl: `https://picsum.photos/seed/${update.gameName.replace(/\s/g, '')}/600/400`
  }));
  return { updates: updatesWithImages };
}

const prompt = ai.definePrompt({
    name: 'gameUpdatesPrompt',
    output: { schema: GenerateGameUpdatesOutputSchema },
    prompt: `You are an expert video game journalist.
    Generate a list of 5 recent and plausible but fictional video game news updates.
    Each update should be for a different fictional game.
    The updates can be about new seasons, DLCs, collaborations, or major patches.
    Make the game names and summaries creative and engaging.
    Ensure the dates are very recent, within the last few days.
    Provide a two or three word image hint for each update that captures the essence of the game or update.
    Respond with a JSON object containing a key "updates" which is an array of the 5 updates.`,
});


const generateGameUpdatesFlow = ai.defineFlow(
  {
    name: 'generateGameUpdatesFlow',
    outputSchema: GenerateGameUpdatesOutputSchema,
  },
  async () => {
    const { output } = await prompt();
    return output!;
  }
);
