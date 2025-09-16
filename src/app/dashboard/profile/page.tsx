import { PlayerCardGenerator } from "@/components/ai/player-card-generator";
import { UserProfileCard } from "@/components/user/user-profile-card";

export default function ProfilePage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline tracking-tight">Tu Perfil</h1>
                <p className="text-muted-foreground">Personaliza tu presencia en ProphetGaming.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <UserProfileCard />
                </div>
                <div className="lg:col-span-2">
                    <PlayerCardGenerator />
                </div>
            </div>
        </div>
    );
}
