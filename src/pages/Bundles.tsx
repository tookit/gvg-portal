import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Plus, Eye, Edit, CheckCircle, X, Save, Package } from 'lucide-react'
import type { Bundle, BundleFormData } from '@/types'

// Mock API functions - replace with your actual API
const getBundles = async () => {
  // Mock data for demonstration
  return [
    {
      id: 1,
      name: 'Driver Safety Kit',
      items: 5,
      assigned: true,
      budget: 150.0,
      category: 'Drivers' as const,
      description: 'Essential safety equipment for all drivers',
      products: [
        { id: '1', name: 'First Aid Kit', quantity: 1, price: 25.0 },
        { id: '2', name: 'Emergency Flashlight', quantity: 1, price: 15.0 },
        { id: '3', name: 'Reflective Vest', quantity: 2, price: 12.5 },
        { id: '4', name: 'Road Flares', quantity: 4, price: 8.75 },
      ],
      isActive: true,
    },
    {
      id: 2,
      name: 'Office Starter Pack',
      items: 8,
      assigned: false,
      budget: 200.0,
      category: 'Office' as const,
      description: 'Complete office setup for new employees',
      products: [
        { id: '5', name: 'Desk Organizer', quantity: 1, price: 20.0 },
        { id: '6', name: 'Notebook Set', quantity: 3, price: 8.0 },
        { id: '7', name: 'Pen Set', quantity: 2, price: 12.0 },
        { id: '8', name: 'Desk Lamp', quantity: 1, price: 35.0 },
      ],
      isActive: true,
    },
  ]
}

const addBundle = async (bundle: BundleFormData) => {
  return bundle
}

const updateBundle = async (bundle: BundleFormData) => {
  return bundle
}

