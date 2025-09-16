
"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Headphones, HeadphoneOff, ScreenShare, PhoneOff, Volume2 } from "lucide-react";
import { USERS } from '@/lib/placeholder-data';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const voiceChannels = [
    { id: 'general', name: 'Sala General' },
    { id: 'admin', name: 'Sala de Admins' }
];

const connectedUsers = USERS.slice(0, 4); // Mock data

export default function VoiceChatPage() {
    const [activeChannel, setActiveChannel] = useState('general');
    const [isMuted, setIsMuted] = useState(false);
    const [isDeafened, setIsDeafened] = useState(false);
    const [isSharingScreen, setIsSharingScreen] = useState(false);
    const [hasMicPermission, setHasMicPermission] = useState<boolean | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const { toast } = useToast();

    useEffect(() => {
        const getMicPermission = async () => {
            try {
                // Request microphone permission, we don't need to do anything with the stream yet
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
                setHasMicPermission(true);
                // Stop the tracks immediately as we only needed to ask for permission
                stream.getTracks().forEach(track => track.stop());
            } catch (error) {
                console.error('Error accessing microphone:', error);
                setHasMicPermission(false);
                toast({
                    variant: 'destructive',
                    title: 'Acceso al Micrófono Denegado',
                    description: 'Por favor, habilita los permisos del micrófono en tu navegador para usar el chat de voz.',
                });
            }
        };

        getMicPermission();
    }, [toast]);
    
    const handleScreenShare = async () => {
        if (isSharingScreen) {
            // Stop sharing
            if (videoRef.current && videoRef.current.srcObject) {
                (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
                videoRef.current.srcObject = null;
            }
            setIsSharingScreen(false);
        } else {
            // Start sharing
            try {
                const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                setIsSharingScreen(true);
                 stream.getVideoTracks()[0].addEventListener('ended', () => {
                    setIsSharingScreen(false);
                    if (videoRef.current) {
                        videoRef.current.srcObject = null;
                    }
                });
            } catch (error) {
                console.error('Error sharing screen:', error);
                toast({
                    variant: 'destructive',
                    title: 'No se pudo compartir la pantalla',
                    description: 'Asegúrate de conceder los permisos necesarios.',
                });
            }
        }
    };


    return (
        <div className="h-[calc(100vh-10rem)] flex flex-col">
            <div className="mb-6">
                <h1 className="text-3xl font-bold font-headline tracking-tight">Chat de Voz</h1>
                <p className="text-muted-foreground">Comunícate con tu equipo en tiempo real.</p>
            </div>
            
            {hasMicPermission === false && (
                <Alert variant="destructive" className="mb-4">
                  <AlertTitle>Se requiere acceso al micrófono</AlertTitle>
                  <AlertDescription>
                    Para usar el chat de voz, por favor permite el acceso al micrófono en la configuración de tu navegador.
                  </AlertDescription>
                </Alert>
            )}

            <Card className="h-full grid grid-cols-[280px_1fr] bg-secondary/30">
                {/* Channels List */}
                <div className="flex flex-col border-r">
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-semibold">Canales de Voz</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        {voiceChannels.map(channel => (
                            <div
                                key={channel.id}
                                onClick={() => setActiveChannel(channel.id)}
                                className={`flex items-center gap-3 p-2 cursor-pointer rounded-md hover:bg-secondary ${activeChannel === channel.id ? 'bg-secondary' : ''}`}
                            >
                                <Volume2 className="w-5 h-5" />
                                <span className="font-medium">{channel.name}</span>
                            </div>
                        ))}
                    </div>
                    <div className="p-3 border-t flex items-center justify-between bg-background/50">
                        <div className='flex items-center gap-2'>
                             <Avatar className="h-9 w-9">
                                <AvatarImage src={USERS[0].avatarUrl} alt={USERS[0].name} />
                                <AvatarFallback>{USERS[0].name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-semibold text-sm">{USERS[0].name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => setIsMuted(!isMuted)}>
                                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                            </Button>
                            <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => setIsDeafened(!isDeafened)}>
                                {isDeafened ? <HeadphoneOff className="w-5 h-5" /> : <Headphones className="w-5 h-5" />}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Conectado a: {voiceChannels.find(c => c.id === activeChannel)?.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto">
                        {isSharingScreen && (
                            <div className="col-span-full rounded-lg overflow-hidden border">
                                <video ref={videoRef} className="w-full h-full object-contain bg-black" autoPlay muted />
                            </div>
                        )}
                        {connectedUsers.map(user => (
                            <div key={user.id} className="flex flex-col items-center text-center gap-2">
                                <Avatar className="w-24 h-24 border-4 border-transparent ring-2 ring-green-500">
                                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <p className="font-semibold">{user.name}</p>
                            </div>
                        ))}
                    </CardContent>
                    <div className="p-4 border-t flex items-center justify-center gap-4 bg-background/50">
                        <Button variant={isSharingScreen ? "destructive" : "outline"} size="lg" onClick={handleScreenShare}>
                            <ScreenShare className="mr-2" />
                            {isSharingScreen ? 'Dejar de Compartir' : 'Compartir Pantalla'}
                        </Button>
                         <Button variant="destructive" size="lg">
                            <PhoneOff className="mr-2" />
                            Desconectar
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
