import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Download, FileText, BarChart3, Package } from 'lucide-react'

interface ReportsProps {
  user: {
    name: string
    role: string
    company: string
    budget: number
    spent: number
  }
  orders: Array<{
    id: string
    date: string
    status: string
    total: number
    items: number
  }>
}

const Reports: React.FC<ReportsProps> = ({ user, orders }) => {
  const budgetPercentage = (user.spent / user.budget) * 100

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold'>Reports & Analytics</h2>
        <Button>
          <Download className='h-4 w-4 mr-2' />
          Export All
        </Button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle>Budget Analysis</CardTitle>
            <CardDescription>Current budget utilization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span>Total Budget</span>
                <span className='font-medium'>${user.budget}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span>Amount Spent</span>
                <span className='font-medium'>${user.spent}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span>Remaining</span>
                <span className='font-medium text-green-600'>
                  ${user.budget - user.spent}
                </span>
              </div>
              <Progress value={budgetPercentage} className='mt-4' />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>Order statistics this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span>Total Orders</span>
                <span className='font-medium'>{orders.length}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span>Pending</span>
                <span className='font-medium text-yellow-600'>
                  {orders.filter((o) => o.status === 'pending').length}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span>Completed</span>
                <span className='font-medium text-green-600'>
                  {orders.filter((o) => o.status === 'delivered').length}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span>Total Value</span>
                <span className='font-medium'>
                  ${orders.reduce((sum, order) => sum + order.total, 0)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Reports</CardTitle>
          <CardDescription>Generate and download reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <Button variant='outline' className='h-16 flex-col'>
              <FileText className='h-6 w-6 mb-2' />
              Order History
            </Button>
            <Button variant='outline' className='h-16 flex-col'>
              <BarChart3 className='h-6 w-6 mb-2' />
              Budget Report
            </Button>
            <Button variant='outline' className='h-16 flex-col'>
              <Package className='h-6 w-6 mb-2' />
              Bundle Usage
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Reports
