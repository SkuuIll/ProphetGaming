import { POSTS, USERS, type User } from '@/lib/placeholder-data';
import { NewsfeedPost } from './newsfeed-post';

export function Newsfeed() {
  const posts = [...POSTS].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  const users: Record<string, User> = USERS.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {} as Record<string, User>);

  return (
    <section>
        <div className='mb-6'>
            <h2 className="text-2xl font-bold tracking-tight font-headline">Feed de Noticias</h2>
            <p className="text-muted-foreground">Mira lo que tus amigos han estado haciendo.</p>
        </div>
      <div className="space-y-6">
        {posts.map((post) => {
          const author = users[post.authorId];
          if (!author) return null;
          return <NewsfeedPost key={post.id} post={post} author={author} />;
        })}
      </div>
    </section>
  );
}
