import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const users = [
    { id: 'USR001', name: 'Alice Johnson', email: 'alice@example.com', joined: '2023-10-01', status: 'Active' },
    { id: 'USR002', name: 'Bob Williams', email: 'bob@example.com', joined: '2023-09-15', status: 'Active' },
    { id: 'USR003', name: 'Charlie Brown', email: 'charlie@example.com', joined: '2023-08-22', status: 'Suspended' },
];

const artisans = [
    { id: 'ART001', name: 'Elena Garcia', category: 'Carpenter', joined: '2023-05-10', status: 'Approved' },
    { id: 'ART002', name: 'David Chen', category: 'Plumber', joined: '2023-04-02', status: 'Approved' },
    { id: 'ART003', name: 'New Artisan', category: 'Painter', joined: '2023-10-25', status: 'Pending Approval' },
];

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-3xl font-headline font-bold mb-6">Admin Panel</h1>
      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="artisans">Artisan Management</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
              <CardDescription>Manage all registered users.</CardDescription>
            </CardHeader>
            <CardContent>
              <UserTable data={users} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="artisans" className="mt-4">
           <Card>
            <CardHeader>
              <CardTitle>All Artisans</CardTitle>
              <CardDescription>Manage all registered artisans.</CardDescription>
            </CardHeader>
            <CardContent>
              <ArtisanTable data={artisans} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="approvals" className="mt-4">
           <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>Review and approve new artisan applications.</CardDescription>
            </CardHeader>
            <CardContent>
              <ArtisanTable data={artisans.filter(a => a.status === 'Pending Approval')} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function UserTable({ data }: { data: typeof users }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map(user => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.joined}</TableCell>
                        <TableCell><Badge variant={user.status === 'Active' ? 'secondary' : 'destructive'}>{user.status}</Badge></TableCell>
                        <TableCell>
                            <AdminActions />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

function ArtisanTable({ data }: { data: typeof artisans }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map(artisan => (
                    <TableRow key={artisan.id}>
                        <TableCell className="font-medium">{artisan.name}</TableCell>
                        <TableCell>{artisan.category}</TableCell>
                        <TableCell>{artisan.joined}</TableCell>
                        <TableCell><Badge variant={artisan.status === 'Approved' ? 'default' : 'outline'}>{artisan.status}</Badge></TableCell>
                        <TableCell>
                            <AdminActions isApproval={artisan.status === 'Pending Approval'}/>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

function AdminActions({ isApproval = false }: { isApproval?: boolean}) {
    return (
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {isApproval ? (
                    <>
                        <DropdownMenuItem>Approve</DropdownMenuItem>
                        <DropdownMenuItem>Reject</DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Suspend</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
