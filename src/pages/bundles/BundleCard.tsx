import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Eye, Edit, CheckCircle } from 'lucide-react'
import type { Bundle } from '@/types'
import { getCategoryColor } from './bundleUtils'

interface BundleCardProps {
  bundle: Bundle
  onView: (bundle: Bundle) => void
  onEdit: (bundle: Bundle) => void
}

export const BundleCard: React.FC<BundleCardProps> = ({
  bundle,
  onView,
  onEdit,
}) => {
  return (
    <Card
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
            <span className='font-medium'>${bundle.budget.toFixed(2)}</span>
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
              onClick={() => onView(bundle)}
            >
              <Eye className='h-4 w-4 mr-1' />
              View
            </Button>
            <Button
              size='sm'
              variant='outline'
              className='flex-1'
              onClick={() => onEdit(bundle)}
            >
              <Edit className='h-4 w-4 mr-1' />
              Edit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
