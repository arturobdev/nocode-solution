import { useTranslation } from 'react-i18next'
import SearchForm from '@/components/home/SearchForm'

export default function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-100 lg:min-h-125 flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop)',
          backgroundAttachment: 'fixed',
        }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-primary/80 via-primary/50 to-primary/30" />
      <div className="relative z-10 container-custom w-full text-center pt-16 pb-28 lg:pt-20 lg:pb-32">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
          {t('hero.title')}
        </h1>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
          {t('hero.subtitle')}
        </p>
        <div className="max-w-4xl mx-auto">
          <SearchForm />
        </div>
      </div>
    </section>
  )
}
