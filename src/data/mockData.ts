export type TimelineItemType = 'booking' | 'task' | 'damage' | 'inquiry' | 'pricing';
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type TaskStatus = 'pending' | 'in_progress' | 'completed';
export type DamageSeverity = 'low' | 'medium' | 'high';

export interface TimelineItem {
  id: string;
  type: TimelineItemType;
  timestamp: string;
  title: string;
  subtitle: string;
  status?: string;
  data: Record<string, unknown>;
}

export const mockTimeline: TimelineItem[] = [
  {
    id: 'b001',
    type: 'booking',
    timestamp: '2026-03-10T14:30:00',
    title: 'New Booking — Villa Seaview',
    subtitle: 'John & Sarah Miller · 4 guests · 5 nights',
    status: 'confirmed',
    data: {
      guestName: 'John & Sarah Miller',
      property: 'Villa Seaview',
      checkIn: '2026-03-15',
      checkOut: '2026-03-20',
      guests: 4,
      totalPrice: 47500,
      source: 'Airbnb',
      artSeed: 8342,
    },
  },
  {
    id: 'i001',
    type: 'inquiry',
    timestamp: '2026-03-10T13:15:00',
    title: 'LINE Inquiry — Villa Sunset',
    subtitle: 'คุณสมชาย ถามเรื่องราคาช่วงสงกรานต์',
    status: 'pending',
    data: {
      guestName: 'คุณสมชาย',
      property: 'Villa Sunset',
      channel: 'LINE',
      message: 'สนใจจองวิลล่าช่วงสงกรานต์ 12-16 เมษายน 6 คน ราคาเท่าไหร่ครับ?',
    },
  },
  {
    id: 't001',
    type: 'task',
    timestamp: '2026-03-10T11:00:00',
    title: 'Cleaning — Villa Hillside',
    subtitle: 'Check-out today · Assigned: Khun Noi',
    status: 'in_progress',
    data: {
      property: 'Villa Hillside',
      taskType: 'cleaning',
      assignedTo: 'Khun Noi',
      scheduledTime: '14:00',
      checklist: ['Bedrooms', 'Bathrooms', 'Kitchen', 'Pool area', 'Linens'],
    },
  },
  {
    id: 'p001',
    type: 'pricing',
    timestamp: '2026-03-10T09:00:00',
    title: 'Price Suggestion — Villa Seaview',
    subtitle: 'Songkran period: ฿12,500/night (+38%)',
    status: 'pending',
    data: {
      property: 'Villa Seaview',
      period: 'Apr 10-17',
      currentPrice: 9000,
      suggestedPrice: 12500,
      multiplier: 1.38,
      demandScore: 87,
      confidence: 0.92,
    },
  },
  {
    id: 'd001',
    type: 'damage',
    timestamp: '2026-03-09T16:45:00',
    title: 'Damage Report — Villa Sunset',
    subtitle: 'Broken lamp in master bedroom · Medium',
    status: 'reported',
    data: {
      property: 'Villa Sunset',
      bookingId: 'b099',
      description: 'Table lamp in master bedroom knocked over and broken. Shade cracked, base chipped.',
      severity: 'medium',
      estimatedCost: 2800,
      items: ['Table lamp — master bedroom'],
    },
  },
  {
    id: 'b002',
    type: 'booking',
    timestamp: '2026-03-09T10:20:00',
    title: 'Booking Completed — Villa Hillside',
    subtitle: 'The Tanaka Family · 3 guests · 7 nights',
    status: 'completed',
    data: {
      guestName: 'The Tanaka Family',
      property: 'Villa Hillside',
      checkIn: '2026-03-02',
      checkOut: '2026-03-09',
      guests: 3,
      totalPrice: 63000,
      source: 'Booking.com',
      artSeed: 55219,
    },
  },
  {
    id: 't002',
    type: 'task',
    timestamp: '2026-03-09T08:00:00',
    title: 'Pool Maintenance — Villa Seaview',
    subtitle: 'Weekly chemical balance · Assigned: Khun Somchai',
    status: 'completed',
    data: {
      property: 'Villa Seaview',
      taskType: 'maintenance',
      assignedTo: 'Khun Somchai',
      scheduledTime: '09:00',
      checklist: ['pH level', 'Chlorine', 'Filter clean', 'Water level'],
    },
  },
];

export const revenueThisMonth = 247500;

export const properties = [
  { id: 'p1', name: 'Villa Seaview', bedrooms: 3, bathrooms: 2, basePrice: 9000 },
  { id: 'p2', name: 'Villa Sunset', bedrooms: 4, bathrooms: 3, basePrice: 12000 },
  { id: 'p3', name: 'Villa Hillside', bedrooms: 2, bathrooms: 2, basePrice: 7500 },
];
