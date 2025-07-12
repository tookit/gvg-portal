# Project description

This system is for my whosalers to place their order, it include product management/bundle management/order management/user management/dashbord/reporting.

# System requirements

This system is developed using React, Typescript, Tailwindcss, shadcn-ui, react-hook-form, zod, react-query, date-fns, react-chartjs-2, clsx.

# User Management

## User Accounts & Access Management
### Customers Staff Member Features:

1.Staff members will be able to log in and place orders within their allocated budget and renewal dates.

2.Default sizes for bundles will be saved and auto-applied during the ordering process.

3.View past orders, including shipping data, order details, and the ability to download invoices.

### Parent Company Account Features:

1.View all orders across the organization, including total spend, allocated budgets, and renewal dates.

2.Assign, update, and delete subaccounts for staff members.

3.Access detailed reports for individual sites and overall spending.

4.View past orders with shipping data and download invoices.

## Bundle Management
### Bundle Creation & Management:
- Parent accounts will be able to create, delete, and update product bundles (e.g., Drivers, Office, Special Bundles).
- Staff members will be assigned default bundles during subaccount creation, restricting their visibility and ordering capabilities to only relevant bundles.
- Support for multiple bundles with different names and improved UI for bundle management.


## Size Management
### Size Storage & Auto-Application:

- Staff members will have saved sizes stored in their profiles, which will automatically apply when ordering bundles.

### Size Chart Integration:

-Add a size chart (PDF, expandable section, or modal) styled to match the portal UI.
The size chart will be placed at the bottom of the product list or on the product detail page for easy access.