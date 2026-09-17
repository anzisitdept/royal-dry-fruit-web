export interface Product {
  id: string;
  slug: string;
  name: string;
  urduName: string;
  category: string;
  categoryName: string;
  originalPrice: number;
  price: number;
  discountBadge: string;
  isBestSeller: boolean;
  isNew: boolean;
  inStock?: boolean; // Synced with Admin panel (optional for local fallback)
  showInAllProducts?: boolean; // Synced with Admin panel (controls visibility on /collections/all-products)
  image: string;
  hoverImage: string;
  images: string[];
  weights: string[];
  weightPrices: Record<string, number>;
  description: string;
  ingredients: string;
  benefits: string;
  rating: number;
  reviewsCount: number;
  updatedAt?: any; // Synced with Admin panel
}

export const PRODUCTS: Product[] = [
  {
    "id": "california-almonds",
    "slug": "california-almonds",
    "name": "California Almonds (بادام)",
    "urduName": "بادام",
    "category": "dry-fruits",
    "categoryName": "Premium Dry Fruits",
    "originalPrice": 2000,
    "price": 1600,
    "discountBadge": "-20%",
    "isBestSeller": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1772986797605-f0b52fff45b0?auto=format&fit=crop&w=800&q=80",
    "hoverImage": "https://images.unsplash.com/photo-1769255484605-a245be3f1bf9?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1772986797605-f0b52fff45b0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1769255484605-a245be3f1bf9?auto=format&fit=crop&w=800&q=80"
    ],
    "weights": [
      "250g",
      "500g",
      "1kg"
    ],
    "weightPrices": {
      "250g": 450,
      "500g": 850,
      "1kg": 1600
    },
    "description": "Handpicked nonpareil California almonds, naturally sun-dried and gently blanched for a clean, buttery crunch. A premium pantry essential for snacking, baking, and everyday nutrition.",
    "ingredients": "100% Natural Nonpareil California Almonds.",
    "benefits": "Rich in Vitamin E, healthy monounsaturated fats, and magnesium. Supports heart health, glowing skin, and sustained energy.",
    "rating": 4.9,
    "reviewsCount": 186,
    "inStock": true,
    "showInAllProducts": true
  },
  {
    "id": "premium-cashews",
    "slug": "premium-cashews",
    "name": "Premium Cashews (کاجو)",
    "urduName": "کاجو",
    "category": "dry-fruits",
    "categoryName": "Premium Dry Fruits",
    "originalPrice": 2600,
    "price": 2000,
    "discountBadge": "-23%",
    "isBestSeller": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1726771517475-e7acdd34cd8a?auto=format&fit=crop&w=800&q=80",
    "hoverImage": "https://images.unsplash.com/photo-1718915869038-15c8be63c537?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1726771517475-e7acdd34cd8a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1718915869038-15c8be63c537?auto=format&fit=crop&w=800&q=80"
    ],
    "weights": [
      "250g",
      "500g",
      "1kg"
    ],
    "weightPrices": {
      "250g": 550,
      "500g": 1050,
      "1kg": 2000
    },
    "description": "Whole, creamy premium cashews sourced from the finest harvests. Roasted to a delicate golden finish that melts in your mouth with every bite.",
    "ingredients": "100% Whole Premium Cashews.",
    "benefits": "Excellent source of copper, magnesium, and plant protein. Boosts immunity, supports bone strength, and promotes healthy brain function.",
    "rating": 4.8,
    "reviewsCount": 154,
    "inStock": true,
    "showInAllProducts": true
  },
  {
    "id": "iranian-saffron-pistachios",
    "slug": "iranian-saffron-pistachios",
    "name": "Iranian Saffron Pistachios (پستہ)",
    "urduName": "پستہ",
    "category": "dry-fruits",
    "categoryName": "Premium Dry Fruits",
    "originalPrice": 3100,
    "price": 2400,
    "discountBadge": "-23%",
    "isBestSeller": false,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1734209181326-50c2b6763982?auto=format&fit=crop&w=800&q=80",
    "hoverImage": "https://images.unsplash.com/photo-1769255484631-d4e5b7d77446?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1734209181326-50c2b6763982?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1769255484631-d4e5b7d77446?auto=format&fit=crop&w=800&q=80"
    ],
    "weights": [
      "250g",
      "500g",
      "1kg"
    ],
    "weightPrices": {
      "250g": 650,
      "500g": 1250,
      "1kg": 2400
    },
    "description": "Prime Iranian pistachios roasted with a whisper of real saffron for a royal, aromatic twist. Naturally green, perfectly salted, and irresistibly crunchy.",
    "ingredients": "Premium Iranian Pistachios, Sea Salt, Pure Saffron Threads.",
    "benefits": "Packed with antioxidants, Vitamin B6, and dietary fiber. Great for eye health, blood sugar balance, and heart wellness.",
    "rating": 5,
    "reviewsCount": 47,
    "inStock": true,
    "showInAllProducts": true
  },
  {
    "id": "kashmiri-walnuts",
    "slug": "kashmiri-walnuts",
    "name": "Kashmiri Walnuts (اخروٹ)",
    "urduName": "اخروٹ",
    "category": "dry-fruits",
    "categoryName": "Premium Dry Fruits",
    "originalPrice": 2800,
    "price": 2000,
    "discountBadge": "-29%",
    "isBestSeller": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1768672933358-262a4acb35f6?auto=format&fit=crop&w=800&q=80",
    "hoverImage": "https://images.unsplash.com/photo-1524593000379-d4729b2c4f99?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1768672933358-262a4acb35f6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524593000379-d4729b2c4f99?auto=format&fit=crop&w=800&q=80"
    ],
    "weights": [
      "250g",
      "500g",
      "1kg"
    ],
    "weightPrices": {
      "250g": 550,
      "500g": 1050,
      "1kg": 2000
    },
    "description": "Mountain-grown Kashmiri walnuts, carefully shelled into plump, golden kernels. Their soft, sweet flavor and buttery texture are loved across the subcontinent.",
    "ingredients": "100% Natural Shelled Kashmiri Walnuts.",
    "benefits": "Loaded with Omega-3 fatty acids and antioxidants that support brain health, heart function, and skin radiance.",
    "rating": 4.8,
    "reviewsCount": 132,
    "inStock": true,
    "showInAllProducts": true
  },
  {
    "id": "medjool-dates",
    "slug": "medjool-dates",
    "name": "Medjool Dates (کھجور)",
    "urduName": "کھجور",
    "category": "dates-dried-fruits",
    "categoryName": "Dates & Dried Fruits",
    "originalPrice": 1850,
    "price": 1400,
    "discountBadge": "-24%",
    "isBestSeller": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1769255484739-3437edbb858e?auto=format&fit=crop&w=800&q=80",
    "hoverImage": "https://images.unsplash.com/photo-1771231591559-d19c89ad118a?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1769255484739-3437edbb858e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1771231591559-d19c89ad118a?auto=format&fit=crop&w=800&q=80"
    ],
    "weights": [
      "250g",
      "500g",
      "1kg"
    ],
    "weightPrices": {
      "250g": 400,
      "500g": 750,
      "1kg": 1400
    },
    "description": "Jumbo Medjool dates — soft, caramel-sweet, and naturally juicy. Hand-graded premium dates that make the perfect healthy indulgence and stay fresh for months.",
    "ingredients": "100% Natural Medjool Dates.",
    "benefits": "Naturally rich in fiber, potassium, and iron. A wholesome instant-energy snack that supports digestion and bone health.",
    "rating": 4.9,
    "reviewsCount": 171,
    "inStock": true,
    "showInAllProducts": true
  },
  {
    "id": "afghan-golden-raisins",
    "slug": "afghan-golden-raisins",
    "name": "Afghan Golden Raisins (کشمش)",
    "urduName": "کشمش",
    "category": "dates-dried-fruits",
    "categoryName": "Dates & Dried Fruits",
    "originalPrice": 1350,
    "price": 1000,
    "discountBadge": "-26%",
    "isBestSeller": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1630623091847-e83fc91c6884?auto=format&fit=crop&w=800&q=80",
    "hoverImage": "https://images.unsplash.com/photo-1707912258831-07ee60a7fd52?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1630623091847-e83fc91c6884?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1707912258831-07ee60a7fd52?auto=format&fit=crop&w=800&q=80"
    ],
    "weights": [
      "250g",
      "500g",
      "1kg"
    ],
    "weightPrices": {
      "250g": 300,
      "500g": 550,
      "1kg": 1000
    },
    "description": "Sun-dried Afghan golden raisins with a glossy amber sheen and naturally sweet taste. Plump, tender, and perfect for desserts, biryani, or mithai.",
    "ingredients": "100% Natural Sun-Dried Afghan Golden Raisins.",
    "benefits": "High in natural sugars, iron, and antioxidants — great for a quick energy boost and supporting healthy blood.",
    "rating": 4.8,
    "reviewsCount": 88,
    "inStock": true,
    "showInAllProducts": true
  },
  {
    "id": "turkish-dried-figs",
    "slug": "turkish-dried-figs",
    "name": "Turkish Dried Figs (انجیر)",
    "urduName": "انجیر",
    "category": "dates-dried-fruits",
    "categoryName": "Dates & Dried Fruits",
    "originalPrice": 2200,
    "price": 1650,
    "discountBadge": "-25%",
    "isBestSeller": false,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1695839397257-c97a06caa0f0?auto=format&fit=crop&w=800&q=80",
    "hoverImage": "https://images.unsplash.com/photo-1633889259614-6a1ed0ffb309?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1695839397257-c97a06caa0f0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1633889259614-6a1ed0ffb309?auto=format&fit=crop&w=800&q=80"
    ],
    "weights": [
      "250g",
      "500g",
      "1kg"
    ],
    "weightPrices": {
      "250g": 450,
      "500g": 850,
      "1kg": 1650
    },
    "description": "Tender Turkish Aegean figs, naturally dried with their seeds intact for a soft, honeyed chew. A luxuriously sweet superfood tradition from the Mediterranean.",
    "ingredients": "100% Natural Turkish Dried Figs.",
    "benefits": "An excellent source of dietary fiber, calcium, and potassium. Supports digestion, bone density, and blood pressure balance.",
    "rating": 4.9,
    "reviewsCount": 39,
    "inStock": true,
    "showInAllProducts": true
  },
  {
    "id": "hunza-apricots",
    "slug": "hunza-apricots",
    "name": "Hunza Apricots (خوبانی)",
    "urduName": "خوبانی",
    "category": "dates-dried-fruits",
    "categoryName": "Dates & Dried Fruits",
    "originalPrice": 1700,
    "price": 1250,
    "discountBadge": "-26%",
    "isBestSeller": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1763140877786-5dc3287a6629?auto=format&fit=crop&w=800&q=80",
    "hoverImage": "https://images.unsplash.com/photo-1705917674321-0f4c71118f1d?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1763140877786-5dc3287a6629?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1705917674321-0f4c71118f1d?auto=format&fit=crop&w=800&q=80"
    ],
    "weights": [
      "250g",
      "500g",
      "1kg"
    ],
    "weightPrices": {
      "250g": 350,
      "500g": 650,
      "1kg": 1250
    },
    "description": "Organic Hunza apricots, sun-dried on the rooftops of the Karakoram mountains. Naturally sweet with a subtle tartness and incredible nutrient density.",
    "ingredients": "100% Natural Sun-Dried Hunza Apricots.",
    "benefits": "Rich in Vitamin A, iron, and beta-carotene for healthy eyes, immunity, and glowing skin.",
    "rating": 4.8,
    "reviewsCount": 64,
    "inStock": true,
    "showInAllProducts": true
  },
  {
    "id": "salted-roasted-almonds",
    "slug": "salted-roasted-almonds",
    "name": "Salted Roasted Almonds (نمکین بادام)",
    "urduName": "نمکین بادام",
    "category": "roasted-flavored",
    "categoryName": "Roasted & Flavored",
    "originalPrice": 2300,
    "price": 1700,
    "discountBadge": "-26%",
    "isBestSeller": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1772986798155-1b24598357b5?auto=format&fit=crop&w=800&q=80",
    "hoverImage": "https://images.unsplash.com/photo-1772986796144-8da96da6ed1c?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1772986798155-1b24598357b5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1772986796144-8da96da6ed1c?auto=format&fit=crop&w=800&q=80"
    ],
    "weights": [
      "250g",
      "500g",
      "1kg"
    ],
    "weightPrices": {
      "250g": 480,
      "500g": 900,
      "1kg": 1700
    },
    "description": "California almonds dry-roasted to a perfect golden crunch with a light sprinkle of sea salt. The classic snack that never misses.",
    "ingredients": "California Almonds, Sea Salt.",
    "benefits": "A satisfying protein-packed snack with heart-loving fats and the perfect savory bite.",
    "rating": 4.7,
    "reviewsCount": 52,
    "inStock": true,
    "showInAllProducts": true
  },
  {
    "id": "honey-roasted-cashews",
    "slug": "honey-roasted-cashews",
    "name": "Honey Roasted Cashews (شہد کاجو)",
    "urduName": "شہد بھنا کاجو",
    "category": "roasted-flavored",
    "categoryName": "Roasted & Flavored",
    "originalPrice": 2900,
    "price": 2200,
    "discountBadge": "-24%",
    "isBestSeller": false,
    "isNew": true,
    "image": "https://images.unsplash.com/photo-1760263215389-a8cc51bfc4c2?auto=format&fit=crop&w=800&q=80",
    "hoverImage": "https://images.unsplash.com/photo-1716910351910-66994931d6cf?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1760263215389-a8cc51bfc4c2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1716910351910-66994931d6cf?auto=format&fit=crop&w=800&q=80"
    ],
    "weights": [
      "250g",
      "500g",
      "1kg"
    ],
    "weightPrices": {
      "250g": 600,
      "500g": 1150,
      "1kg": 2200
    },
    "description": "Whole premium cashews glazed with pure honey and slow-roasted until caramelized on the outside, still creamy within. An indulgent yet wholesome treat.",
    "ingredients": "Premium Cashews, Pure Honey, Sea Salt.",
    "benefits": "Natural sweetness for energy, plus beneficial fats and minerals for daily wellness.",
    "rating": 4.9,
    "reviewsCount": 45,
    "inStock": true,
    "showInAllProducts": true
  },
  {
    "id": "roasted-masala-pistachios",
    "slug": "roasted-masala-pistachios",
    "name": "Roasted Masala Pistachios (مسالہ پستہ)",
    "urduName": "مسالہ پستہ",
    "category": "roasted-flavored",
    "categoryName": "Roasted & Flavored",
    "originalPrice": 3300,
    "price": 2500,
    "discountBadge": "-24%",
    "isBestSeller": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1772986754125-e6012ae00943?auto=format&fit=crop&w=800&q=80",
    "hoverImage": "https://images.unsplash.com/photo-1772986754122-06ea7269829d?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1772986754125-e6012ae00943?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1772986754122-06ea7269829d?auto=format&fit=crop&w=800&q=80"
    ],
    "weights": [
      "250g",
      "500g",
      "1kg"
    ],
    "weightPrices": {
      "250g": 680,
      "500g": 1300,
      "1kg": 2500
    },
    "description": "Premium pistachios tossed in a fire-roasted desi masala blend of rock salt, black pepper, and warming spices. Bold flavor, royal crunch.",
    "ingredients": "Premium Pistachios, Masala Spice Blend, Rock Salt.",
    "benefits": "High-protein snack loaded with antioxidants and potassium for a flavorful health boost.",
    "rating": 4.7,
    "reviewsCount": 36,
    "inStock": true,
    "showInAllProducts": true
  },
  {
    "id": "dry-roasted-peanuts",
    "slug": "dry-roasted-peanuts",
    "name": "Dry Roasted Peanuts (بھنا مونگ پھلی)",
    "urduName": "بھنی مونگ پھلی",
    "category": "roasted-flavored",
    "categoryName": "Roasted & Flavored",
    "originalPrice": 800,
    "price": 600,
    "discountBadge": "-25%",
    "isBestSeller": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1766085683622-6bb826beaa67?auto=format&fit=crop&w=800&q=80",
    "hoverImage": "https://images.unsplash.com/photo-1549978113-29eb25c8177f?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1766085683622-6bb826beaa67?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549978113-29eb25c8177f?auto=format&fit=crop&w=800&q=80"
    ],
    "weights": [
      "250g",
      "500g",
      "1kg"
    ],
    "weightPrices": {
      "250g": 180,
      "500g": 330,
      "1kg": 600
    },
    "description": "Selected peanuts dry-roasted in small batches until deeply golden and crunchy. Clean, earthy, and endlessly snackable.",
    "ingredients": "100% Natural Peanuts.",
    "benefits": "A budget-friendly source of plant protein, niacin, and healthy fats for everyday energy.",
    "rating": 4.7,
    "reviewsCount": 74,
    "inStock": true,
    "showInAllProducts": true
  },
  {
    "id": "royal-dry-fruits-hamper",
    "slug": "royal-dry-fruits-hamper",
    "name": "Royal Dry Fruits Hamper (شاہی ہیمپر)",
    "urduName": "شاہی ڈرائی فروٹس ہیمپر",
    "category": "gift-boxes",
    "categoryName": "Gift Boxes & Hampers",
    "originalPrice": 4700,
    "price": 3500,
    "discountBadge": "-26%",
    "isBestSeller": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1764764138587-189f22804ec4?auto=format&fit=crop&w=800&q=80",
    "hoverImage": "https://images.unsplash.com/photo-1627542343984-fb1c46987823?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1764764138587-189f22804ec4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1627542343984-fb1c46987823?auto=format&fit=crop&w=800&q=80"
    ],
    "weights": [
      "1 Box"
    ],
    "weightPrices": {
      "1 Box": 3500
    },
    "description": "Our signature luxury hamper: premium almonds, cashews, pistachios, dates, and raisins arranged in an elegant gift box. Perfect for Eid, weddings, and corporate gifting.",
    "ingredients": "Assorted Premium Dry Fruits & Nuts in Luxury Packaging.",
    "benefits": "A ready-to-gift premium hamper that impresses on any occasion with full cash-on-delivery convenience.",
    "rating": 5,
    "reviewsCount": 96,
    "inStock": true,
    "showInAllProducts": true
  },
  {
    "id": "premium-assorted-gift-box",
    "slug": "premium-assorted-gift-box",
    "name": "Premium Assorted Gift Box (پریمیم گفٹ باکس)",
    "urduName": "پریمیم اسورٹڈ گفٹ باکس",
    "category": "gift-boxes",
    "categoryName": "Gift Boxes & Hampers",
    "originalPrice": 3800,
    "price": 2800,
    "discountBadge": "-26%",
    "isBestSeller": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1627542343984-fb1c46987823?auto=format&fit=crop&w=800&q=80",
    "hoverImage": "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1627542343984-fb1c46987823?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=800&q=80"
    ],
    "weights": [
      "1 Box"
    ],
    "weightPrices": {
      "1 Box": 2800
    },
    "description": "A curated selection of our finest nuts and dried fruits in premium packaging with a personal greeting card. Thoughtfully assembled, beautifully presented.",
    "ingredients": "Curated Selection of Premium Nuts & Dried Fruits.",
    "benefits": "Premium presentation and generous assortment make it the ideal gift for loved ones and clients.",
    "rating": 4.9,
    "reviewsCount": 58,
    "inStock": true,
    "showInAllProducts": true
  },
  {
    "id": "wedding-favour-gift-box",
    "slug": "wedding-favour-gift-box",
    "name": "Wedding Favour Gift Box (شادی گفٹ باکس)",
    "urduName": "شادی کی یادگار گفٹ باکس",
    "category": "gift-boxes",
    "categoryName": "Gift Boxes & Hampers",
    "originalPrice": 1600,
    "price": 1200,
    "discountBadge": "-25%",
    "isBestSeller": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=800&q=80",
    "hoverImage": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80"
    ],
    "weights": [
      "1 Box"
    ],
    "weightPrices": {
      "1 Box": 1200
    },
    "description": "Elegant white favour boxes filled with assorted premium nuts and dates — a graceful, memorable takeaway for wedding guests and walima gatherings.",
    "ingredients": "Assorted Premium Nuts, Dates & Dried Fruits.",
    "benefits": "Beautifully crafted favours that add a premium finishing touch to any celebration.",
    "rating": 4.8,
    "reviewsCount": 33,
    "inStock": true,
    "showInAllProducts": true
  },
  {
    "id": "royal-trail-mix",
    "slug": "royal-trail-mix",
    "name": "Royal Trail Mix (رائل ٹریل مکس)",
    "urduName": "رائل ٹریل مکس",
    "category": "combos",
    "categoryName": "Combos & Trail Packs",
    "originalPrice": 2400,
    "price": 1800,
    "discountBadge": "-25%",
    "isBestSeller": true,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1769255485022-f9bb6d6e8169?auto=format&fit=crop&w=800&q=80",
    "hoverImage": "https://images.unsplash.com/photo-1514537193821-ed4955693802?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1769255485022-f9bb6d6e8169?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514537193821-ed4955693802?auto=format&fit=crop&w=800&q=80"
    ],
    "weights": [
      "250g",
      "500g",
      "1kg"
    ],
    "weightPrices": {
      "250g": 500,
      "500g": 950,
      "1kg": 1800
    },
    "description": "The perfect blend of premium almonds, cashews, raisins, and dried cranberries — hand-mixed for a sweet-and-savory energy boost on the go.",
    "ingredients": "Almonds, Cashews, Walnuts, Raisins, Dried Cranberries, Pumpkin Seeds.",
    "benefits": "Balanced protein, fiber, and natural sugars keep you fueled through busy days, travel, and workouts.",
    "rating": 4.9,
    "reviewsCount": 143,
    "inStock": true,
    "showInAllProducts": true
  },
  {
    "id": "mixed-nuts-dried-fruit-combo",
    "slug": "mixed-nuts-dried-fruit-combo",
    "name": "Mixed Nuts & Dried Fruit Combo (مکس نٹس کامبو)",
    "urduName": "مکس نٹس اور میوہ جات کامبو",
    "category": "combos",
    "categoryName": "Combos & Trail Packs",
    "originalPrice": 2250,
    "price": 1700,
    "discountBadge": "-24%",
    "isBestSeller": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1724675007843-3be518bed385?auto=format&fit=crop&w=800&q=80",
    "hoverImage": "https://images.unsplash.com/photo-1536679887050-4bdea5bf41c6?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1724675007843-3be518bed385?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1536679887050-4bdea5bf41c6?auto=format&fit=crop&w=800&q=80"
    ],
    "weights": [
      "500g",
      "1kg"
    ],
    "weightPrices": {
      "500g": 900,
      "1kg": 1700
    },
    "description": "Family-ready combo of premium mixed nuts with sweet dried fruits — the hearty, wholesome mix that disappears fast at every gathering.",
    "ingredients": "Mixed Nuts (Almonds, Cashews, Peanuts), Mixed Dried Fruits (Dates, Raisins, Apricots).",
    "benefits": "A complete powerhouse of vitamins, minerals, and healthy fats for the whole family.",
    "rating": 4.8,
    "reviewsCount": 81,
    "inStock": true,
    "showInAllProducts": true
  },
  {
    "id": "chia-seeds",
    "slug": "chia-seeds",
    "name": "Organic Chia Seeds (چیا سیڈز)",
    "urduName": "چیا سیڈز",
    "category": "superfoods",
    "categoryName": "Seeds & Superfoods",
    "originalPrice": 1600,
    "price": 1200,
    "discountBadge": "-25%",
    "isBestSeller": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1668723968787-34d072429a25?auto=format&fit=crop&w=800&q=80",
    "hoverImage": "https://images.unsplash.com/photo-1512166967298-8b7de37890b6?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1668723968787-34d072429a25?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512166967298-8b7de37890b6?auto=format&fit=crop&w=800&q=80"
    ],
    "weights": [
      "250g",
      "500g",
      "1kg"
    ],
    "weightPrices": {
      "250g": 350,
      "500g": 650,
      "1kg": 1200
    },
    "description": "100% raw organic black chia seeds, triple-cleaned and ready for smoothies, puddings, and baking. Nature's tiny nutrition powerhouse.",
    "ingredients": "100% Organic Raw Chia Seeds.",
    "benefits": "Rich in Omega-3 fatty acids, dietary fiber, and plant protein. Supports digestion, hydration, and heart health.",
    "rating": 4.9,
    "reviewsCount": 119,
    "inStock": true,
    "showInAllProducts": true
  },
  {
    "id": "pumpkin-seeds",
    "slug": "pumpkin-seeds",
    "name": "Premium Pumpkin Seeds (کدو کے بیج)",
    "urduName": "کدو کے بیج",
    "category": "superfoods",
    "categoryName": "Seeds & Superfoods",
    "originalPrice": 1900,
    "price": 1400,
    "discountBadge": "-26%",
    "isBestSeller": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1776447402055-7d2e7a714b2d?auto=format&fit=crop&w=800&q=80",
    "hoverImage": "https://images.unsplash.com/photo-1545447859-6a9eca16e6ed?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1776447402055-7d2e7a714b2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1545447859-6a9eca16e6ed?auto=format&fit=crop&w=800&q=80"
    ],
    "weights": [
      "250g",
      "500g",
      "1kg"
    ],
    "weightPrices": {
      "250g": 400,
      "500g": 750,
      "1kg": 1400
    },
    "description": "Sharp-eagle graded pumpkin seeds, shelled and dried for a crisp, nutty bite. Perfect on salads, granola, or straight from the pouch.",
    "ingredients": "100% Natural Raw Pumpkin Seeds.",
    "benefits": "Loaded with Zinc, Magnesium, and plant protein — supports immunity, restful sleep, and prostate health.",
    "rating": 4.8,
    "reviewsCount": 47,
    "inStock": true,
    "showInAllProducts": true
  },
  {
    "id": "flax-seeds",
    "slug": "flax-seeds",
    "name": "Golden Flax Seeds (السی کے بیج)",
    "urduName": "السی کے بیج",
    "category": "superfoods",
    "categoryName": "Seeds & Superfoods",
    "originalPrice": 1200,
    "price": 900,
    "discountBadge": "-25%",
    "isBestSeller": false,
    "isNew": false,
    "image": "https://images.unsplash.com/photo-1656918828529-345b77bb06e9?auto=format&fit=crop&w=800&q=80",
    "hoverImage": "https://images.unsplash.com/photo-1758151749071-6275643468d0?auto=format&fit=crop&w=800&q=80",
    "images": [
      "https://images.unsplash.com/photo-1656918828529-345b77bb06e9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1758151749071-6275643468d0?auto=format&fit=crop&w=800&q=80"
    ],
    "weights": [
      "250g",
      "500g",
      "1kg"
    ],
    "weightPrices": {
      "250g": 250,
      "500g": 470,
      "1kg": 900
    },
    "description": "North-western golden flax seeds, clean-starched and naturally rich in lignans. A gentle, powerful addition to daily nutrition.",
    "ingredients": "100% Natural Golden Flax Seeds.",
    "benefits": "Superb source of Omega-3s and soluble fiber — supports heart health, cholesterol balance, and digestive regularity.",
    "rating": 4.7,
    "reviewsCount": 38,
    "inStock": true,
    "showInAllProducts": true
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug || p.id === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all' || category === 'all-products') return PRODUCTS;
  if (category === 'best-selling' || category === 'best-sellers') {
    return PRODUCTS.filter(p => p.isBestSeller);
  }
  if (category === 'new-arrivals') {
    return PRODUCTS.filter(p => p.isNew);
  }
  return PRODUCTS.filter(p => p.category.toLowerCase() === category.toLowerCase());
}