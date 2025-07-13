import type { Bundle, BundleFormData } from '@/types'

export const BUNDLE_CATEGORIES = [
  { value: 'Drivers', label: 'Drivers' },
  { value: 'Office', label: 'Office' },
  { value: 'Special Bundles', label: 'Special Bundles' },
] as const

export const getCategoryColor = (category?: string) => {
  switch (category) {
    case 'Drivers':
      return 'bg-blue-100 text-blue-800'
    case 'Office':
      return 'bg-purple-100 text-purple-800'
    case 'Special Bundles':
      return 'bg-orange-100 text-orange-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export const calculateTotalCost = (products: Bundle['products']) => {
  return products?.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  ) || 0
}

export const calculateBudgetRemaining = (budget: number, totalCost: number) => {
  return budget - totalCost
}

export const isBudgetExceeded = (budget: number, totalCost: number) => {
  return budget > 0 && totalCost > budget
}

export const createNewBundle = (data: BundleFormData): Omit<Bundle, 'id'> => {
  return {
    name: data.name,
    items: data.products.length,
    assigned: false,
    budget: data.budget || 0,
    category: data.category as 'Drivers' | 'Office' | 'Special Bundles',
    description: data.description,
    products: data.products,
    isActive: data.isActive,
  }
}

export const updateExistingBundle = (existingBundle: Bundle, data: BundleFormData): Bundle => {
  return {
    ...existingBundle,
    ...data,
    budget: data.budget,
    items: data.products.length,
  }
}

export const getInitialFormData = (bundle?: Bundle | null): BundleFormData => {
  if (bundle) {
    return {
      name: bundle.name,
      category: bundle.category || '',
      description: bundle.description || '',
      budget: bundle.budget,
      products: bundle.products || [],
      isActive: bundle.isActive ?? true,
    }
  }
  
  return {
    name: '',
    category: '',
    description: '',
    budget: 0,
    products: [],
    isActive: true,
  }
}