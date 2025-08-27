
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
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface User {
    id: string;
    fullName: string;
    email: string;
    joined: string;
    status: 'Active' | 'Suspended';
}

interface Artisan {
    id: string;
    name: string;
    category: string;
    joined: string;
    status: 'Approved' | 'Pending Approval';
}

async function getUsers(): Promise<User[]> {
    const usersCollection = collection(db, 'users');
    const userSnapshot = await getDocs(usersCollection);
    const userList = userSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        fullName: data.fullName,
        email: data.email,
        // Placeholders - to be implemented
        joined: new Date().toLocaleDateString(), 
        status: 'Active' as const
      };
    });
    return userList;
}

async function getArtisans(): Promise<Artisan[]> {
    const artisansCollection = collection(db, 'artisans');
    const artisanSnapshot = await getDocs(artisansCollection);
    const artisanList = artisanSnapshot.docs.map(doc => {
      const data = doc.data();
      const createdAt = data.createdAt as Timestamp;
      return {
        id: doc.id,
        name: data.fullName, // The form saves 'fullName'
        category: data.category,
        joined: createdAt ? createdAt.toDate().toLocaleDateString() : new Date().toLocaleDateString(),
        status: data.status,
      };
    });
    return artisanList;
}

export default async function AdminPage() {
  const users = await getUsers();
  const artisans = await getArtisans();
  
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

function UserTable({ data }: { data: User[] }) {
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
                {data.length > 0 ? data.map(user => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.fullName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.joined}</TableCell>
                        <TableCell><Badge variant={user.status === 'Active' ? 'secondary' : 'destructive'}>{user.status}</Badge></TableCell>
                        <TableCell>
                            <AdminActions />
                        </TableCell>
                    </TableRow>
                )) : (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center h-24">No users found.</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

function ArtisanTable({ data }: { data: Artisan[] }) {
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
                {data.length > 0 ? data.map(artisan => (
                    <TableRow key={artisan.id}>
                        <TableCell className="font-medium">{artisan.name}</TableCell>
                        <TableCell>{artisan.category}</TableCell>
                        <TableCell>{artisan.joined}</TableCell>
                        <TableCell><Badge variant={artisan.status === 'Approved' ? 'default' : 'outline'}>{artisan.status}</Badge></TableCell>
                        <TableCell>
                            <AdminActions isApproval={artisan.status === 'Pending Approval'}/>
                        </TableCell>
                    </TableRow>
                )) : (
                     <TableRow>
                        <TableCell colSpan={5} className="text-center h-24">No artisans found.</TableCell>
                    </TableRow>
                )}
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
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
