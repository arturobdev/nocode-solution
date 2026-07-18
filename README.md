# StayFinder

A rental apartment booking platform built with React 19, TypeScript, and Vite.

## Tech Stack

- **Framework:** React 19 + TypeScript 6
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS 4
- **Routing:** React Router DOM 7
- **State Management:** Zustand 5 (with sessionStorage persistence)
- **Forms:** React Hook Form + Zod validation
- **UI Components:** Radix UI (shadcn/ui pattern)
- **Internationalization:** i18next + react-i18next (EN, ES, PT)
- **Date Handling:** date-fns
- **Charts:** Recharts (admin dashboard)
- **Maps:** Leaflet + react-leaflet
- **Icons:** Lucide React
- **SEO:** react-helmet-async

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
| `npm run test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with V8 coverage report |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting without writing |

## Testing

Tests are written with Vitest + React Testing Library + jsdom.

```bash
npm run test            # single run
npm run test:watch      # watch mode
npm run test:coverage   # coverage report (text + HTML)
```

Coverage excludes `node_modules/`, `src/test/`, `*.d.ts`, and `src/main.tsx`.

### Test files

| File | Tests | Scope |
|------|-------|-------|
| `src/lib/utils.test.ts` | 28 | `calculateNights`, `calculateBookingPrice`, `formatPrice`, `generateBookingNumber`, `slugify`, `getInitials` |
| `src/lib/availabilityUtils.test.ts` | 10 | `generateOccupiedDates`, `isDateRangeOverlappingOccupied` |
| `src/store/useStore.test.ts` | 13 | Bookings CRUD, admin auth, search params/filters, persistence |
| `src/components/auth/ProtectedRoute.test.tsx` | 2 | Redirect when unauthenticated, render when authenticated |
| `src/pages/AdminLoginPage.test.tsx` | 4 | Login success/failure, credential validation |

## Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | HomePage | Hero section, featured destinations, popular apartments, benefits, testimonials |
| `/search` | SearchResultsPage | Filterable and sortable apartment listing with sidebar filters |
| `/apartment/:id` | ApartmentDetailsPage | Apartment detail view with image gallery, booking sidebar, amenities, and reviews |
| `/booking-confirmation` | BookingConfirmationPage | Post-booking confirmation screen |
| `/admin/login` | AdminLoginPage | Admin login with email/password (credentials: `admin@mail.com` / `Pa55word`) |
| `/admin` | AdminDashboardPage | Protected admin dashboard with stats, revenue chart, and bookings table |
| `*` | NotFoundPage | 404 page for unmatched routes |

## Project Structure

```
src/
├── main.tsx                 # Application entry point
├── App.tsx                  # Router configuration with lazy-loaded routes
├── assets/                  # Static assets (hero image, logo)
├── components/
│   ├── admin/               # Admin dashboard components
│   ├── apartment/           # Apartment detail page components
│   ├── auth/                # Auth components (ProtectedRoute)
│   ├── home/                # Homepage section components
│   ├── layout/              # Layout, Navbar, Footer, ScrollToTop
│   ├── search/              # Search page components (ApartmentCard, filters)
│   ├── seo/                 # SEO component (react-helmet-async)
│   ├── skeletons/           # Loading skeleton components
│   └── ui/                  # Reusable UI primitives (shadcn/ui)
├── data/                    # Mock data (apartments, destinations, bookings, reviews)
├── hooks/                   # Custom hooks (useSearchResults, useMediaQuery)
├── i18n/                    # i18next configuration and locale files (en, es, pt)
├── lib/                     # Utility functions (cn, formatPrice, availabilityUtils, etc.)
├── pages/                   # Page-level components
├── store/                   # Zustand store (with persist middleware)
├── test/                    # Test setup (jest-dom matchers)
└── types/                   # TypeScript type definitions
```

## Features

- **Apartment browsing** with search, filters (price, guests, rating, type), and sorting
- **Apartment details** with image gallery, availability calendar (Airbnb-style date picker), booking sidebar, reviews, amenities, host info, location map, and cancellation policy
- **Booking flow** with guest information form, price breakdown, and confirmation page
- **Admin dashboard** with stats cards, revenue chart, searchable bookings table with pagination, and status filters
- **Protected admin routes** with login/logout and sessionStorage persistence
- **Internationalization** across 3 languages (English, Spanish, Portuguese)
- **Responsive design** with mobile accordion availability, mobile booking bar with smooth-scroll, and adaptive date picker (Popover on desktop, Dialog on mobile)
- **SEO** with per-page meta titles and descriptions

## Data

The app uses mock data with 12 apartments across 6 cities, 18 reviews, 22 bookings, and 6 destinations. All apartment images are sourced from Unsplash.

## Git Hooks

Pre-commit hooks are managed by **Husky** + **lint-staged**:

- Staged `*.{ts,tsx}` files are linted with ESLint (`--max-warnings=0`)
- `package.json` changes trigger `npm install` automatically

## CI

GitHub Actions CI runs on push/PR to `main` (`.github/workflows/ci.yml`):

1. Install dependencies (`npm ci`)
2. Lint (`npm run lint`)
4. Format check (`npm run format:check`)
5. Tests (`npm run test`)
6. Type-check and build (`npm run build`)

## Deployment

This project is configured for Vercel deployment with `vercel.json`.

### Vercel (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the project on [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Vite and configures the build
4. Deploy

The `vercel.json` includes:
- **SPA rewrite**: Routes like `/search` or `/apartment/1` serve `index.html` for client-side routing
- **Asset caching**: Vite-hashed files in `/assets` get immutable caching headers
- **Security headers**: `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`

### Vercel CLI

```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```
