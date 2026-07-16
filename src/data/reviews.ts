import type { Review } from '@/types'

export const reviews: Review[] = [
  {
    id: '1',
    apartmentId: '1',
    guestName: 'Jennifer Adams',
    guestAvatar: '',
    rating: 5,
    date: '2025-12-15',
    comment:
      'Absolutely stunning penthouse! The views are even better than the photos. Alexandra was a wonderful host, providing great restaurant recommendations. We loved waking up to the city skyline every morning.',
  },
  {
    id: '2',
    apartmentId: '1',
    guestName: 'Robert Chen',
    guestAvatar: '',
    rating: 5,
    date: '2025-11-28',
    comment:
      'Perfect location for exploring Manhattan. The apartment is beautifully designed and incredibly comfortable. The kitchen was well-equipped for cooking. Highly recommend!',
  },
  {
    id: '3',
    apartmentId: '1',
    guestName: 'Maria Santos',
    guestAvatar: '',
    rating: 4,
    date: '2025-10-05',
    comment:
      'Great apartment in an amazing location. Only minor issue was some street noise at night, but the overall experience was fantastic. Would definitely book again.',
  },
  {
    id: '4',
    apartmentId: '2',
    guestName: 'David Wilson',
    guestAvatar: '',
    rating: 5,
    date: '2026-01-10',
    comment:
      'The beachfront location is unbeatable. Waking up to ocean sounds was magical. The apartment is modern, clean, and has everything you need. Marcus was very responsive.',
  },
  {
    id: '5',
    apartmentId: '2',
    guestName: 'Lisa Thompson',
    guestAvatar: '',
    rating: 5,
    date: '2025-12-22',
    comment:
      'Our family had the most wonderful time. The kids loved the pool and direct beach access. The apartment is spacious and beautifully decorated. Already planning our return!',
  },
  {
    id: '6',
    apartmentId: '3',
    guestName: 'James Morrison',
    guestAvatar: '',
    rating: 5,
    date: '2026-02-14',
    comment:
      'The perfect mountain getaway! The fireplace was so cozy after a day of skiing. The hot tub with mountain views was the highlight. Sarah provided excellent local tips.',
  },
  {
    id: '7',
    apartmentId: '3',
    guestName: 'Emma Davis',
    guestAvatar: '',
    rating: 4,
    date: '2025-12-30',
    comment:
      'Beautiful cabin with great amenities. The ski-in/ski-out access is a huge plus. The only reason for 4 stars is the drive up can be challenging in snow, but the destination is worth it.',
  },
  {
    id: '8',
    apartmentId: '4',
    guestName: 'Kevin Zhang',
    guestAvatar: '',
    rating: 5,
    date: '2026-01-22',
    comment:
      'Love the industrial-chic design! The loft has incredible character. Perfect for a working trip - great WiFi and workspace. The Pearl District location is ideal.',
  },
  {
    id: '9',
    apartmentId: '5',
    guestName: 'Sarah Johnson',
    guestAvatar: '',
    rating: 5,
    date: '2026-02-01',
    comment:
      'This villa exceeded all expectations. The lake views are breathtaking, and having a private dock was amazing. We kayaked, swam, and relaxed by the fire pit. Truly a dream vacation.',
  },
  {
    id: '10',
    apartmentId: '5',
    guestName: 'Michael Brown',
    guestAvatar: '',
    rating: 5,
    date: '2025-11-15',
    comment:
      'The best vacation rental we have ever stayed in. The villa is massive, beautifully furnished, and the outdoor spaces are incredible. Worth every penny.',
  },
  {
    id: '11',
    apartmentId: '6',
    guestName: 'Anna Petrova',
    guestAvatar: '',
    rating: 4,
    date: '2025-10-20',
    comment:
      'Charming brownstone with so much character. The private garden was a lovely surprise. Emily was attentive and helpful. Great value for Brooklyn.',
  },
  {
    id: '12',
    apartmentId: '7',
    guestName: 'Carlos Mendez',
    guestAvatar: '',
    rating: 5,
    date: '2026-01-05',
    comment:
      'The infinity pool with desert views is otherworldly. The villa is architecturally stunning. Every detail has been thoughtfully designed. We did not want to leave!',
  },
  {
    id: '13',
    apartmentId: '8',
    guestName: 'Sophie Laurent',
    guestAvatar: '',
    rating: 4,
    date: '2025-11-08',
    comment:
      'A truly unique space with amazing river views. The art studio vibe is inspiring. Luna was a wonderful host. Great for creative types visiting Portland.',
  },
  {
    id: '14',
    apartmentId: '9',
    guestName: 'Tom Anderson',
    guestAvatar: '',
    rating: 5,
    date: '2026-02-10',
    comment:
      'The harbor views from the terrace are spectacular. The condo is luxurious and the amenities are top-notch. James was very professional and accommodating.',
  },
  {
    id: '15',
    apartmentId: '10',
    guestName: 'Rachel Kim',
    guestAvatar: '',
    rating: 5,
    date: '2026-01-18',
    comment:
      'The treehouse was absolutely magical! It felt like a fairy tale. Waking up in the trees with mountain views was unforgettable. Olivia thought of every detail.',
  },
  {
    id: '16',
    apartmentId: '10',
    guestName: 'Daniel Moore',
    guestAvatar: '',
    rating: 5,
    date: '2025-12-05',
    comment:
      'Most unique accommodation I have ever experienced. The craftsmanship is incredible, and the observation deck for stargazing was the cherry on top.',
  },
  {
    id: '17',
    apartmentId: '11',
    guestName: 'Priya Sharma',
    guestAvatar: '',
    rating: 4,
    date: '2025-10-30',
    comment:
      'Cute and compact studio in a perfect SoHo location. Everything you need is within walking distance. The design is stylish and the bed was very comfortable.',
  },
  {
    id: '18',
    apartmentId: '12',
    guestName: 'Alex Turner',
    guestAvatar: '',
    rating: 5,
    date: '2026-02-05',
    comment:
      'The coastal cottage was exactly what we needed. Watching the sunset from the deck with Haystack Rock in view was magical. Thomas left great recommendations for local restaurants.',
  },
]

export function getReviewsByApartmentId(apartmentId: string): Review[] {
  return reviews.filter((r) => r.apartmentId === apartmentId)
}
