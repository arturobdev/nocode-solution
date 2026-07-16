# StayFinder

A rental apartment booking platform built with React 19, TypeScript, and Vite.

## Tech Stack

- **Framework:** React 19 + TypeScript 6
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS 4
- **Routing:** React Router DOM 7
- **State Management:** Zustand 5
- **Forms:** React Hook Form + Zod validation
- **UI Components:** Radix UI (shadcn/ui pattern)
- **Charts:** Recharts (admin dashboard)
- **Icons:** Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting without writing |

## Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | HomePage | Hero section, featured destinations, popular apartments, benefits, testimonials |
| `/search` | SearchResultsPage | Filterable and sortable apartment listing with sidebar filters |
| `/apartment/:id` | ApartmentDetailsPage | Apartment detail view with image gallery, booking sidebar, amenities, and reviews |
| `/booking-confirmation` | BookingConfirmationPage | Post-booking confirmation screen |
| `/admin` | AdminDashboardPage | Admin dashboard with stats, revenue chart, and bookings table |

## Project Structure

```
src/
├── main.tsx                 # Application entry point
├── App.tsx                  # Router configuration
├── assets/                  # Static assets (hero image, logo)
├── components/
│   ├── admin/               # Admin dashboard components
│   ├── apartment/           # Apartment detail page components
│   ├── home/                # Homepage section components
│   ├── layout/              # Layout, Navbar, Footer, ScrollToTop
│   ├── search/              # Search page components (ApartmentCard, filters)
│   └── ui/                  # Reusable UI primitives (shadcn/ui)
├── data/                    # Mock data (apartments, destinations, bookings, reviews)
├── hooks/                   # Custom hooks (useSearchResults)
├── lib/                     # Utility functions (cn, formatPrice, etc.)
├── pages/                   # Page-level components
├── store/                   # Zustand store
└── types/                   # TypeScript type definitions
```

## Data

The app uses mock data with 12 apartments across 6 cities, 18 reviews, 22 bookings, and 6 destinations. All apartment images are sourced from Unsplash.
