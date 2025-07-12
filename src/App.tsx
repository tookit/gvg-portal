import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Orders from './pages/Orders'
import Bundles from './pages/Bundles'
import Products from './pages/Products'
import Reports from './pages/Reports'
import Checkout from './pages/Checkout'
import Users from './pages/Users'
import { CartProvider } from '@/contexts/CartContext'
import { users, orders, bundles } from '@/lib/data'
import type { User } from '@/types'

function App() {
  // Use the first user from data.ts as the current user
  const [user] = useState<User>({
    ...users[0],
    company: 'GVG Melbourne',
    budget: 2500,
    spent: 1750,
  })

  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout user={user} />}>
            <Route
              index
              element={
                <Dashboard user={user} orders={orders} bundles={bundles} />
              }
            />
            <Route path='orders' element={<Orders />} />
            <Route path='bundles' element={<Bundles />} />
            <Route path='products' element={<Products />} />
            <Route
              path='reports'
              element={<Reports user={user} orders={orders} />}
            />
            <Route path='checkout' element={<Checkout />} />
            <Route path='users' element={<Users />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
