import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, Plus, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'

type SizeKey =
  | 'XS'
  | 'S'
  | 'M'
  | 'L'
  | 'XL'
  | '2XL'
  | '3XL' // Standard sizes
  | `A${number}` // Pattern for A-sizes (A7, A11, etc.)

type Sizes = Partial<Record<SizeKey, number>>

interface ProductsProps {
  products: Array<{
    id: number
    name: string
    code: string
    price: number
    stock: number
    sizes: Sizes
    image?: string // Added image property
  }>
}

const Products: React.FC<ProductsProps> = ({ products: initialProducts }) => {
  const [products, setProducts] = useState(initialProducts)
  const { addItem } = useCart()

  const getSizeStockColor = (stock: number) => {
    if (stock === 0) return 'bg-red-200 border-red-300'
    if (stock <= 10) return 'bg-orange-200 border-orange-300'
    if (stock <= 25) return 'bg-yellow-200 border-yellow-300'
    return 'bg-green-200 border-green-300'
  }

  const handleStockChange = (
    productId: number,
    size: string,
    newStock: string
  ) => {
    const stockValue = parseInt(newStock) || 0
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? {
              ...product,
              sizes: {
                ...product.sizes,
                [size]: stockValue,
              },
              stock: Object.values({
                ...product.sizes,
                [size]: stockValue,
              }).reduce((sum, val) => sum + (val || 0), 0),
            }
          : product
      )
    )
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold'>Products</h2>
        <Button>
          <Plus className='h-4 w-4 mr-2' />
          Add Product
        </Button>
      </div>

      <div className='flex items-center space-x-4'>
        <div className='flex-1'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
            <Input placeholder='Search products...' className='pl-10' />
          </div>
        </div>
        <Button variant='outline'>
          <Filter className='h-4 w-4 mr-2' />
          Filter
        </Button>
      </div>

      <Card>
        <CardContent className='p-0'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='border-b bg-gray-50'>
                <tr>
                  <th className='text-left p-4 font-medium'>Image</th>
                  <th className='text-left p-4 font-medium'>Product Name</th>
                  <th className='text-left p-4 font-medium'>Code</th>
                  <th className='text-left p-4 font-medium'>Price</th>
                  <th className='text-left p-4 font-medium'>
                    Size Availability
                  </th>
                  <th className='text-left p-4 font-medium'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className='border-b hover:bg-muted/50'>
                    <td className='p-4'>
                      <div className='w-[100px] h-[100px] rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center'>
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className='w-full h-full object-cover'
                            onError={(e) => {
                              // Fallback if image fails to load
                              const target = e.target as HTMLImageElement
                              target.style.display = 'none'
                              target.parentElement!.innerHTML =
                                '<div class="text-gray-400 text-xs text-center">No Image</div>'
                            }}
                          />
                        ) : (
                          <div className='text-gray-400 text-xs text-center'>
                            No Image
                          </div>
                        )}
                      </div>
                    </td>
                    <td className='p-4'>
                      <div className='font-medium text-lg'>{product.name}</div>
                      <div className='text-sm text-muted-foreground'>
                        Total Stock: {product.stock}
                      </div>
                    </td>
                    <td className='p-4'>
                      <Badge variant='outline' className='font-mono'>
                        {product.code}
                      </Badge>
                    </td>
                    <td className='p-4'>
                      <div className='text-xl font-bold'>${product.price}</div>
                    </td>
                    <td className='p-4'>
                      <div className='space-y-3'>
                        {/* Size Grid */}
                        <div
                          className={`grid gap-1 ${
                            Object.keys(product.sizes).length <= 5
                              ? 'grid-cols-5'
                              : 'grid-cols-7'
                          }`}
                        >
                          {Object.entries(product.sizes).map(
                            ([size, stock]) => (
                              <div
                                key={size}
                                className='flex flex-col items-center'
                              >
                                <div className='text-xs font-medium text-muted-foreground mb-1 h-3 flex items-center'>
                                  {size}
                                </div>
                                <Input
                                  type='number'
                                  min='0'
                                  value={stock || 0}
                                  onChange={(e) =>
                                    handleStockChange(
                                      product.id,
                                      size,
                                      e.target.value
                                    )
                                  }
                                  className={`
                                    w-12 h-8 text-xs font-semibold text-center p-1 border-2
                                    transition-all duration-200
                                    ${getSizeStockColor(stock ?? 0)}
                                    ${
                                      stock === 0
                                        ? 'opacity-50'
                                        : 'hover:opacity-80'
                                    }
                                  `}
                                  title={`Size ${size}: ${stock} in stock`}
                                />
                              </div>
                            )
                          )}
                        </div>

                        {/* Compact Legend */}
                        <div className='flex items-center space-x-3 text-xs pt-2'>
                          <div className='flex items-center space-x-1'>
                            <div className='w-2 h-2 bg-green-200 border border-green-300 rounded'></div>
                            <span className='text-muted-foreground'>25+</span>
                          </div>
                          <div className='flex items-center space-x-1'>
                            <div className='w-2 h-2 bg-yellow-200 border border-yellow-300 rounded'></div>
                            <span className='text-muted-foreground'>11-25</span>
                          </div>
                          <div className='flex items-center space-x-1'>
                            <div className='w-2 h-2 bg-orange-200 border border-orange-300 rounded'></div>
                            <span className='text-muted-foreground'>1-10</span>
                          </div>
                          <div className='flex items-center space-x-1'>
                            <div className='w-2 h-2 bg-red-200 border border-red-300 rounded'></div>
                            <span className='text-muted-foreground'>0</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='p-4'>
                      <div className='flex items-center space-x-2'>
                        <Button
                          size='sm'
                          onClick={() =>
                            addItem({
                              id: product.id.toString(),
                              name: product.name,
                              price: product.price,
                              image: product.image,
                            })
                          }
                        >
                          <ShoppingCart className='h-4 w-4 mr-1' />
                          Add to Cart
                        </Button>
                        {/* <Button size='sm' variant='outline'>
                          <Eye className='h-4 w-4' />
                        </Button> */}
                        {/* <Button size='sm' variant='outline'>
                          <Edit className='h-4 w-4' />
                        </Button> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Products
