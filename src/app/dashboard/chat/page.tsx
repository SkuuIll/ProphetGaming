"use client";

import { USERS } from "@/lib/placeholder-data";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import React from "react";

export default function ChatPage() {
  const friends = USERS.slice(1, 5);
  const [selectedFriend, setSelectedFriend] = React.useState(friends[0]);

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col">
        <div className="mb-6">
            <h1 className="text-3xl font-bold font-headline tracking-tight">Chat</h1>
            <p className="text-muted-foreground">Habla con tus amigos en tiempo real.</p>
        </div>
        <Card className="h-full grid grid-cols-[300px_1fr] bg-secondary/30">
            <div className="flex flex-col border-r">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold">Conversaciones</h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {friends.map(friend => (
                        <div 
                            key={friend.id} 
                            className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-secondary ${friend.id === selectedFriend.id ? 'bg-secondary' : ''}`}
                            onClick={() => setSelectedFriend(friend)}
                        >
                            <Avatar>
                                <AvatarImage src={friend.avatarUrl} alt={friend.name} />
                                <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{friend.name}</p>
                                <p className="text-sm text-muted-foreground truncate">Hola, ¿cómo estás?</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex items-center gap-3 p-4 border-b">
                    <Avatar>
                        <AvatarImage src={selectedFriend.avatarUrl} alt={selectedFriend.name} />
                        <AvatarFallback>{selectedFriend.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-semibold">{selectedFriend.name}</h2>
                </div>
                <CardContent className="flex-1 p-6 space-y-4 overflow-y-auto">
                    {/* Mock messages */}
                    <div className="flex justify-end">
                        <div className="bg-primary text-primary-foreground p-3 rounded-lg max-w-xs">
                            ¡Hola! ¿Listo para la partida de esta noche?
                        </div>
                    </div>
                    <div className="flex justify-start">
                        <div className="bg-secondary p-3 rounded-lg max-w-xs">
                            ¡Claro que sí! He estado practicando.
                        </div>
                    </div>
                     <div className="flex justify-end">
                        <div className="bg-primary text-primary-foreground p-3 rounded-lg max-w-xs">
                           Genial, nos vemos a las 9pm.
                        </div>
                    </div>
                </CardContent>
                <div className="p-4 border-t flex items-center gap-2">
                    <Input placeholder="Escribe un mensaje..." className="flex-1" />
                    <Button>
                        <Send />
                    </Button>
                </div>
            </div>
        </Card>
    </div>
  );
}
