"use client";

import { USERS } from "@/lib/placeholder-data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { Badge } from "../ui/badge";

export function UserProfileCard() {
    const user = USERS[0];

    return (
        <Card className="shadow-lg bg-secondary/30 h-full">
            <CardHeader className="items-center pt-8">
                <div className="relative">
                    <Avatar className="w-32 h-32 border-4 border-primary/50 shadow-[0_0_20px_theme(colors.primary/40%)]">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="icon" className="absolute -bottom-2 -right-2 rounded-full border-2 border-background bg-secondary hover:bg-secondary/80">
                         <Camera className="w-5 h-5"/>
                         <span className="sr-only">Change Picture</span>
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="text-center p-6">
                <h2 className="text-2xl font-bold font-headline">{user.name}</h2>
                <p className="text-muted-foreground text-sm">{user.email}</p>
                <div className="mt-4">
                  <Badge variant="outline" className="border-primary/50 text-primary">"{user.motto}"</Badge>
                </div>
                <p className="mt-4 text-sm max-w-xs mx-auto text-muted-foreground">{user.bio}</p>
            </CardContent>
        </Card>
    )
}
