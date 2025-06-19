import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Orders from './pages/Orders'
import Bundles from './pages/Bundles'
import Products from './pages/Products'
import Reports from './pages/Reports'
import Checkout from './pages/Checkout'
import { CartProvider } from '@/contexts/CartContext'

function App() {
  const [user] = useState({
    name: 'John Smith',
    role: 'Staff Member',
    company: 'GVG Melbourne',
    budget: 2500,
    spent: 1750,
  })

  const [orders] = useState([
    {
      id: 'ORD-001',
      date: '2025-06-15',
      status: 'pending',
      total: 450,
      items: 3,
    },
    {
      id: 'ORD-002',
      date: '2025-06-10',
      status: 'approved',
      total: 320,
      items: 2,
    },
    {
      id: 'ORD-003',
      date: '2025-06-08',
      status: 'shipped',
      total: 180,
      items: 1,
    },
  ])

  const [bundles] = useState([
    {
      id: 1,
      name: 'Summer Uniform Package',
      items: 5,
      assigned: true,
      budget: 800,
    },
    {
      id: 2,
      name: 'Winter Accessories',
      items: 3,
      assigned: false,
      budget: 450,
    },
  ])

  const [products] = useState([
    {
      id: 1,
      name: 'Polo Shirt - Navy',
      code: 'PSN001',
      price: 45,
      stock: 150,
      image: 'https://via.placeholder.com/100x100/1e40af/ffffff?text=Polo', // Example placeholder
      sizes: {
        XS: 25,
        S: 45,
        M: 65,
        L: 40,
        XL: 30,
        '2XL': 15,
        '3XL': 8,
      },
    },
    {
      id: 2,
      name: 'Safety Vest - Hi-Vis',
      code: 'SVH002',
      price: 32,
      stock: 89,
      image: 'https://via.placeholder.com/100x100/eab308/000000?text=Vest', // Example placeholder
      sizes: {
        S: 0,
        M: 15,
        L: 25,
        XL: 30,
        '2XL': 12,
        '3XL': 7,
      },
    },
    {
      id: 3,
      name: 'Work Boots - Black',
      code: 'WBB003',
      price: 125,
      stock: 45,
      image: 'https://via.placeholder.com/100x100/000000/ffffff?text=Boots', // Example placeholder
      sizes: {
        S: 8,
        M: 12,
        L: 15,
        XL: 10,
        '2XL': 0,
      },
    },
  ])

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
            <Route path='orders' element={<Orders orders={orders} />} />
            <Route path='bundles' element={<Bundles bundles={bundles} />} />
            <Route path='products' element={<Products products={products} />} />
            <Route
              path='reports'
              element={<Reports user={user} orders={orders} />}
            />
            <Route path='checkout' element={<Checkout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
