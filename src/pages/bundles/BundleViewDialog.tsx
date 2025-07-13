import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Package, X, Edit, CheckCircle } from 'lucide-react'
import type { Bundle } from '@/types'
import { getCategoryColor, calculateTotalCost, calculateBudgetRemaining, isBudgetExceeded } from './bundleUtils'

interface BundleViewDialogProps {
  bundle: Bundle | null
  onClose: () => void
  onEdit: (bundle: Bundle) => void
}

export const BundleViewDialog: React.FC<BundleViewDialogProps> = ({
  bundle,
  onClose,
  onEdit,
}) => {
  if (!bundle) return null

  const totalCost = calculateTotalCost(bundle.products || [])
  const budgetRemaining = calculateBudgetRemaining(bundle.budget, totalCost)
  const isBudgetOver = isBudgetExceeded(bundle.budget, totalCost)

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
                <Badge className={getCategoryColor(bundle.category)}>
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
                    isBudgetOver ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  ${budgetRemaining.toFixed(2)}
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
