# Frontend - SMS Admin Panel

A modern React-based admin panel for managing SMS plans and viewing analytics.

## Features

### Plan Management
- **Add Plans**: Create new SMS plans with name, price, data quota, validity, and description
- **Edit Plans**: Modify existing plans through a modal interface
- **Delete Plans**: Remove plans with confirmation
- **View Plans**: Display all plans in a responsive table format

### Analytics Dashboard
- **Statistics Cards**: Overview of total plans, average price, revenue, and most popular plan
- **Revenue Trend Chart**: Line chart showing revenue over the last 6 months
- **Plan Distribution**: Pie chart showing subscriber distribution across plans
- **Price Range Analysis**: Bar chart showing distribution of plans by price range
- **Plan Performance**: Detailed view of each plan's performance metrics

## Technology Stack

- **React 19** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Data visualization library
- **Vite** - Fast build tool and dev server

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── ChartCard.jsx      # Reusable chart component
│   ├── EditPlanModal.jsx  # Modal for editing plans
│   ├── PlanForm.jsx       # Form for adding new plans
│   ├── PlanTable.jsx      # Table for displaying plans
│   └── StatCard.jsx       # Statistics card component
├── pages/
│   └── admin/
│       ├── Analysis.jsx   # Analytics dashboard
│       └── Plan.jsx       # Plan management page
├── App.jsx                # Main app component with routing
└── main.jsx               # App entry point
```

## Features in Detail

### Plan Management
- Form validation for required fields
- Responsive design that works on mobile and desktop
- Local storage persistence (data survives page reloads)
- Confirmation dialogs for destructive actions

### Analytics
- Mock data generation for demonstration
- Interactive charts with tooltips
- Responsive grid layout
- Color-coded statistics with trend indicators

## Styling

The application uses Tailwind CSS for styling with:
- Responsive grid layouts
- Modern card-based design
- Consistent color scheme
- Hover and focus states
- Mobile-first responsive design

## Data Persistence

Plans are stored in browser localStorage with the key `sms_admin_plans_v1`. This allows the application to persist data across browser sessions without requiring a backend.

## Future Enhancements

- Backend integration for real data
- User authentication and authorization
- Real-time updates
- Export functionality for reports
- Advanced filtering and search
- Bulk operations for plans