import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Search,
  Download,
  Plus,
  Eye,
  Edit,
  ChevronDown,
  Check,
  X,
} from 'lucide-react'
import { getOrders } from '@/lib/api'

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([])
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrders()
      setOrders(data)
    }
    fetchOrders()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      case 'delivered':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleStatusChange = (
    orderId: string,
    newStatus: 'approved' | 'rejected'
  ) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    )
    setOpenDropdown(null)
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold'>Orders</h2>
        <Button>
          <Plus className='h-4 w-4 mr-2' />
          New Order
        </Button>
      </div>

      <div className='flex items-center space-x-4'>
        <div className='flex-1'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
            <Input placeholder='Search orders...' className='pl-10' />
          </div>
        </div>
        <Select>
          <SelectTrigger className='w-40'>
            <SelectValue placeholder='Status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Status</SelectItem>
            <SelectItem value='pending'>Pending</SelectItem>
            <SelectItem value='approved'>Approved</SelectItem>
            <SelectItem value='rejected'>Rejected</SelectItem>
            <SelectItem value='shipped'>Shipped</SelectItem>
          </SelectContent>
        </Select>
        <Button variant='outline'>
          <Download className='h-4 w-4 mr-2' />
          Export
        </Button>
      </div>

      <Card>
        <CardContent className='p-0'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='border-b'>
                <tr>
                  <th className='text-left p-4 font-medium'>Order ID</th>
                  <th className='text-left p-4 font-medium'>Date</th>
                  <th className='text-left p-4 font-medium'>Status</th>
                  <th className='text-left p-4 font-medium'>Items</th>
                  <th className='text-left p-4 font-medium'>Total</th>
                  <th className='text-left p-4 font-medium'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className='border-b hover:bg-muted/50'>
                    <td className='p-4 font-medium'>{order.id}</td>
                    <td className='p-4 text-muted-foreground'>{order.date}</td>
                    <td className='p-4'>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className='p-4'>{order.items}</td>
                    <td className='p-4 font-medium'>${order.total}</td>
                    <td className='p-4'>
                      <div className='flex items-center space-x-2'>
                        <Button size='sm' variant='outline'>
                          <Eye className='h-4 w-4' />
                        </Button>
                        <Button size='sm' variant='outline'>
                          <Edit className='h-4 w-4' />
                        </Button>

                        {/* Approval Dropdown */}
                        <div className='relative'>
                          <Button
                            size='sm'
                            variant='outline'
                            onClick={() =>
                              setOpenDropdown(
                                openDropdown === order.id ? null : order.id
                              )
                            }
                          >
                            Status
                            <ChevronDown className='h-4 w-4 ml-1' />
                          </Button>

                          {openDropdown === order.id && (
                            <div className='absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10'>
                              <div className='py-1'>
                                <button
                                  onClick={() =>
                                    handleStatusChange(order.id, 'approved')
                                  }
                                  className='flex items-center w-full px-3 py-2 text-sm text-green-700 hover:bg-green-50 transition-colors'
                                >
                                  <Check className='h-4 w-4 mr-2' />
                                  Approve
                                </button>
                                <button
                                  onClick={() =>
                                    handleStatusChange(order.id, 'rejected')
                                  }
                                  className='flex items-center w-full px-3 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors'
                                >
                                  <X className='h-4 w-4 mr-2' />
                                  Reject
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
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

export default Orders
