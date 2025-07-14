import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Order, OrderStatus } from '@/types'

const changeOrderStatusSchema = z.object({
  status: z.enum([
    'pending',
    'approved',
    'rejected',
    'shipped',
    'delivered',
    'cancelled',
  ]),
  comments: z.string().optional(),
})

type ChangeOrderStatusFormData = z.infer<typeof changeOrderStatusSchema>

interface ChangeOrderStatusFormProps {
  isOpen: boolean
  onClose: () => void
  onSave: (orderId: string, data: ChangeOrderStatusFormData) => void
  order: Order | null
}

const ORDER_STATUSES: {
  value: OrderStatus
  label: string
  description: string
}[] = [
  {
    value: 'pending',
    label: 'Pending',
    description: 'Order is awaiting review',
  },
  {
    value: 'approved',
    label: 'Approved',
    description: 'Order has been approved for processing',
  },
  {
    value: 'rejected',
    label: 'Rejected',
    description: 'Order has been rejected',
  },
  {
    value: 'shipped',
    label: 'Shipped',
    description: 'Order has been shipped to customer',
  },
  {
    value: 'delivered',
    label: 'Delivered',
    description: 'Order has been delivered successfully',
  },
  {
    value: 'cancelled',
    label: 'Cancelled',
    description: 'Order has been cancelled',
  },
]

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
    case 'cancelled':
      return 'bg-orange-100 text-orange-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export const ChangeOrderStatusForm: React.FC<ChangeOrderStatusFormProps> = ({
  isOpen,
  onClose,
  onSave,
  order,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ChangeOrderStatusFormData>({
    resolver: zodResolver(changeOrderStatusSchema),
    defaultValues: {
      status: order?.status || 'pending',
      comments: '',
    },
  })

  // Reset form when order changes
  useState(() => {
    if (order) {
      form.reset({
        status: order.status,
        comments: '',
      })
    }
  })

  const onSubmit = async (data: ChangeOrderStatusFormData) => {
    if (!order) return

    setIsSubmitting(true)
    try {
      await onSave(order.id, data)
      form.reset()
      onClose()
    } catch (error) {
      console.error('Failed to update order status:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  if (!order) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Change Order Status</DialogTitle>
          <DialogDescription>
            Update the status for order {order.id}. Please provide comments
            explaining the reason for this change.
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4'>
          {/* Current Status Display */}
          <div className='flex items-center space-x-2'>
            <span className='text-sm font-medium'>Current Status:</span>
            <Badge className={getStatusColor(order.status)}>
              {order.status}
            </Badge>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              {/* Status Selection */}
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Status</FormLabel>
                    <Select
                      value={field.value || ''}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select new status' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ORDER_STATUSES.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            <div className='flex flex-col'>
                              <span className='font-medium'>
                                {status.label}
                              </span>
                              <span className='text-xs text-muted-foreground'>
                                {status.description}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Comments Field */}
              <FormField
                control={form.control}
                name='comments'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comments</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Please provide a reason for this status change...'
                        className='min-h-[100px]'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type='button'
                  variant='outline'
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type='submit' disabled={isSubmitting}>
                  {isSubmitting ? 'Updating...' : 'Update Status'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ChangeOrderStatusForm
