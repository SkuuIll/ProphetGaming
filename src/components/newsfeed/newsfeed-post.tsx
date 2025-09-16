import { formatDistanceToNow } from 'date-fns';
import type { Post, User } from '@/lib/placeholder-data';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

type NewsfeedPostProps = {
  post: Post;
  author: User;
};

export function NewsfeedPost({ post, author }: NewsfeedPostProps) {
  const timeAgo = formatDistanceToNow(new Date(post.timestamp), { addSuffix: true });

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={author.avatarUrl} alt={author.name} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{author.name}</p>
            <p className="text-xs text-muted-foreground">{timeAgo}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{post.content}</p>
        {post.imageUrl && (
            <div className="relative aspect-video rounded-lg overflow-hidden mt-4">
                 <Image 
                    src={post.imageUrl} 
                    alt="Post image" 
                    fill 
                    className="object-cover"
                    data-ai-hint={post.imageHint}
                />
            </div>
        )}
      </CardContent>
    </Card>
  );
}
