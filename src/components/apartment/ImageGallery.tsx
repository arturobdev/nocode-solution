import { useState } from 'react'
import { Heart, Share2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageGalleryProps {
  images: string[]
  name: string
}

export default function ImageGallery({ images, name }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [liked, setLiked] = useState(false)

  return (
    <div className="mb-6">
      <div className="relative aspect-video w-full rounded-lg overflow-hidden">
        <img src={images[selectedImage]} alt={name} className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setLiked(!liked)}
            className="p-2.5 bg-white/90 rounded-full hover:bg-white transition-colors"
            aria-label={liked ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className={cn('h-5 w-5', liked ? 'fill-error text-error' : 'text-neutral-600')}
            />
          </button>
          <button
            className="p-2.5 bg-white/90 rounded-full hover:bg-white transition-colors"
            aria-label="Share this listing"
          >
            <Share2 className="h-5 w-5 text-neutral-600" />
          </button>
        </div>
      </div>
      <div className="flex gap-3 mt-4 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:overflow-visible">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelectedImage(i)}
            aria-label={`View image ${i + 1} of ${images.length}`}
            aria-current={selectedImage === i}
            className={cn(
              'shrink-0 w-24 h-20 md:w-full md:h-auto md:aspect-video rounded-lg overflow-hidden border-2 transition-all',
              selectedImage === i
                ? 'border-primary ring-2 ring-primary/20'
                : 'border-transparent opacity-70 hover:opacity-100'
            )}
          >
            <img src={img} alt={`${name} ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
