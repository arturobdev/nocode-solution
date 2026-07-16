import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

const SITE_NAME = 'StayFinder'
const DEFAULT_DESCRIPTION =
  'Find your perfect vacation rental. Browse unique apartments, villas, cabins, and lofts worldwide with instant booking and verified reviews.'

interface SEOProps {
  title?: string
  description?: string
  canonicalPath?: string
  ogImage?: string
  noindex?: boolean
  structuredData?: Record<string, unknown> | Record<string, unknown>[]
}

export default function SEO({
  title,
  description,
  canonicalPath,
  ogImage,
  noindex = false,
  structuredData,
}: SEOProps) {
  const { i18n } = useTranslation()

  const pageTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - Find Your Perfect Stay`
  const pageDescription = description || DEFAULT_DESCRIPTION
  const canonicalUrl = canonicalPath
    ? `https://www.stayfinder.com${canonicalPath}`
    : 'https://www.stayfinder.com'
  const imageUrl = ogImage || 'https://www.stayfinder.com/og-default.jpg'

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={canonicalUrl} />
      <html lang={i18n.language} />

      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={imageUrl} />
      <meta
        property="og:locale"
        content={i18n.language === 'es' ? 'es_ES' : i18n.language === 'pt' ? 'pt_BR' : 'en_US'}
      />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={imageUrl} />

      {/* JSON-LD Structured Data */}
      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </Helmet>
  )
}
