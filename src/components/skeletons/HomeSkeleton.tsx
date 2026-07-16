import { Skeleton } from '@/components/ui/skeleton'

export function HomeSkeleton() {
  return (
    <div>
      <Skeleton className="h-100 lg:h-125 w-full rounded-none" />

      <section className="py-16 lg:py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Skeleton className="h-9 w-64 mx-auto mb-3" />
            <Skeleton className="h-5 w-80 mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-4/3 rounded-xl" />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="flex items-end justify-between mb-12">
            <div>
              <Skeleton className="h-9 w-72 mb-3" />
              <Skeleton className="h-5 w-56" />
            </div>
            <Skeleton className="h-5 w-20 hidden sm:block" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Skeleton className="aspect-video" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Skeleton className="h-9 w-56 mx-auto mb-3" />
            <Skeleton className="h-5 w-72 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center">
                <Skeleton className="size-14 rounded-xl mx-auto mb-5" />
                <Skeleton className="h-5 w-28 mx-auto mb-2" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
