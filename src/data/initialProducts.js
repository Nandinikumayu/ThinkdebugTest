export const initialProducts = [
  {
    id: 101,
    title: "Electric Kettle",
    price: 45,
    category: "electronics",
    description: "Rapid-boil cordless electric kettle with auto shut-off and boil-dry protection.",
    image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&auto=format&fit=crop&q=80",
    rating: { rate: 4.6, count: 128 },
    featured: true
  },
  {
    id: 102,
    title: "Bluetooth Speaker",
    price: 130,
    category: "electronics",
    description: "Portable wireless stereo speaker with 360-degree high-fidelity sound and rich bass.",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80",
    rating: { rate: 4.8, count: 245 },
    featured: true
  },
  {
    id: 103,
    title: "Aloe Vera Hand Sanitizer",
    price: 2,
    category: "personal-care",
    description: "Soothing natural aloe vera hand sanitizing gel that kills 99.9% of germs.",
    image: "https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=600&auto=format&fit=crop&q=80",
    rating: { rate: 4.5, count: 89 },
    featured: true
  },
  {
    id: 104,
    title: "Classic Salted Potato Chips",
    price: 1.1,
    category: "groceries",
    description: "Crispy golden thinly-sliced farm-fresh potatoes sprinkled with natural sea salt.",
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&auto=format&fit=crop&q=80",
    rating: { rate: 4.7, count: 410 },
    featured: true
  },
  {
    id: 105,
    title: "Air Conditioner",
    price: 160,
    category: "electronics",
    description: "Energy-efficient split inverter AC with whisper-quiet operation and rapid cooling.",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&auto=format&fit=crop&q=80",
    rating: { rate: 4.9, count: 180 },
    featured: true
  },
  {
    id: 106,
    title: "Fjallraven - Foldsack No. 1 Backpack",
    price: 109.95,
    category: "men's clothing",
    description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop in the padded sleeve.",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: { rate: 3.9, count: 120 },
    featured: false
  },
  {
    id: 107,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    category: "men's clothing",
    description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket.",
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: { rate: 4.1, count: 259 },
    featured: false
  },
  {
    id: 108,
    title: "John Hardy Women's Legends Naga Gold & Silver Bracelet",
    price: 695,
    category: "jewelery",
    description: "Inspired by the mythical water dragon that protects the ocean's pearl.",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 4.6, count: 400 },
    featured: false
  },
  {
    id: 109,
    title: "Solid Gold Petite Micropave Ring",
    price: 168,
    category: "jewelery",
    description: "Satisfaction Guaranteed. Return or exchange any order within 30 days.",
    image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 3.9, count: 70 },
    featured: false
  },
  {
    id: 110,
    title: "SanDisk SSD PLUS 1TB Internal SSD",
    price: 109,
    category: "electronics",
    description: "Easy upgrade for faster boot up, shutdown, application load and response.",
    image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    rating: { rate: 2.9, count: 470 },
    featured: false
  },
  {
    id: 111,
    title: "Silicon Power 256GB SSD 3D NAND A55",
    price: 109,
    category: "electronics",
    description: "3D NAND flash are applied to deliver high transfer speeds and remarkable endurance.",
    image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
    rating: { rate: 4.8, count: 319 },
    featured: false
  },
  {
    id: 112,
    title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket",
    price: 56.99,
    category: "women's clothing",
    description: "Detachable fleece inner jacket with adjustable cuffs, waterproof and windproof.",
    image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
    rating: { rate: 4.2, count: 235 },
    featured: false
  }
];

export const heroSlides = [
  {
    id: 1,
    title: "NEW SALE",
    subtitle: "UP TO 50% OFF",
    highlight: "Grab deals on top electronics, home appliances, and fashion items!",
    badge: "Limited Time Offer",
    bgGradient: "linear-gradient(135deg, #f7ce46 0%, #ffae19 100%)",
    theme: "yellow",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1000&auto=format&fit=crop&q=80",
    buttonText: "Shop Deals Now",
    buttonLink: "#products"
  },
  {
    id: 2,
    title: "SMART TECH",
    subtitle: "NEXT GEN GADGETS",
    highlight: "Premium sound systems, appliances, and accessories at unbeatable prices.",
    badge: "Trending Tech",
    bgGradient: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
    theme: "blue",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80",
    buttonText: "Explore Electronics",
    buttonLink: "#products"
  },
  {
    id: 3,
    title: "TRENDY STYLES",
    subtitle: "FLAT 40% OFF",
    highlight: "Upgrade your wardrobe with latest fashion trends and jewelery collections.",
    badge: "New Arrivals",
    bgGradient: "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)",
    theme: "pink",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&auto=format&fit=crop&q=80",
    buttonText: "Discover Fashion",
    buttonLink: "#products"
  }
];