const BundleForm: React.FC<{
  isOpen: boolean
  onClose: () => void
  onSave: (data: BundleFormData) => void
  bundle?: Bundle | null
}> = ({ isOpen, onClose, onSave, bundle }) => {
  const [formData, setFormData] = useState<BundleFormData>({
    name: '',
    category: '',
    description: '',
    budget: '',
    products: [],
    isActive: true,
  })

  useEffect(() => {
    if (bundle) {
      setFormData({
        name: bundle.name,
        category: bundle.category || '',
        description: bundle.description || '',
        budget: bundle.budget.toString(),
        products: bundle.products || [],
        isActive: bundle.isActive ?? true,
      })
    } else {
      setFormData({
        name: '',
        category: '',
        description: '',
        budget: '',
        products: [],
        isActive: true,
      })
    }
  }, [bundle])

  const [newProduct, setNewProduct] = useState({
    name: '',
    quantity: 1,
    price: 0,
  })

  const handleAddProduct = () => {
    if (newProduct.name) {
      setFormData((prev) => ({
        ...prev,
        products: [
          ...prev.products,
          {
            id: Date.now().toString(),
            ...newProduct,
          },
        ],
      }))
      setNewProduct({ name: '', quantity: 1, price: 0 })
    }
  }

  const handleRemoveProduct = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== id),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  const totalProductCost = formData.products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  )

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black bg-black/50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto'>
        <div className='flex items-center justify-between mb-6'>
          <h3 className='text-xl font-bold'>
            {bundle ? 'Edit' : 'Create'} Product Bundle
          </h3>
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
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder='Enter bundle name'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='category'>Category</Label>
              <Select
                value={formData.category}
                onValueChange={(
                  value: 'Drivers' | 'Office' | 'Special Bundles'
                ) => setFormData((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select category' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Drivers'>Drivers</SelectItem>
                  <SelectItem value='Office'>Office</SelectItem>
                  <SelectItem value='Special Bundles'>
                    Special Bundles
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
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
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, budget: e.target.value }))
                }
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
                  setFormData((prev) => ({
                    ...prev,
                    isActive: checked as boolean,
                  }))
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
                      onChange={(e) =>
                        setNewProduct((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder='Enter product name'
                    />
                  </div>
                  <div>
                    <Label htmlFor='quantity'>Quantity</Label>
                    <Input
                      id='quantity'
                      type='number'
                      value={newProduct.quantity}
                      onChange={(e) =>
                        setNewProduct((prev) => ({
                          ...prev,
                          quantity: parseInt(e.target.value) || 1,
                        }))
                      }
                      min='1'
                    />
                  </div>
                  <div>
                    <Label htmlFor='price'>Price ($)</Label>
                    <Input
                      id='price'
                      type='number'
                      value={newProduct.price}
                      onChange={(e) =>
                        setNewProduct((prev) => ({
                          ...prev,
                          price: parseFloat(e.target.value) || 0,
                        }))
                      }
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
                      <div
                        key={product.id}
                        className='flex items-center justify-between p-3 border rounded-lg'
                      >
                        <div className='flex-1'>
                          <div className='font-medium'>{product.name}</div>
                          <div className='text-sm text-muted-foreground'>
                            Qty: {product.quantity} × $
                            {product.price.toFixed(2)} = $
                            {(product.quantity * product.price).toFixed(2)}
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
                          <span
                            className={
                              parseFloat(formData.budget) - totalProductCost < 0
                                ? 'text-red-600'
                                : 'text-green-600'
                            }
                          >
                            $
                            {(
                              parseFloat(formData.budget) - totalProductCost
                            ).toFixed(2)}
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
            <Button
              type='submit'
              disabled={!formData.name || !formData.category}
            >
              <Save className='h-4 w-4 mr-2' />
              {bundle ? 'Save Changes' : 'Create Bundle'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

const ViewBundleDialog: React.FC<{
  bundle: Bundle | null
  onClose: () => void
  onEdit: (bundle: Bundle) => void
}> = ({ bundle, onClose, onEdit }) => {
  if (!bundle) return null

  const totalCost =
    bundle.products?.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    ) || 0

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto'>
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center space-x-3'>
            <Package className='h-6 w-6 text-blue-600' />
            <h3 className='text-xl font-bold'>{bundle.name}</h3>
          </div>
          <Button variant='ghost' size='sm' onClick={onClose}>
            <X className='h-4 w-4' />
          </Button>
        </div>

        <div className='space-y-6'>
          {/* Header Info */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-3'>
              <div className='flex items-center space-x-2'>
                <Badge
                  className={
                    bundle.category === 'Drivers'
                      ? 'bg-blue-100 text-blue-800'
                      : bundle.category === 'Office'
                      ? 'bg-purple-100 text-purple-800'
                      : bundle.category === 'Special Bundles'
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-gray-100 text-gray-800'
                  }
                >
                  {bundle.category}
                </Badge>
                {bundle.assigned && (
                  <Badge className='bg-green-100 text-green-800'>
                    <CheckCircle className='h-3 w-3 mr-1' />
                    Assigned
                  </Badge>
                )}
                <Badge variant={bundle.isActive ? 'default' : 'secondary'}>
                  {bundle.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <div className='text-sm text-gray-600'>
                <p>{bundle.description}</p>
              </div>
            </div>
            <div className='space-y-2'>
              <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                <span className='text-sm font-medium'>Budget Limit:</span>
                <span className='font-semibold text-lg'>
                  ${bundle.budget.toFixed(2)}
                </span>
              </div>
              <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                <span className='text-sm font-medium'>Total Cost:</span>
                <span className='font-semibold text-lg'>
                  ${totalCost.toFixed(2)}
                </span>
              </div>
              <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                <span className='text-sm font-medium'>Remaining:</span>
                <span
                  className={`font-semibold text-lg ${
                    bundle.budget - totalCost < 0
                      ? 'text-red-600'
                      : 'text-green-600'
                  }`}
                >
                  ${(bundle.budget - totalCost).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Products List */}
          <div>
            <h4 className='text-lg font-semibold mb-3 flex items-center'>
              <Package className='h-5 w-5 mr-2' />
              Bundle Contents ({bundle.products?.length || 0} items)
            </h4>
            {bundle.products && bundle.products.length > 0 ? (
              <div className='space-y-2'>
                {bundle.products.map((product) => (
                  <div
                    key={product.id}
                    className='flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50'
                  >
                    <div className='flex-1'>
                      <div className='font-medium'>{product.name}</div>
                      <div className='text-sm text-gray-600'>
                        Quantity: {product.quantity} × $
                        {product.price.toFixed(2)} each
                      </div>
                    </div>
                    <div className='text-right'>
                      <div className='font-semibold'>
                        ${(product.quantity * product.price).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-center py-8 text-gray-500'>
                <Package className='h-12 w-12 mx-auto mb-3 opacity-50' />
                <p>No products in this bundle</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className='flex items-center justify-end space-x-4 pt-6 border-t'>
            <Button variant='outline' onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={() => onEdit(bundle)}
              className='bg-blue-600 hover:bg-blue-700'
            >
              <Edit className='h-4 w-4 mr-2' />
              Edit Bundle
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const Bundles: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [bundleList, setBundleList] = useState<Bundle[]>([])
  const [selectedBundle, setSelectedBundle] = useState<Bundle | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)

  useEffect(() => {
    const fetchBundles = async () => {
      const data = await getBundles()
      setBundleList(data)
    }
    fetchBundles()
  }, [])

  const handleSaveBundle = async (data: BundleFormData) => {
    if (selectedBundle) {
      const updatedBundle = {
        ...selectedBundle,
        ...data,
        budget: parseFloat(data.budget) || 0,
        items: data.products.length,
      }
      // 将 budget 转换为字符串以匹配 BundleFormData 接口
      await updateBundle({
        ...updatedBundle,
        budget: updatedBundle.budget.toString(),
      })
    } else {
      const newBundle = {
        id: Date.now(),
        name: data.name,
        items: data.products.length,
        assigned: false,
        budget: parseFloat(data.budget) || 0,
        category: data.category as 'Drivers' | 'Office' | 'Special Bundles',
        description: data.description,
        products: data.products,
        isActive: data.isActive,
      }
      // 将 budget 转换为字符串以匹配 BundleFormData 接口
      await addBundle({
        ...newBundle,
        budget: newBundle.budget.toString(),
      })
    }
    const bundles = await getBundles()
    setBundleList(bundles)
    setSelectedBundle(null)
    setIsFormOpen(false)
  }

  const getCategoryColor = (category?: string) => {
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

  const handleEdit = (bundle: Bundle) => {
    setSelectedBundle(bundle)
    setIsViewOpen(false) // Close view dialog if open
    setIsFormOpen(true)
  }

  const handleView = (bundle: Bundle) => {
    setSelectedBundle(bundle)
    setIsFormOpen(false) // Close form dialog if open
    setIsViewOpen(true)
  }

  const handleCreateNew = () => {
    setSelectedBundle(null)
    setIsViewOpen(false)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setSelectedBundle(null)
  }

  const handleCloseView = () => {
    setIsViewOpen(false)
    setSelectedBundle(null)
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold'>Bundle Management</h2>
        <Button onClick={handleCreateNew}>
          <Plus className='h-4 w-4 mr-2' />
          Create Bundle
        </Button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {bundleList.map((bundle) => (
          <Card
            key={bundle.id}
            className={`transition-all hover:shadow-md ${
              bundle.assigned ? 'border-green-200 bg-green-50' : ''
            }`}
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
                  <span className='font-medium'>
                    ${bundle.budget.toFixed(2)}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>Status</span>
                  <Badge variant={bundle.isActive ? 'default' : 'secondary'}>
                    {bundle.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <div className='flex items-center space-x-2 pt-2'>
                  <Button
                    size='sm'
                    variant='outline'
                    className='flex-1'
                    onClick={() => handleView(bundle)}
                  >
                    <Eye className='h-4 w-4 mr-1' />
                    View
                  </Button>
                  <Button
                    size='sm'
                    variant='outline'
                    className='flex-1'
                    onClick={() => handleEdit(bundle)}
                  >
                    <Edit className='h-4 w-4 mr-1' />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Form Dialog */}
      <BundleForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSave={handleSaveBundle}
        bundle={selectedBundle}
      />

      {/* View Dialog */}
      <ViewBundleDialog
        bundle={isViewOpen ? selectedBundle : null}
        onClose={handleCloseView}
        onEdit={handleEdit}
      />
    </div>
  )
}

export default Bundles
