import { USERS } from "@/lib/placeholder-data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

export default function FriendsPage() {
  const friends = USERS.slice(1); // Exclude the current user

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Amigos</h1>
        <p className="text-muted-foreground">Gestiona tus conexiones y ve quién está en línea.</p>
      </div>
      <Card className="bg-secondary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="size-5" />
            <span>Lista de Amigos ({friends.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {friends.map(user => (
              <div key={user.id} className="flex flex-col items-center text-center p-4 border rounded-lg bg-card/50">
                <Avatar className="w-20 h-20 mb-4">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="font-semibold">{user.name}</p>
                <Badge variant={user.online ? "default" : "outline"} className={`mt-2 ${user.online ? "bg-green-500/20 text-green-400 border-green-500/30" : ""}`}>
                  {user.online ? "En Línea" : "Desconectado"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
