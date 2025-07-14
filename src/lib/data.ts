import type { User, Product, Order, Bundle } from '@/types'

export const users: User[] = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2024-07-10T10:00:00Z',
    avatar: '/avatars/01.png',
    company: 'Example Corp',
    budget: 5000,
    spent: 0,
  },
  {
    id: 2,
    name: 'Sales Manager',
    email: 'manager@example.com',
    role: 'Manager',
    status: 'Active',
    lastLogin: '2024-07-11T12:30:00Z',
    avatar: '/avatars/02.png',
    company: 'Example Corp',
    budget: 3000,
    spent: 0,
  },
  {
    id: 3,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Sales Rep',
    status: 'Active',
    lastLogin: '2024-07-11T14:00:00Z',
    avatar: '/avatars/03.png',
    company: 'Example Corp',
    budget: 2000,
    spent: 0,
  },
  {
    id: 4,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Sales Rep',
    status: 'Inactive',
    lastLogin: '2024-06-20T11:00:00Z',
    avatar: '/avatars/04.png',
    company: 'Example Corp',
    budget: 2000,
    spent: 0,
  },
  {
    id: 5,
    name: 'Peter Jones',
    email: 'peter.jones@example.com',
    role: 'Sales Rep',
    status: 'Active',
    lastLogin: '2024-07-09T09:15:00Z',
    avatar: '/avatars/05.png',
    company: 'Example Corp',
    budget: 2000,
    spent: 0,
  },
]

export const products: Product[] = [
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
]

export const orders: Order[] = [
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
]

export const bundles: Bundle[] = [
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
  
]
