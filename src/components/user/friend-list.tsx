import { USERS } from '@/lib/placeholder-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function FriendList() {
  const friends = USERS.slice(1, 7); // Mock: current user is 0, friends are 1-6

  return (
    <div className="space-y-2">
      {friends.map((friend) => (
        <Link href="#" key={friend.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-accent transition-colors">
          <div className="relative">
            <Avatar>
              <AvatarImage src={friend.avatarUrl} alt={friend.name} />
              <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span
              className={cn(
                'absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-background',
                friend.online ? 'bg-green-500' : 'bg-gray-400'
              )}
            />
          </div>
          <span className="font-medium text-sm">{friend.name}</span>
        </Link>
      ))}
    </div>
  );
}
