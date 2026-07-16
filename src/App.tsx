import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'

const HomePage = lazy(() => import('@/pages/HomePage'))
const SearchResultsPage = lazy(() => import('@/pages/SearchResultsPage'))
const ApartmentDetailsPage = lazy(() => import('@/pages/ApartmentDetailsPage'))
const BookingConfirmationPage = lazy(() => import('@/pages/BookingConfirmationPage'))
const AdminDashboardPage = lazy(() => import('@/pages/AdminDashboardPage'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/apartment/:id" element={<ApartmentDetailsPage />} />
            <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
