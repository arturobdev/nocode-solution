import { useState, useEffect } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import FilterControls from '@/components/search/FilterControls'
import ApartmentCard from '@/components/search/ApartmentCard'
import SEO from '@/components/seo/SEO'
import { useSearchResults } from '@/hooks/useSearchResults'
import { SearchSkeleton } from '@/components/skeletons/SearchSkeleton'
import type { SortOption } from '@/hooks/useSearchResults'

export default function SearchResultsPage() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const {
    filters,
    setFilters,
    sortBy,
    setSortBy,
    likedIds,
    toggleLike,
    toggleType,
    clearFilters,
    hasActiveFilters,
    filteredApartments,
  } = useSearchResults()

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <SearchSkeleton />

  const SORT_OPTIONS: { value: SortOption; label: string }[] = [
    { value: 'popular', label: t('searchPage.popular') },
    { value: 'price-low', label: t('searchPage.priceLowHigh') },
    { value: 'price-high', label: t('searchPage.priceHighLow') },
    { value: 'rating', label: t('searchPage.ratingHighLow') },
  ]

  const filterControlsProps = {
    filters,
    onFiltersChange: setFilters,
    onToggleType: toggleType,
    onClearFilters: clearFilters,
    hasActiveFilters,
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <SEO
        title="Search Vacation Rentals"
        description="Search and filter from dozens of unique apartments, villas, cabins, and lofts. Find your perfect stay by price, rating, and amenities."
        canonicalPath="/search"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 bg-white rounded-lg border border-neutral-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5" />
                  {t('searchPage.filters')}
                </h2>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-xs text-neutral-600"
                  >
                    {t('searchPage.reset')}
                  </Button>
                )}
              </div>
              <Separator className="mb-6" />
              <FilterControls {...filterControlsProps} />
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h1 className="text-2xl font-bold text-primary">
                {filteredApartments.length}{' '}
                {filteredApartments.length !== 1 ? t('common.resultsPlural') : t('common.results')}
              </h1>

              <div className="flex items-center gap-3">
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-1" />
                  {t('searchPage.filters')}
                </Button>
              </div>
            </div>

            {filteredApartments.length === 0 ? (
              <div className="text-center py-20">
                <Search className="h-16 w-16 mx-auto text-neutral-200 mb-4" />
                <h2 className="text-xl font-semibold text-primary mb-2">{t('common.noResults')}</h2>
                <p className="text-neutral-600 mb-6">{t('common.tryAdjusting')}</p>
                <Button onClick={clearFilters} variant="outline">
                  {t('common.clearFilters')}
                </Button>
              </div>
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredApartments.map((apt) => (
                  <li key={apt.id}>
                    <ApartmentCard
                      apartment={apt}
                      isLiked={likedIds.has(apt.id)}
                      onToggleLike={toggleLike}
                    />
                  </li>
                ))}
              </ul>
            )}
          </main>
        </div>
      </div>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:hidden z-40">
        <Button onClick={() => setMobileFiltersOpen(true)} className="shadow-lg rounded-full px-6">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          {t('searchPage.filters')}
          {hasActiveFilters && (
            <span className="ml-2 bg-white/20 text-secondary text-xs px-1.5 py-0.5 rounded-full">
              {t('searchPage.active')}
            </span>
          )}
        </Button>
      </div>

      <Dialog open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5" />
              {t('searchPage.filters')}
            </DialogTitle>
          </DialogHeader>
          <FilterControls {...filterControlsProps} inDialog />
          <div className="pt-2">
            <Button onClick={() => setMobileFiltersOpen(false)} className="w-full">
              {t('searchPage.showResults')} ({filteredApartments.length})
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
