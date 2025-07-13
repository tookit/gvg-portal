import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Package, AlertCircle, Loader2 } from 'lucide-react'
import type { Bundle, BundleFormData } from '@/types'
import {
  BundleForm,
  BundleViewDialog,
  BundleCard,
  useBundles,
} from './bundles/index'

const Bundles: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedBundle, setSelectedBundle] = useState<Bundle | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)

  const {
    bundles,
    loading,
    error,
    isSaving,
    createBundle,
    updateBundle,
    refreshBundles,
  } = useBundles()

  const handleSaveBundle = async (data: BundleFormData) => {
    try {
      if (selectedBundle) {
        await updateBundle(selectedBundle.id, data)
      } else {
        await createBundle(data)
      }
      setSelectedBundle(null)
      setIsFormOpen(false)
    } catch (error) {
      console.error('Failed to save bundle:', error)
    }
  }

  const handleEdit = (bundle: Bundle) => {
    setSelectedBundle(bundle)
    setIsViewOpen(false)
    setIsFormOpen(true)
  }

  const handleView = (bundle: Bundle) => {
    setSelectedBundle(bundle)
    setIsFormOpen(false)
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

  if (loading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <Loader2 className='h-8 w-8 animate-spin' />
        <span className='ml-2'>Loading bundles...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex items-center justify-center h-64 text-red-600'>
        <AlertCircle className='h-8 w-8 mr-2' />
        <span>Error loading bundles: {error}</span>
        <Button onClick={refreshBundles} className='ml-4'>
          Retry
        </Button>
      </div>
    )
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

      {bundles.length === 0 ? (
        <div className='text-center py-12'>
          <Package className='h-16 w-16 mx-auto mb-4 text-gray-400' />
          <h3 className='text-lg font-medium text-gray-900 mb-2'>
            No bundles found
          </h3>
          <p className='text-gray-500 mb-4'>
            Create your first bundle to get started.
          </p>
          <Button onClick={handleCreateNew}>
            <Plus className='h-4 w-4 mr-2' />
            Create Bundle
          </Button>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {bundles.map((bundle) => (
            <BundleCard
              key={bundle.id}
              bundle={bundle}
              onView={handleView}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}

      {/* Form Dialog */}
      <BundleForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSave={handleSaveBundle}
        bundle={selectedBundle}
        isSaving={isSaving}
      />

      {/* View Dialog */}
      <BundleViewDialog
        bundle={isViewOpen ? selectedBundle : null}
        onClose={handleCloseView}
        onEdit={handleEdit}
      />
    </div>
  )
}

export default Bundles
