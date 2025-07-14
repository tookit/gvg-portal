import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  CalendarDays,
  MapPin,
  Phone,
  Mail,
  Package,
  CreditCard,
  Truck,
  User,
  ShoppingBag,
  FileText,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { Order, Product } from '@/types'
import { getProducts } from '@/lib/api'

interface OrderDetailsProps {
  isOpen: boolean
  onClose: () => void
  order: Order | null
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'processing':
      return 'bg-blue-100 text-blue-800'
    case 'shipped':
      return 'bg-purple-100 text-purple-800'
    case 'delivered':
      return 'bg-green-100 text-green-800'
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({
  isOpen,
  onClose,
  order,
}) => {
  const [products, setProducts] = useState<Product[]>([])

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getProducts()
        setProducts(allProducts)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      }
    }
    fetchProducts()
  }, [])

  if (!order) return null

  // Mock order items - in a real app, this would come from the order data
  const orderItems = [
    { productId: 1, quantity: 2, price: 29.99 },
    { productId: 2, quantity: 1, price: 49.99 },
  ]

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const tax = subtotal * 0.08 // 8% tax
  const shipping = 9.99
  const total = subtotal + tax + shipping

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto min-w-[90vh]'>
        <DialogHeader>
          <div className='flex items-center justify-between'>
            <DialogTitle className='text-2xl font-bold'>
              Order #{order.id}
            </DialogTitle>
            <div className='flex items-center gap-2'>
              <Badge className={getStatusColor(order.status)}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue='overview' className='w-full'>
          <TabsList className='grid w-full grid-cols-4'>
            <TabsTrigger value='overview' className='flex items-center gap-2'>
              <FileText className='h-4 w-4' />
              Overview
            </TabsTrigger>
            <TabsTrigger value='items' className='flex items-center gap-2'>
              <ShoppingBag className='h-4 w-4' />
              Items
            </TabsTrigger>
            <TabsTrigger value='customer' className='flex items-center gap-2'>
              <User className='h-4 w-4' />
              Customer
            </TabsTrigger>
            <TabsTrigger value='payment' className='flex items-center gap-2'>
              <CreditCard className='h-4 w-4' />
              Payment
            </TabsTrigger>
          </TabsList>

          <TabsContent value='overview' className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {/* Order Information */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Package className='h-5 w-5' />
                    Order Information
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <div className='flex justify-between'>
                    <span className='text-sm text-gray-600'>Order Date:</span>
                    <span className='text-sm font-medium'>
                      {formatDate(order.date)}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-sm text-gray-600'>Customer:</span>
                    <span className='text-sm font-medium'>
                      {order.customer}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-sm text-gray-600'>Total Amount:</span>
                    <span className='text-sm font-medium'>
                      {formatCurrency(total)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Order Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <CalendarDays className='h-5 w-5' />
                    Order Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-3'>
                    <div className='flex items-center text-sm'>
                      <div className='w-2 h-2 bg-green-500 rounded-full mr-3'></div>
                      <span className='text-gray-600'>
                        Order placed - {formatDate(order.date)}
                      </span>
                    </div>
                    {order.status !== 'pending' && (
                      <div className='flex items-center text-sm'>
                        <div className='w-2 h-2 bg-blue-500 rounded-full mr-3'></div>
                        <span className='text-gray-600'>
                          Processing started
                        </span>
                      </div>
                    )}
                    {(order.status === 'shipped' ||
                      order.status === 'delivered') && (
                      <div className='flex items-center text-sm'>
                        <div className='w-2 h-2 bg-purple-500 rounded-full mr-3'></div>
                        <span className='text-gray-600'>Order shipped</span>
                      </div>
                    )}
                    {order.status === 'delivered' && (
                      <div className='flex items-center text-sm'>
                        <div className='w-2 h-2 bg-green-500 rounded-full mr-3'></div>
                        <span className='text-gray-600'>Order delivered</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Truck className='h-5 w-5' />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <h4 className='font-medium mb-2'>Shipping Address</h4>
                    <div className='text-sm space-y-1'>
                      <p className='font-medium'>{order.customer}</p>
                      <p>123 Main Street</p>
                      <p>Apt 4B</p>
                      <p>New York, NY 10001</p>
                      <p>United States</p>
                    </div>
                  </div>
                  <div>
                    <h4 className='font-medium mb-2'>Shipping Method</h4>
                    <div className='text-sm space-y-1'>
                      <p>Standard Shipping</p>
                      <p className='text-gray-600'>5-7 business days</p>
                      {order.status === 'shipped' ||
                      order.status === 'delivered' ? (
                        <div className='mt-2 p-2 bg-blue-50 rounded'>
                          <p className='text-sm font-medium text-blue-800'>
                            Tracking Number
                          </p>
                          <p className='text-sm text-blue-600'>
                            1Z999AA1234567890
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='items' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {orderItems.map((item, index) => {
                    const product = products.find(
                      (p) => p.id === item.productId
                    )
                    return (
                      <div
                        key={index}
                        className='flex items-center space-x-4 p-4 border rounded-lg'
                      >
                        <div className='w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center'>
                          {product?.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className='w-full h-full object-cover rounded-lg'
                            />
                          ) : (
                            <Package className='h-8 w-8 text-gray-400' />
                          )}
                        </div>
                        <div className='flex-1'>
                          <h4 className='font-medium'>
                            {product?.name || 'Product Name'}
                          </h4>
                          <p className='text-sm text-gray-500'>
                            SKU: {product?.code || 'N/A'}
                          </p>
                          <p className='text-sm text-gray-500'>
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <div className='text-right'>
                          <p className='font-medium'>
                            {formatCurrency(item.price)}
                          </p>
                          <p className='text-sm text-gray-500'>each</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='customer' className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <User className='h-5 w-5' />
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <div>
                    <p className='font-medium'>{order.customer}</p>
                    <p className='text-sm text-gray-500'>
                      customer@example.com
                    </p>
                  </div>
                  <div className='flex items-center text-sm text-gray-600'>
                    <Phone className='h-4 w-4 mr-2' />
                    +1 (555) 123-4567
                  </div>
                  <div className='flex items-center text-sm text-gray-600'>
                    <Mail className='h-4 w-4 mr-2' />
                    customer@example.com
                  </div>
                </CardContent>
              </Card>

              {/* Billing Address */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <MapPin className='h-5 w-5' />
                    Billing Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-sm space-y-1'>
                    <p className='font-medium'>{order.customer}</p>
                    <p>123 Main Street</p>
                    <p>Apt 4B</p>
                    <p>New York, NY 10001</p>
                    <p>United States</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Truck className='h-5 w-5' />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-sm space-y-1'>
                  <p className='font-medium'>{order.customer}</p>
                  <p>123 Main Street</p>
                  <p>Apt 4B</p>
                  <p>New York, NY 10001</p>
                  <p>United States</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='payment' className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {/* Payment Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <CreditCard className='h-5 w-5' />
                    Payment Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <div className='flex justify-between text-sm'>
                    <span>Subtotal:</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span>Tax:</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span>Shipping:</span>
                    <span>{formatCurrency(shipping)}</span>
                  </div>
                  <Separator />
                  <div className='flex justify-between font-medium text-lg'>
                    <span>Total:</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <CreditCard className='h-5 w-5' />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='p-3 bg-gray-50 rounded-lg'>
                    <div className='flex items-center text-sm mb-2'>
                      <CreditCard className='h-4 w-4 mr-2' />
                      <span>•••• •••• •••• 4242</span>
                    </div>
                    <p className='text-xs text-gray-500'>Visa ending in 4242</p>
                    <p className='text-xs text-gray-500 mt-1'>Expires 12/25</p>
                  </div>
                  <div className='mt-3 text-sm'>
                    <p className='text-green-600 font-medium'>
                      ✓ Payment Successful
                    </p>
                    <p className='text-gray-500 text-xs'>
                      Processed on {formatDate(order.date)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default OrderDetails
