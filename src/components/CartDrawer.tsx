import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'

const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    removeItem,
    updateQuantity,
    closeCart,
    getTotalItems,
    getTotalPrice,
  } = useCart()

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className='fixed inset-0 bg-opacity-50 z-40 transition-opacity'
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className='fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform'>
        <div className='flex flex-col h-full'>
          {/* Header */}
          <div className='flex items-center justify-between p-4 border-b'>
            <div className='flex items-center space-x-2'>
              <ShoppingBag className='h-5 w-5' />
              <h2 className='text-lg font-semibold'>Shopping Cart</h2>
              {getTotalItems() > 0 && (
                <Badge variant='secondary'>{getTotalItems()}</Badge>
              )}
            </div>
            <Button variant='ghost' size='sm' onClick={closeCart}>
              <X className='h-4 w-4' />
            </Button>
          </div>

          {/* Cart Items */}
          <div className='flex-1 overflow-y-auto p-4'>
            {items.length === 0 ? (
              <div className='flex flex-col items-center justify-center h-full text-center'>
                <ShoppingBag className='h-12 w-12 text-gray-400 mb-4' />
                <h3 className='text-lg font-medium text-gray-900 mb-2'>
                  Your cart is empty
                </h3>
                <p className='text-gray-500'>
                  Add some products to get started!
                </p>
              </div>
            ) : (
              <div className='space-y-4'>
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size || 'default'}`}
                    className='flex items-center space-x-3 p-3 border rounded-lg'
                  >
                    {/* Product Image */}
                    <div className='w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden'>
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className='w-full h-full object-cover'
                        />
                      ) : (
                        <div className='text-gray-400 text-xs text-center'>
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className='flex-1 min-w-0'>
                      <h4 className='font-medium text-sm truncate'>
                        {item.name}
                      </h4>
                      {item.size && (
                        <p className='text-xs text-gray-500'>
                          Size: {item.size}
                        </p>
                      )}
                      <p className='text-sm font-semibold text-blue-600'>
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className='flex items-center space-x-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() =>
                          updateQuantity(
                            `${item.id}-${item.size || 'default'}`,
                            item.quantity - 1
                          )
                        }
                        className='h-8 w-8 p-0'
                      >
                        <Minus className='h-3 w-3' />
                      </Button>
                      <Input
                        type='number'
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            `${item.id}-${item.size || 'default'}`,
                            parseInt(e.target.value) || 1
                          )
                        }
                        className='w-16 h-8 text-center text-sm'
                        min='1'
                      />
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() =>
                          updateQuantity(
                            `${item.id}-${item.size || 'default'}`,
                            item.quantity + 1
                          )
                        }
                        className='h-8 w-8 p-0'
                      >
                        <Plus className='h-3 w-3' />
                      </Button>
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() =>
                        removeItem(`${item.id}-${item.size || 'default'}`)
                      }
                      className='h-8 w-8 p-0 text-red-500 hover:text-red-700'
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className='border-t p-4 space-y-3'>
            <div className='flex justify-between items-center font-bold text-lg'>
              <span>Total:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className='space-y-2'>
              <Button
                className='w-full'
                size='lg'
                onClick={() => {
                  closeCart()
                  // Navigate to checkout - you'll need to import useNavigate
                  window.location.href = '/checkout'
                }}
                disabled={items.length === 0}
              >
                Proceed to Checkout
              </Button>
              <Button
                variant='outline'
                className='w-full'
                onClick={() => {
                  closeCart()
                  window.location.href = '/products'
                }}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartDrawer
