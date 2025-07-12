import { openDB } from 'idb'
import type { DBSchema } from 'idb'
import { users, products, orders, bundles } from './data'

interface MyDB extends DBSchema {
  users: {
    key: number
    value: (typeof users)[0]
    indexes: { role: string }
  }
  products: {
    key: number
    value: (typeof products)[0]
  }
  orders: {
    key: string
    value: (typeof orders)[0]
  }
  bundles: {
    key: number
    value: (typeof bundles)[0]
  }
}

export const dbPromise = openDB<MyDB>('my-db', 3, {
  upgrade(db, oldVersion) {
    if (oldVersion < 1) {
      const usersStore = db.createObjectStore('users', {
        keyPath: 'id',
        autoIncrement: true,
      })
      usersStore.createIndex('role', 'role')
      users.forEach((user) => usersStore.add(user))
    }
    if (oldVersion < 2) {
      if (!db.objectStoreNames.contains('products')) {
        const productsStore = db.createObjectStore('products', {
          keyPath: 'id',
          autoIncrement: true,
        })
        products.forEach((product) => productsStore.add(product))
      }
      if (!db.objectStoreNames.contains('orders')) {
        const ordersStore = db.createObjectStore('orders', { keyPath: 'id' })
        orders.forEach((order) => ordersStore.add(order))
      }
      if (!db.objectStoreNames.contains('bundles')) {
        const bundlesStore = db.createObjectStore('bundles', {
          keyPath: 'id',
          autoIncrement: true,
        })
        bundles.forEach((bundle) => bundlesStore.add(bundle))
      }
    }
    if (oldVersion < 3) {
      // Future migrations
    }
  },
})
