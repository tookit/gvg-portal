import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Search, Filter, Plus, MoreHorizontal } from 'lucide-react'
import { getUsers } from '@/lib/api'
import { users as mockUsers } from '@/lib/data'

const Users: React.FC = () => {
  const [users, setUsers] = useState<typeof mockUsers>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers()
      setUsers(data)
    }
    fetchUsers()
  }, [])
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge variant="outline">{status}</Badge>
      case 'Inactive':
        return <Badge variant="secondary">{status}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold'>User Management</h2>
        <Button>
          <Plus className='h-4 w-4 mr-2' />
          Add User
        </Button>
      </div>

      <div className='flex items-center space-x-4'>
        <div className='flex-1'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
            <Input placeholder='Search users...' className='pl-10' />
          </div>
        </div>
        <Button variant='outline'>
          <Filter className='h-4 w-4 mr-2' />
          Filter
        </Button>
      </div>

      <Card>
        <CardContent className='p-0'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='border-b bg-gray-50'>
                <tr>
                  <th className='text-left p-4 font-medium'>User</th>
                  <th className='text-left p-4 font-medium'>Role</th>
                  <th className='text-left p-4 font-medium'>Status</th>
                  <th className='text-left p-4 font-medium'>Last Login</th>
                  <th className='text-left p-4 font-medium'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className='border-b hover:bg-muted/50'>
                    <td className='p-4'>
                      <div className='flex items-center space-x-3'>
                        <img src={user.avatar} alt={user.name} className='w-10 h-10 rounded-full' />
                        <div>
                          <div className='font-medium'>{user.name}</div>
                          <div className='text-sm text-muted-foreground'>{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className='p-4'>{user.role}</td>
                    <td className='p-4'>{getStatusBadge(user.status)}</td>
                    <td className='p-4'>{new Date(user.lastLogin).toLocaleString()}</td>
                    <td className='p-4'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>View</DropdownMenuItem>
                          <DropdownMenuItem>Deactivate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Users
