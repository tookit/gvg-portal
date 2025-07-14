import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Bell,
  Settings,
  BarChart3,
  ShoppingCart,
  Package,
  FileText,
  UsersIcon,
  Info,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCart } from '@/contexts/CartContext'
import CartDrawer from './CartDrawer'
import type { LayoutProps } from '@/types'

const Layout: React.FC<LayoutProps> = ({ user }) => {
  const location = useLocation()
  const { openCart, getTotalItems } = useCart()

  const navigation = [
    { name: 'Dashboard', href: '/', icon: BarChart3 },
    { name: 'Orders', href: '/orders', icon: ShoppingCart },
    { name: 'Bundles', href: '/bundles', icon: Package },
    { name: 'Products', href: '/products', icon: Package },
    { name: 'Reports', href: '/reports', icon: FileText },
    { name: 'Users', href: '/users', icon: UsersIcon },
  ]

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <header className='bg-white border-b border-gray-200 sticky top-0 z-10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <div className='flex items-center space-x-4'>
              <div className='font-bold text-xl text-blue-600'>GVG Portal</div>
              <Badge variant='outline'>Beta</Badge>
            </div>

            <div className='flex items-center space-x-4'>
              <Button variant='ghost' size='sm'>
                <Bell className='h-4 w-4' />
              </Button>

              {/* Cart Button */}
              <Button
                variant='ghost'
                size='sm'
                onClick={openCart}
                className='relative'
              >
                <ShoppingCart className='h-4 w-4' />
                {getTotalItems() > 0 && (
                  <Badge
                    variant='destructive'
                    className='absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0'
                  >
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>

              <div className='text-sm'>
                <div className='font-medium'>{user.name}</div>
                <div className='text-muted-foreground'>{user.role}</div>
              </div>
              <Button variant='ghost' size='sm'>
                <Settings className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className='bg-white border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex space-x-8'>
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                    isActive
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  )}
                >
                  <Icon className='h-4 w-4' />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Alert Banner */}
      <div className='bg-blue-50 border-b border-blue-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-center py-3'>
            <div className='flex items-center space-x-2 text-blue-800'>
              <Info className='h-4 w-4' />
              <span className='text-sm font-medium'>
                Note: This is a demonstration prototype. Actual functionality is under development.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <Outlet />
      </main>

      {/* Cart Drawer */}
      <CartDrawer />
    </div>
  )
}

export default Layout
