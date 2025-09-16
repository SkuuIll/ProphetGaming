'use server';

/**
 * @fileOverview AI flow to generate elements for a player card.
 *
 * - generatePlayerCardElements - A function that generates a background image and a motto.
 * - GeneratePlayerCardInput - The input type for the function.
 * - GeneratePlayerCardOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GeneratePlayerCardInputSchema = z.object({
  prompt: z.string().describe('The user\'s prompt describing the desired theme or style for their player card (e.g., "dark fantasy warrior", "cyberpunk hacker").'),
});
export type GeneratePlayerCardInput = z.infer<typeof GeneratePlayerCardInputSchema>;

const GeneratePlayerCardOutputSchema = z.object({
  backgroundImageUri: z.string().describe('The generated background image as a data URI.'),
  motto: z.string().describe('A catchy and creative motto for the player.'),
});
export type GeneratePlayerCardOutput = z.infer<typeof GeneratePlayerCardOutputSchema>;

export async function generatePlayerCardElements(input: GeneratePlayerCardInput): Promise<GeneratePlayerCardOutput> {
  return generatePlayerCardFlow(input);
}

const mottoPrompt = ai.definePrompt({
    name: 'playerCardMottoPrompt',
    input: { schema: z.object({ prompt: z.string() }) },
    output: { schema: z.object({ motto: z.string() }) },
    prompt: `Based on the following player theme, generate a short, catchy, and cool gamer motto.
    Theme: {{{prompt}}}
    Motto should be creative and no longer than 10 words.`,
});


const generatePlayerCardFlow = ai.defineFlow(
  {
    name: 'generatePlayerCardFlow',
    inputSchema: GeneratePlayerCardInputSchema,
    outputSchema: GeneratePlayerCardOutputSchema,
  },
  async (input) => {
    // Generate background image and motto in parallel
    const [imagePromise, mottoPromise] = await Promise.all([
      ai.generate({
        model: 'googleai/imagen-4.0-fast-generate-001',
        prompt: `Generate a dynamic and visually appealing gaming-style background image based on the theme: "${input.prompt}". The image should be suitable as a banner or player card background. Avoid text.`,
      }),
      mottoPrompt({ prompt: input.prompt }),
    ]);

    const { media } = imagePromise;
    if (!media) {
      throw new Error('No image was generated.');
    }

    const { output: mottoOutput } = mottoPromise;
     if (!mottoOutput) {
      throw new Error('No motto was generated.');
    }

    return {
      backgroundImageUri: media.url!,
      motto: mottoOutput.motto,
    };
  }
);
