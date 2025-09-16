"use client";

import { useState } from "react";
import { USERS } from "@/lib/placeholder-data";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function CreatePost() {
  const [postContent, setPostContent] = useState("");
  const { toast } = useToast();
  const currentUser = USERS[0];

  const handlePost = () => {
    if (postContent.trim() === "") {
      toast({
        title: "El post está vacío",
        description: "Escribe algo antes de publicar.",
        variant: "destructive",
      });
      return;
    }
    // In a real app, you would handle the form submission here.
    // For now, we just show a toast and clear the textarea.
    console.log("New Post:", postContent);
    toast({
      title: "¡Publicación Creada!",
      description: "Tu post ahora es visible en el feed.",
    });
    setPostContent("");
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="w-full space-y-2">
            <Textarea
              placeholder={`¿Qué estás pensando, ${currentUser.name}?`}
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="min-h-[60px]"
            />
            <div className="flex justify-end">
              <Button onClick={handlePost}>
                <Send className="mr-2" />
                Publicar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
