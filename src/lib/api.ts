import { dbPromise } from './db'
import type { User, Bundle } from '@/types'

export const getUsers = async () => {
  const db = await dbPromise
  return db.getAll('users')
}

export const getUser = async (id: number) => {
  const db = await dbPromise
  return db.get('users', id)
}

export const addUser = async (user: Omit<User, 'id'>) => {
  const db = await dbPromise
  return db.add('users', user)
}

export const updateUser = async (user: User) => {
  const db = await dbPromise
  return db.put('users', user)
}

export const deleteUser = async (id: number) => {
  const db = await dbPromise
  return db.delete('users', id)
}

export const getProducts = async () => {
  const db = await dbPromise
  return db.getAll('products')
}

export const getOrders = async () => {
  const db = await dbPromise
  return db.getAll('orders')
}

export const getBundles = async () => {
  const db = await dbPromise
  return db.getAll('bundles')
}

export const addBundle = async (bundle: Omit<Bundle, 'id'>) => {
  const db = await dbPromise
  return db.add('bundles', bundle as Bundle)
}

export const updateBundle = async (bundle: Bundle) => {
  const db = await dbPromise
  return db.put('bundles', bundle)
}
