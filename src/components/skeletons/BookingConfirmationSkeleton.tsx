import { Skeleton } from '@/components/ui/skeleton'

export function BookingConfirmationSkeleton() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="flex flex-col items-center text-center">
        <Skeleton className="size-20 rounded-full mb-6" />
        <Skeleton className="h-9 w-64 mb-2" />
        <Skeleton className="h-5 w-72" />
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-lg border border-neutral-200 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-6 w-28 rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Skeleton className="h-4 w-20" />
            <div className="flex items-center gap-3">
              <Skeleton className="size-12 rounded-lg" />
              <Skeleton className="h-5 w-48" />
            </div>
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-36" />
          </div>
        </div>
        <Skeleton className="h-px w-full" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-px w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
      </div>

      <div className="flex justify-center gap-3 mt-8">
        <Skeleton className="h-10 w-36 rounded-md" />
        <Skeleton className="h-10 w-48 rounded-md" />
      </div>
    </div>
  )
}
