'use server';

/**
 * @fileOverview AI flow to generate a profile picture based on a text prompt.
 *
 * - generateProfilePicture - A function that generates a profile picture.
 * - GenerateProfilePictureInput - The input type for the generateProfilePicture function.
 * - GenerateProfilePictureOutput - The return type for the generateProfilePicture function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProfilePictureInputSchema = z.object({
  prompt: z.string().describe('The text prompt to generate the profile picture from.'),
});
export type GenerateProfilePictureInput = z.infer<typeof GenerateProfilePictureInputSchema>;

const GenerateProfilePictureOutputSchema = z.object({
  pictureDataUri: z
    .string()
    .describe(
      'The generated profile picture as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Corrected description
    ),
});
export type GenerateProfilePictureOutput = z.infer<typeof GenerateProfilePictureOutputSchema>;

export async function generateProfilePicture(
  input: GenerateProfilePictureInput
): Promise<GenerateProfilePictureOutput> {
  return generateProfilePictureFlow(input);
}

const generateProfilePictureFlow = ai.defineFlow(
  {
    name: 'generateProfilePictureFlow',
    inputSchema: GenerateProfilePictureInputSchema,
    outputSchema: GenerateProfilePictureOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: input.prompt,
    });

    if (!media) {
      throw new Error('No image was generated.');
    }

    return {pictureDataUri: media.url!};
  }
);
