import { useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Combobox } from '@/components/ui/combobox'
import { Checkbox } from '@/components/ui/checkbox'
import { Plus, X, Save, Loader2 } from 'lucide-react'
import type { Bundle } from '@/types'
import {
  BUNDLE_CATEGORIES,
  getInitialFormData,
  calculateTotalCost,
  calculateBudgetRemaining,
  isBudgetExceeded,
} from './bundleUtils'

// Zod schema for form validation
const productSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Product name is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  price: z.number().min(0, 'Price must be non-negative'),
})

const BundleFormSchema = z.object({
  name: z.string().min(1, 'Bundle name is required'),
  description: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  budget: z.number().min(0, 'Budget must be non-negative'),
  isActive: z.boolean(),
  products: z.array(productSchema),
})

type BundleFormValues = z.infer<typeof BundleFormSchema>

interface BundleFormProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: BundleFormValues) => void
  bundle?: Bundle | null
  isSaving?: boolean
}

interface ProductFormData {
  name: string
  quantity: number
  price: number
}

export const BundleForm: React.FC<BundleFormProps> = ({
  isOpen,
  onClose,
  onSave,
  bundle,
  isSaving = false,
}) => {
  const [newProduct, setNewProduct] = useState<ProductFormData>({
    name: '',
    quantity: 1,
    price: 0,
  })

  const form = useForm<BundleFormValues>({
    resolver: zodResolver(BundleFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      category: undefined,
      budget: 0,
      isActive: true,
      products: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'products',
  })

  useEffect(() => {
    const initialData = getInitialFormData(bundle)
    if (bundle) {
      form.reset({
        name: initialData.name,
        description: initialData.description,
        category: initialData.category,
        budget: initialData.budget,
        isActive: initialData.isActive,
        products: initialData.products,
      })
      console.log(form, bundle)
    }
  }, [form, bundle])

  const handleAddProduct = () => {
    if (newProduct.name) {
      append({
        id: Date.now().toString(),
        ...newProduct,
      })
      setNewProduct({ name: '', quantity: 1, price: 0 })
    }
  }

  const handleRemoveProduct = (index: number) => {
    remove(index)
  }

  const handleSubmit = (data: BundleFormValues) => {
    const formData = {
      ...data,
    }
    onSave(formData)
    onClose()
  }

  const watchedProducts = form.watch('products')
  const watchedBudget = form.watch('budget')
  const totalProductCost = calculateTotalCost(watchedProducts)
  const budgetRemaining = calculateBudgetRemaining(
    watchedBudget,
    totalProductCost
  )
  const isBudgetOver = isBudgetExceeded(watchedBudget, totalProductCost)

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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-6'
          >
            {/* Basic Information */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bundle Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter bundle name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='category'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Combobox
                        options={BUNDLE_CATEGORIES.map((category) => ({
                          value: category.value,
                          label: category.value,
                        }))}
                        value={field.value || ''}
                        onValueChange={field.onChange}
                        placeholder='Select category...'
                        searchPlaceholder='Search categories...'
                        emptyText='No category found.'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Describe the bundle purpose and contents'
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='budget'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget Limit ($)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='0.00'
                        min='0'
                        step='0.01'
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='isActive'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-start space-x-3 space-y-0 pt-6'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel>Active Bundle</FormLabel>
                      <FormDescription>
                        Enable this bundle for customer selection
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
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
              {fields.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className='text-base'>Bundle Contents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-2'>
                      {fields.map((field, index) => (
                        <div
                          key={field.id}
                          className='flex items-center justify-between p-3 border rounded-lg'
                        >
                          <div className='flex-1'>
                            <div className='font-medium'>{field.name}</div>
                            <div className='text-sm text-muted-foreground'>
                              Qty: {field.quantity} × ${field.price.toFixed(2)}{' '}
                              = ${(field.quantity * field.price).toFixed(2)}
                            </div>
                          </div>
                          <Button
                            type='button'
                            variant='ghost'
                            size='sm'
                            onClick={() => handleRemoveProduct(index)}
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
                        {watchedBudget && watchedBudget > 0 && (
                          <div className='flex justify-between items-center text-sm text-muted-foreground'>
                            <span>Budget Remaining:</span>
                            <span
                              className={
                                isBudgetOver ? 'text-red-600' : 'text-green-600'
                              }
                            >
                              ${budgetRemaining.toFixed(2)}
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
                disabled={!form.formState.isValid || isSaving}
              >
                {isSaving ? (
                  <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                ) : (
                  <Save className='h-4 w-4 mr-2' />
                )}
                {bundle ? 'Save Changes' : 'Create Bundle'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
