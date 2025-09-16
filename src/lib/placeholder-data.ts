import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  bio: string;
  motto: string;
  online: boolean;
};

export type Post = {
  id: string;
  authorId: string;
  content: string;
  imageUrl?: string;
  imageHint?: string;
  timestamp: string;
};

const getImage = (id: string): ImagePlaceholder | undefined =>
  PlaceHolderImages.find(img => img.id === id);

export const USERS: User[] = [
  {
    id: 'user-1',
    name: 'Alex Vortex',
    email: 'alex.vortex@example.com',
    avatarUrl: getImage('avatar1')?.imageUrl ?? '/placeholder-avatar.png',
    bio: 'Pro gamer & streamer.',
    motto: 'Victory is the only option.',
    online: true,
  },
  {
    id: 'user-2',
    name: 'Bella Nova',
    email: 'bella.nova@example.com',
    avatarUrl: getImage('avatar2')?.imageUrl ?? '/placeholder-avatar.png',
    bio: 'Casual gamer and artist.',
    motto: 'Creating my own adventure.',
    online: true,
  },
  {
    id: 'user-3',
    name: 'Chris "Cypher" Lee',
    email: 'chris.cypher@example.com',
    avatarUrl: getImage('avatar3')?.imageUrl ?? '/placeholder-avatar.png',
    bio: 'Competitive FPS player.',
    motto: 'One shot, one opportunity.',
    online: false,
  },
  {
    id: 'user-4',
    name: 'Diana Quest',
    email: 'diana.quest@example.com',
    avatarUrl: getImage('avatar4')?.imageUrl ?? '/placeholder-avatar.png',
    bio: 'RPG enthusiast.',
    motto: 'Every quest is a new story.',
    online: true,
  },
  {
    id: 'user-5',
    name: 'Ethan "Eon" Forge',
    email: 'ethan.eon@example.com',
    avatarUrl: getImage('avatar5')?.imageUrl ?? '/placeholder-avatar.png',
    bio: 'Building virtual worlds.',
    motto: 'Code is my magic.',
    online: false,
  },
  {
    id: 'user-6',
    name: 'Fiona Pixel',
    email: 'fiona.pixel@example.com',
    avatarUrl: getImage('avatar6')?.imageUrl ?? '/placeholder-avatar.png',
    bio: 'Loves indie games.',
    motto: 'In pixels we trust.',
    online: true,
  },
  {
    id: 'user-7',
    name: 'GamerX',
    email: 'gamerx@example.com',
    avatarUrl: getImage('avatar7')?.imageUrl ?? '/placeholder-avatar.png',
    bio: 'Here for the memes.',
    motto: 'GG, next?',
    online: true,
  },
];

export const POSTS: Post[] = [
    {
        id: 'post-1',
        authorId: 'user-2',
        content: "Just finished this amazing open-world game! The story was incredible. What should I play next?",
        imageUrl: getImage('post1')?.imageUrl,
        imageHint: getImage('post1')?.imageHint,
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    },
    {
        id: 'post-2',
        authorId: 'user-4',
        content: "Looking for a team for the upcoming tournament this weekend. Need a support and a sniper. Let's get that W!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    },
    {
        id: 'post-3',
        authorId: 'user-1',
        content: "My new streaming setup is finally complete! Going live in an hour to show it off. Come hang out!",
        imageUrl: getImage('post2')?.imageUrl,
        imageHint: getImage('post2')?.imageHint,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    },
    {
        id: 'post-4',
        authorId: 'user-6',
        content: "Discovered a hidden gem of an indie game. The art style is just breathtaking. Highly recommend 'Whispers of the Wild'.",
        imageUrl: getImage('post3')?.imageUrl,
        imageHint: getImage('post3')?.imageHint,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    },
];
