import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import SEO from '@/components/seo/SEO'

export default function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
      <SEO title={t('common.notFound404Title')} description={t('common.notFound404Desc')} />
      <div className="text-center px-4">
        <Search className="h-16 w-16 mx-auto text-neutral-200 mb-4" />
        <h1 className="text-4xl font-bold text-primary mb-2">{t('common.notFound404Title')}</h1>
        <p className="text-neutral-600 mb-6">{t('common.notFound404Desc')}</p>
        <Link to="/">
          <Button>{t('common.backToHome')}</Button>
        </Link>
      </div>
    </div>
  )
}
