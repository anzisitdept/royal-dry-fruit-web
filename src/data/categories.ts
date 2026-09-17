export interface Category {
  id: string;
  slug: string;
  name: string;
  urduName: string;
  description: string;
  image: string;
  itemCount: number;
}

export const CATEGORIES: Category[] = [
  {
    id: 'dry-fruits',
    slug: 'dry-fruits',
    name: 'Premium Dry Fruits (میوہ جات)',
    urduName: 'پریمیم ڈرائی فروٹس',
    description: 'Handpicked premium almonds, cashews, pistachios, and walnuts sourced from the finest orchards.',
    image: 'https://images.unsplash.com/photo-1769255484605-a245be3f1bf9?auto=format&fit=crop&w=800&q=80',
    itemCount: 4
  },
  {
    id: 'dates-dried-fruits',
    slug: 'dates-dried-fruits',
    name: 'Dates & Dried Fruits (کھجور اور خشک میوہ)',
    urduName: 'کھجور اور خشک میوہ جات',
    description: 'Sun-cured Medjool dates, golden raisins, Turkish figs, and Hunza apricots full of natural sweetness.',
    image: 'https://images.unsplash.com/photo-1771231591559-d19c89ad118a?auto=format&fit=crop&w=800&q=80',
    itemCount: 4
  },
  {
    id: 'roasted-flavored',
    slug: 'roasted-flavored',
    name: 'Roasted & Flavored Nuts (بھنے ہوئے میوہ جات)',
    urduName: 'روسٹڈ اور فلیورڈ نٹس',
    description: 'Perfectly dry-roasted nuts in salted, honey-glazed, and masala flavor profiles for every craving.',
    image: 'https://images.unsplash.com/photo-1760263215389-a8cc51bfc4c2?auto=format&fit=crop&w=800&q=80',
    itemCount: 4
  },
  {
    id: 'combos',
    slug: 'combos',
    name: 'Combos & Trail Packs (کامبو)',
    urduName: 'کامبوز اور ٹریل پیکس',
    description: 'Curated nut and dried-fruit blends designed for on-the-go snacking and family sharing.',
    image: 'https://images.unsplash.com/photo-1769255485022-f9bb6d6e8169?auto=format&fit=crop&w=800&q=80',
    itemCount: 2
  },
  {
    id: 'gift-boxes',
    slug: 'gift-boxes',
    name: 'Gift Boxes & Hampers (گفٹ باکسز)',
    urduName: 'گفٹ باکس اور ہیمپرز',
    description: 'Elegantly curated luxury hampers and gift boxes for Eid, weddings, and every celebration.',
    image: 'https://images.unsplash.com/photo-1627542343984-fb1c46987823?auto=format&fit=crop&w=800&q=80',
    itemCount: 3
  },
  {
    id: 'superfoods',
    slug: 'superfoods',
    name: 'Seeds & Superfoods (سپر فوڈز)',
    urduName: 'سیڈز اور سپر فوڈز',
    description: 'Organic chia, pumpkin, and flax seeds — pure nutrition packed into tiny powerhouse bites.',
    image: 'https://images.unsplash.com/photo-1512166967298-8b7de37890b6?auto=format&fit=crop&w=800&q=80',
    itemCount: 3
  },
  {
    id: 'best-sellers',
    slug: 'best-sellers',
    name: 'Best Sellers (بہترین اشیاء)',
    urduName: 'سب سے زیادہ فروخت ہونے والی',
    description: 'Our most loved nuts, dates, and hampers ordered by thousands of happy customers across Pakistan.',
    image: 'https://images.unsplash.com/photo-1514537193821-ed4955693802?auto=format&fit=crop&w=800&q=80',
    itemCount: 5
  }
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find(c => c.slug === slug || c.id === slug);
}