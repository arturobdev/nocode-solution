import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import HomePage from '@/pages/HomePage'
import SearchResultsPage from '@/pages/SearchResultsPage'
import ApartmentDetailsPage from '@/pages/ApartmentDetailsPage'
import BookingConfirmationPage from '@/pages/BookingConfirmationPage'
import AdminDashboardPage from '@/pages/AdminDashboardPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/apartment/:id" element={<ApartmentDetailsPage />} />
          <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
