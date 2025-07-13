import { useState, useEffect } from 'react'
import type { Bundle, BundleFormData } from '@/types'
import { getBundles, addBundle, updateBundle } from '@/lib/api'

export const useBundles = () => {
  const [bundles, setBundles] = useState<Bundle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const fetchBundles = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getBundles()
      setBundles(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch bundles')
    } finally {
      setLoading(false)
    }
  }

  const createBundle = async (bundleData: BundleFormData) => {
    try {
      setIsSaving(true)
      setError(null)
      const newBundle = {
        id: Date.now(),
        name: bundleData.name,
        items: bundleData.products.length,
        assigned: false,
        budget: bundleData.budget || 0,
        category: bundleData.category as 'Drivers' | 'Office' | 'Special Bundles',
        description: bundleData.description,
        products: bundleData.products,
        isActive: bundleData.isActive,
      }
      await addBundle(newBundle)
      await fetchBundles()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create bundle')
      throw err
    } finally {
      setIsSaving(false)
    }
  }

  const updateBundleById = async (bundleId: number, bundleData: BundleFormData) => {
    try {
      setIsSaving(true)
      setError(null)
      const updatedBundle = {
        id: bundleId,
        name: bundleData.name,
        items: bundleData.products.length,
        assigned: false,
        budget: bundleData.budget || 0,
        category: bundleData.category as 'Drivers' | 'Office' | 'Special Bundles',
        description: bundleData.description,
        products: bundleData.products,
        isActive: bundleData.isActive,
      }
      await updateBundle(updatedBundle)
      await fetchBundles()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update bundle')
      throw err
    } finally {
      setIsSaving(false)
    }
  }

  useEffect(() => {
    fetchBundles()
  }, [])

  return {
    bundles,
    loading,
    error,
    isSaving,
    createBundle,
    updateBundle: updateBundleById,
    refreshBundles: fetchBundles,
  }
}
