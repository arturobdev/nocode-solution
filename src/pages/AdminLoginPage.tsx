import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import SEO from '@/components/seo/SEO'

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})

type LoginValues = z.infer<typeof loginSchema>

export default function AdminLoginPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const loginAdmin = useStore((state) => state.loginAdmin)
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const from =
    (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? '/admin'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginValues) => {
    setAuthError(false)
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 600))

    const success = loginAdmin(data.email, data.password)
    if (success) {
      navigate(from, { replace: true })
    } else {
      setAuthError(true)
    }
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <SEO title={t('auth.loginTitle')} noindex />
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-primary">StayFinder</h1>
            <p className="text-neutral-600 mt-2">{t('auth.loginSubtitle')}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {authError && (
              <div className="rounded-lg bg-error-light p-3 text-sm text-error">
                {t('auth.invalidCredentials')}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">{t('auth.email')}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder={t('auth.emailPlaceholder')}
                  autoComplete="email"
                  className="pl-10"
                  {...register('email')}
                />
              </div>
              {errors.email && <p className="text-sm text-error">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t('auth.password')}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('auth.passwordPlaceholder')}
                  autoComplete="current-password"
                  className="pl-10 pr-10"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  aria-label={showPassword ? t('auth.hidePassword') : t('auth.showPassword')}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-error">{errors.password.message}</p>}
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t('auth.loggingIn')}
                </>
              ) : (
                t('auth.loginButton')
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
