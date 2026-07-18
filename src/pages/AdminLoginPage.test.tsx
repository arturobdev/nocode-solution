import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import '@/i18n'
import AdminLoginPage from './AdminLoginPage'
import { useStore } from '@/store/useStore'

function renderLoginPage() {
  return render(
    <MemoryRouter initialEntries={['/admin/login']}>
      <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<div>Admin Dashboard</div>} />
      </Routes>
    </MemoryRouter>
  )
}

describe('AdminLoginPage', () => {
  beforeEach(() => {
    useStore.setState({ isAdminAuthenticated: false })
  })

  it('logs in and redirects to /admin with the correct credentials', async () => {
    const user = userEvent.setup()
    renderLoginPage()
    await user.type(screen.getByLabelText(/email/i), 'admin@mail.com')
    await user.type(screen.getByLabelText(/^password/i), 'Pa55word')
    await user.click(screen.getByRole('button', { name: /log in|sign in|login/i }))
    await waitFor(() => {
      expect(screen.getByText('Admin Dashboard')).toBeInTheDocument()
    })
    expect(useStore.getState().isAdminAuthenticated).toBe(true)
  })

  it('shows an error and does not authenticate with the wrong password', async () => {
    const user = userEvent.setup()
    renderLoginPage()
    await user.type(screen.getByLabelText(/email/i), 'admin@mail.com')
    await user.type(screen.getByLabelText(/^password/i), 'wrongpassword')
    await user.click(screen.getByRole('button', { name: /log in|sign in|login/i }))
    await waitFor(() => {
      expect(useStore.getState().isAdminAuthenticated).toBe(false)
    })
    expect(screen.queryByText('Admin Dashboard')).not.toBeInTheDocument()
  })

  it('does not authenticate with a wrong email', async () => {
    const user = userEvent.setup()
    renderLoginPage()
    await user.type(screen.getByLabelText(/email/i), 'notadmin@mail.com')
    await user.type(screen.getByLabelText(/^password/i), 'Pa55word')
    await user.click(screen.getByRole('button', { name: /log in|sign in|login/i }))
    await waitFor(() => {
      expect(useStore.getState().isAdminAuthenticated).toBe(false)
    })
  })

  it('shows a validation error for an invalid email format before submitting', async () => {
    const user = userEvent.setup()
    renderLoginPage()
    await user.type(screen.getByLabelText(/email/i), 'not-an-email')
    await user.type(screen.getByLabelText(/^password/i), 'Pa55word')
    await user.click(screen.getByRole('button', { name: /log in|sign in|login/i }))
    expect(useStore.getState().isAdminAuthenticated).toBe(false)
  })
})
