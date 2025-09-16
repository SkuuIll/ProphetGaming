import { Newsfeed } from '@/components/newsfeed/newsfeed';
import { CreatePost } from '@/components/newsfeed/create-post';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <CreatePost />
      <Newsfeed />
    </div>
  );
}
