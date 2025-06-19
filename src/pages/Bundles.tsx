import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Plus, Eye, Edit, CheckCircle, X, Save } from 'lucide-react'
import { useState } from 'react'

interface BundlesProps {
  bundles: Array<{
    id: number
    name: string
    items: number
    assigned: boolean
    budget: number
    category?: 'Drivers' | 'Office' | 'Special Bundles'
  }>
}

interface BundleFormData {
  name: string
  category: 'Drivers' | 'Office' | 'Special Bundles' | ''
  description: string
  budget: string
  products: Array<{
    id: string
    name: string
    quantity: number
    price: number
  }>
  isActive: boolean
}

const BundleForm: React.FC<{
  isOpen: boolean
  onClose: () => void
  onSave: (data: BundleFormData) => void
}> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<BundleFormData>({
    name: '',
    category: '',
    description: '',
    budget: '',
    products: [],
    isActive: true
  })

  const [newProduct, setNewProduct] = useState({
    name: '',
    quantity: 1,
    price: 0
  })

  const handleAddProduct = () => {
    if (newProduct.name) {
      setFormData(prev => ({
        ...prev,
        products: [
          ...prev.products,
          {
            id: Date.now().toString(),
            ...newProduct
          }
        ]
      }))
      setNewProduct({ name: '', quantity: 1, price: 0 })
    }
  }

  const handleRemoveProduct = (id: string) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    setFormData({
      name: '',
      category: '',
      description: '',
      budget: '',
      products: [],
      isActive: true
    })
    onClose()
  }

  const totalProductCost = formData.products.reduce(
    (sum, product) => sum + (product.price * product.quantity),
    0
  )

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto'>
        <div className='flex items-center justify-between mb-6'>
          <h3 className='text-xl font-bold'>Create Product Bundle</h3>
          <Button variant='ghost' size='sm' onClick={onClose}>
            <X className='h-4 w-4' />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Basic Information */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='bundleName'>Bundle Name</Label>
              <Input
                id='bundleName'
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder='Enter bundle name'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='category'>Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value: 'Drivers' | 'Office' | 'Special Bundles') => 
                  setFormData(prev => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select category' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Drivers'>Drivers</SelectItem>
                  <SelectItem value='Office'>Office</SelectItem>
                  <SelectItem value='Special Bundles'>Special Bundles</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder='Describe the bundle purpose and contents'
              rows={3}
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='budget'>Budget Limit ($)</Label>
              <Input
                id='budget'
                type='number'
                value={formData.budget}
                onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                placeholder='0.00'
                min='0'
                step='0.01'
              />
            </div>
            <div className='flex items-center space-x-2 pt-6'>
              <Checkbox
                id='isActive'
                checked={formData.isActive}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, isActive: checked as boolean }))
                }
              />
              <Label htmlFor='isActive'>Active Bundle</Label>
            </div>
          </div>

          {/* Products Section */}
          <div className='space-y-4'>
            <h4 className='text-lg font-semibold'>Bundle Products</h4>
            
            {/* Add Product Form */}
            <Card>
              <CardHeader>
                <CardTitle className='text-base'>Add Product</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                  <div className='md:col-span-2'>
                    <Label htmlFor='productName'>Product Name</Label>
                    <Input
                      id='productName'
                      value={newProduct.name}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                      placeholder='Enter product name'
                    />
                  </div>
                  <div>
                    <Label htmlFor='quantity'>Quantity</Label>
                    <Input
                      id='quantity'
                      type='number'
                      value={newProduct.quantity}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                      min='1'
                    />
                  </div>
                  <div>
                    <Label htmlFor='price'>Price ($)</Label>
                    <Input
                      id='price'
                      type='number'
                      value={newProduct.price}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                      min='0'
                      step='0.01'
                      placeholder='0.00'
                    />
                  </div>
                </div>
                <Button
                  type='button'
                  onClick={handleAddProduct}
                  className='mt-4'
                  disabled={!newProduct.name}
                >
                  <Plus className='h-4 w-4 mr-2' />
                  Add Product
                </Button>
              </CardContent>
            </Card>

            {/* Products List */}
            {formData.products.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className='text-base'>Bundle Contents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-2'>
                    {formData.products.map((product) => (
                      <div key={product.id} className='flex items-center justify-between p-3 border rounded-lg'>
                        <div className='flex-1'>
                          <div className='font-medium'>{product.name}</div>
                          <div className='text-sm text-muted-foreground'>
                            Qty: {product.quantity} × ${product.price.toFixed(2)} = ${(product.quantity * product.price).toFixed(2)}
                          </div>
                        </div>
                        <Button
                          type='button'
                          variant='ghost'
                          size='sm'
                          onClick={() => handleRemoveProduct(product.id)}
                        >
                          <X className='h-4 w-4' />
                        </Button>
                      </div>
                    ))}
                    <div className='border-t pt-2 mt-4'>
                      <div className='flex justify-between items-center font-semibold'>
                        <span>Total Cost:</span>
                        <span>${totalProductCost.toFixed(2)}</span>
                      </div>
                      {formData.budget && parseFloat(formData.budget) > 0 && (
                        <div className='flex justify-between items-center text-sm text-muted-foreground'>
                          <span>Budget Remaining:</span>
                          <span className={parseFloat(formData.budget) - totalProductCost < 0 ? 'text-red-600' : 'text-green-600'}>
                            ${(parseFloat(formData.budget) - totalProductCost).toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Form Actions */}
          <div className='flex items-center justify-end space-x-4 pt-6 border-t'>
            <Button type='button' variant='outline' onClick={onClose}>
              Cancel
            </Button>
            <Button type='submit' disabled={!formData.name || !formData.category}>
              <Save className='h-4 w-4 mr-2' />
              Create Bundle
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

const Bundles: React.FC<BundlesProps> = ({ bundles }) => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [bundleList, setBundleList] = useState(bundles)

  const handleSaveBundle = (data: BundleFormData) => {
    const newBundle = {
      id: Date.now(),
      name: data.name,
      items: data.products.length,
      assigned: false,
      budget: parseFloat(data.budget) || 0,
      category: data.category as 'Drivers' | 'Office' | 'Special Bundles'
    }
    setBundleList(prev => [...prev, newBundle])
  }

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'Drivers': return 'bg-blue-100 text-blue-800'
      case 'Office': return 'bg-purple-100 text-purple-800'
      case 'Special Bundles': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold'>Bundle Management</h2>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className='h-4 w-4 mr-2' />
          Create Bundle
        </Button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {bundleList.map((bundle) => (
          <Card
            key={bundle.id}
            className={bundle.assigned ? 'border-green-200 bg-green-50' : ''}
          >
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-lg'>{bundle.name}</CardTitle>
                <div className='flex items-center space-x-2'>
                  {bundle.category && (
                    <Badge className={getCategoryColor(bundle.category)}>
                      {bundle.category}
                    </Badge>
                  )}
                  {bundle.assigned && (
                    <Badge className='bg-green-100 text-green-800'>
                      <CheckCircle className='h-3 w-3 mr-1' />
                      Assigned
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>Items</span>
                  <span className='font-medium'>{bundle.items}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>Budget</span>
                  <span className='font-medium'>${bundle.budget}</span>
                </div>
                <div className='flex items-center space-x-2 pt-2'>
                  <Button size='sm' variant='outline' className='flex-1'>
                    <Eye className='h-4 w-4 mr-1' />
                    View
                  </Button>
                  <Button size='sm' variant='outline' className='flex-1'>
                    <Edit className='h-4 w-4 mr-1' />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <BundleForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveBundle}
      />
    </div>
  )
}

export default Bundles
