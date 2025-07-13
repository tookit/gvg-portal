# Bundle Management API Integration

## Overview

The Bundle Management feature has been updated to integrate with a REST API while maintaining IndexedDB as a fallback mechanism. This ensures the application works both online and offline.

## Environment Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Configure your API base URL in `.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:3001/api
   ```

## API Endpoints

The application expects the following REST API endpoints:

### Bundles

- **GET** `/api/bundles` - Fetch all bundles
- **POST** `/api/bundles` - Create a new bundle
- **PUT** `/api/bundles/:id` - Update an existing bundle
- **DELETE** `/api/bundles/:id` - Delete a bundle

### Request/Response Format

#### Bundle Object
```typescript
interface Bundle {
  id: number
  name: string
  items: number
  assigned: boolean
  budget: number
  category: 'Drivers' | 'Office' | 'Special Bundles'
  description?: string
  products?: Product[]
  isActive: boolean
}

interface Product {
  id: string
  name: string
  quantity: number
  price: number
}
```

#### API Responses

**GET /api/bundles**
```json
[
  {
    "id": 1,
    "name": "Driver Starter Kit",
    "items": 3,
    "assigned": false,
    "budget": 150.00,
    "category": "Drivers",
    "description": "Essential items for new drivers",
    "products": [
      {
        "id": "1",
        "name": "Safety Vest",
        "quantity": 1,
        "price": 25.00
      }
    ],
    "isActive": true
  }
]
```

**POST /api/bundles**
```json
{
  "name": "New Bundle",
  "items": 2,
  "assigned": false,
  "budget": 100.00,
  "category": "Office",
  "description": "Office supplies bundle",
  "products": [],
  "isActive": true
}
```

## Features

### Error Handling
- API failures automatically fall back to IndexedDB
- User-friendly error messages
- Retry functionality for failed requests

### Loading States
- Loading indicators during API calls
- Disabled buttons during save operations
- Skeleton loading for better UX

### Offline Support
- IndexedDB fallback when API is unavailable
- Seamless transition between online/offline modes

## Configuration

API configuration is centralized in `src/lib/config.ts`:

```typescript
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000,
  endpoints: {
    bundles: '/bundles',
    users: '/users',
    products: '/products',
    orders: '/orders'
  }
}
```

## Development

### Running with Mock API

For development, you can use a mock API server:

1. Install json-server:
   ```bash
   npm install -g json-server
   ```

2. Create a `db.json` file:
   ```json
   {
     "bundles": [
       {
         "id": 1,
         "name": "Sample Bundle",
         "items": 2,
         "assigned": false,
         "budget": 100.00,
         "category": "Office",
         "description": "Sample bundle for testing",
         "products": [],
         "isActive": true
       }
     ]
   }
   ```

3. Start the mock server:
   ```bash
   json-server --watch db.json --port 3001
   ```

### Testing API Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the Bundle Management page
3. Test CRUD operations:
   - Create new bundles
   - Edit existing bundles
   - View bundle details
   - Delete bundles

## Production

For production deployment:

1. Set the correct API base URL in your environment:
   ```env
   VITE_API_BASE_URL=https://your-api-domain.com/api
   ```

2. Ensure your API server supports CORS for your frontend domain

3. Implement proper authentication if required

## Error Handling

The application handles various error scenarios:

- **Network errors**: Falls back to IndexedDB
- **Timeout errors**: Shows retry option
- **HTTP errors**: Displays appropriate error messages
- **Validation errors**: Prevents invalid submissions

## Security Considerations

- API requests include proper Content-Type headers
- Timeout protection prevents hanging requests
- Input validation on both client and server side
- HTTPS recommended for production

## Future Enhancements

- Authentication integration
- Real-time updates via WebSockets
- Optimistic updates for better UX
- Caching strategies for improved performance