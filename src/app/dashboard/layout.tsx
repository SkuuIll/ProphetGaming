import Link from 'next/link';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import { Logo } from '@/components/icons/logo';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { FriendList } from '@/components/user/friend-list';
import { USERS } from '@/lib/placeholder-data';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = USERS[0];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo className="size-8 text-primary" />
            <span className="text-xl font-semibold font-headline">ProphetGaming</span>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarGroup>
            <div className="flex flex-col items-center gap-4 py-4">
              <Avatar className="w-24 h-24 border-4 border-primary/50 shadow-[0_0_20px_theme(colors.primary/40%)]">
                <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-lg font-semibold font-headline">{currentUser.name}</h2>
                <p className="text-sm text-muted-foreground">{currentUser.bio}</p>
              </div>
              <Button size="sm" asChild>
                <Link href="/dashboard/profile">Editar Perfil</Link>
              </Button>
            </div>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarNav />
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupLabel>Amigos en Línea</SidebarGroupLabel>
            <FriendList />
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          {/* El contenido del pie de página puede ir aquí */}
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <Header />
        <main className="p-4 sm:p-6 lg:p-8 space-y-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
