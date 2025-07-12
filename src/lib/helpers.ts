export const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'approved':
      return 'bg-green-100 text-green-800'
    case 'rejected':
      return 'bg-red-100 text-red-800'
    case 'shipped':
      return 'bg-blue-100 text-blue-800'
    case 'delivered':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'Active':
      return 'outline'
    case 'Inactive':
      return 'secondary'
    default:
      return 'default'
  }
}

export const getCategoryColor = (category?: string) => {
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