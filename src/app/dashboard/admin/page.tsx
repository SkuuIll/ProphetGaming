import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, Gamepad2, AlertTriangle } from "lucide-react";
import { USERS } from "@/lib/placeholder-data";
import { UserStatsChart } from "@/components/admin/user-stats-chart";

export default function AdminPage() {
  const activeUsers = USERS.filter(u => u.online).length;
  const totalUsers = USERS.length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Panel de Administración</h1>
        <p className="text-muted-foreground">Bienvenido, aquí puedes gestionar tu plataforma.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-secondary/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Totales</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">Todos los usuarios registrados</p>
          </CardContent>
        </Card>
        <Card className="bg-secondary/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
            <Gamepad2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers}</div>
            <p className="text-xs text-muted-foreground">Usuarios actualmente en línea</p>
          </CardContent>
        </Card>
        <Card className="bg-secondary/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contenido Reportado</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+5</div>
            <p className="text-xs text-muted-foreground">Publicaciones pendientes de revisión</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-secondary/30 lg:col-span-2">
          <CardHeader>
            <CardTitle>Actividad de Usuarios</CardTitle>
            <CardDescription>
              Un resumen de los nuevos usuarios en los últimos 7 días.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <UserStatsChart />
          </CardContent>
        </Card>

        <Card className="bg-secondary/30 lg:col-span-2">
          <CardHeader>
            <CardTitle>Gestión de Usuarios</CardTitle>
            <CardDescription>
              Supervisa y gestiona a los usuarios de la plataforma.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {USERS.slice(0, 5).map(user => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                            <Badge variant={user.online ? "default" : "outline"} className={user.online ? "bg-green-500/20 text-green-400 border-green-500/30" : ""}>
                            {user.online ? "En Línea" : "Desconectado"}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            <button className="text-primary hover:underline">Editar</button>
                        </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
