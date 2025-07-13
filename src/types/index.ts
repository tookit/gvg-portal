// Consolidated type definitions for the application

// User related types
export interface User {
  id?: number
  name: string
  email?: string
  role: string
  company: string
  budget: number
  spent: number
  status?: string
  lastLogin?: string
  avatar?: string
}

// Product related types
export type SizeKey = 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL' | '3XL'

export type Sizes = {
  [K in SizeKey]?: number
}

export interface Product {
  id: number
  name: string
  code: string
  price: number
  stock: number
  image?: string
  sizes: Sizes
  status?: 'pending' | 'approved' | 'rejected'
}

// Order related types
export interface Order {
  id: string
  date: string
  status: 'pending' | 'approved' | 'rejected' | 'shipped' | 'delivered'
  total: number
  items: number
}

// Bundle related types
export interface Bundle {
  id: number
  name: string
  items: number
  assigned: boolean
  budget: number
  category?: string
  description?: string
  products?: Array<{
    id: string
    name: string
    quantity: number
    price: number
  }>
  isActive?: boolean
}

export interface BundleFormData {
  name: string
  category?: string
  description: string
  budget: number
  products: Array<{
    id: string
    name: string
    quantity: number
    price: number
  }>
  isActive: boolean
}

// Cart related types
export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  size?: string
}

export interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

// Component props types
export interface DashboardProps {
  user: User
  orders: Order[]
  bundles: Bundle[]
}

export interface ReportsProps {
  user: User
  orders: Order[]
}

export interface LayoutProps {
  user: User
}

export interface CartProviderProps {
  children: React.ReactNode
}

// Database types are defined in @/lib/db.ts

// Form component props
export interface BundleFormProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: BundleFormData) => void
  bundle?: Bundle | null
}

// Status types
export type OrderStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'shipped'
  | 'delivered'
export type ProductStatus = 'pending' | 'approved' | 'rejected'
export type UserStatus = 'Active' | 'Inactive'

// API response types
export type ApiResponse<T> = {
  data: T
  success: boolean
  message?: string
}

// Common utility types
export type ID = string | number
export type Timestamp = string
export type Currency = number
