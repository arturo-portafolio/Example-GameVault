export interface Game {
  id: string;
  title: string;
  price: number;
  rentPrice: number;
  platform: 'PlayStation' | 'Xbox' | 'Nintendo' | 'PC';
  genre: string;
  image: string;
  rating: number;
  releaseYear: number;
  description: string;
  isNew: boolean;
  inStock: boolean;
}

export const GAMES: Game[] = [
  {
    id: '1',
    title: 'Cyber Odyssey 2077',
    price: 59.99,
    rentPrice: 4.99,
    platform: 'PC',
    genre: 'RPG',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000',
    rating: 4.8,
    releaseYear: 2023,
    description: 'A futuristic open-world RPG set in a neon-lit metropolis obsessed with power, glamour, and body modification.',
    isNew: true,
    inStock: true
  },
  {
    id: '2',
    title: 'Stellar Warriors',
    price: 69.99,
    rentPrice: 5.99,
    platform: 'PlayStation',
    genre: 'Action',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=1000',
    rating: 4.5,
    releaseYear: 2024,
    description: 'Embark on an epic journey across the galaxy to save humanity from an ancient alien threat.',
    isNew: true,
    inStock: true
  },
  {
    id: '3',
    title: 'Speed Demon X',
    price: 49.99,
    rentPrice: 3.99,
    platform: 'Xbox',
    genre: 'Racing',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1000',
    rating: 4.2,
    releaseYear: 2022,
    description: 'High-octane street racing simulation with realistic physics and extensive car customization.',
    isNew: false,
    inStock: true
  },
  {
    id: '4',
    title: 'Fantasy Realms Online',
    price: 39.99,
    rentPrice: 2.99,
    platform: 'PC',
    genre: 'MMORPG',
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGxheWluZyUyMHZpZGVvJTIwZ2FtZXN8ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=60&w=3000",
    rating: 4.0,
    releaseYear: 2021,
    description: 'Join millions of players in a vast fantasy world filled with magic, monsters, and endless adventure.',
    isNew: false,
    inStock: true
  },
  {
    id: '5',
    title: 'Mushroom Kingdom Kart',
    price: 59.99,
    rentPrice: 5.99,
    platform: 'Nintendo',
    genre: 'Racing',
    image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&q=80&w=1000',
    rating: 4.9,
    releaseYear: 2023,
    description: 'Race against your favorite characters on gravity-defying tracks in the latest installment.',
    isNew: true,
    inStock: false
  },
  {
    id: '6',
    title: 'Tactical Ops: Siege',
    price: 29.99,
    rentPrice: 2.99,
    platform: 'PC',
    genre: 'Shooter',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=1000',
    rating: 4.3,
    releaseYear: 2020,
    description: 'Team-based tactical shooter where precision and strategy are key to victory.',
    isNew: false,
    inStock: true
  },
  {
    id: '7',
    title: 'Elden Shadows',
    price: 59.99,
    rentPrice: 4.99,
    platform: 'PlayStation',
    genre: 'RPG',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1000',
    rating: 4.9,
    releaseYear: 2022,
    description: 'A dark fantasy action-RPG that challenges players to explore a vast and dangerous world.',
    isNew: false,
    inStock: true
  },
  {
    id: '8',
    title: 'Halo: Infinite Reach',
    price: 59.99,
    rentPrice: 4.99,
    platform: 'Xbox',
    genre: 'Shooter',
    image: "https://images.unsplash.com/photo-1604586398467-32924c78b879?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
    rating: 4.6,
    releaseYear: 2021,
    description: 'The Master Chief returns in the most expansive campaign yet.',
    isNew: false,
    inStock: true
  },
  {
    id: '9',
    title: 'Zelda: Tears of Hyrule',
    price: 69.99,
    rentPrice: 6.99,
    platform: 'Nintendo',
    genre: 'Adventure',
    image: "https://images.unsplash.com/photo-1630051822408-b80dde2f5681?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
    rating: 5.0,
    releaseYear: 2023,
    description: 'An epic adventure across the land and skies of Hyrule.',
    isNew: true,
    inStock: true
  },
  {
    id: '10',
    title: 'FIFA Soccer 2025',
    price: 59.99,
    rentPrice: 4.99,
    platform: 'PlayStation',
    genre: 'Sports',
    image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&q=80&w=1000',
    rating: 4.1,
    releaseYear: 2024,
    description: 'The world\'s game, more realistic than ever before with Hypermotion technology.',
    isNew: true,
    inStock: true
  },
  {
    id: '11',
    title: 'Assassin\'s Creed: Ninja',
    price: 69.99,
    rentPrice: 5.99,
    platform: 'Xbox',
    genre: 'Action',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=1000',
    rating: 4.7,
    releaseYear: 2024,
    description: 'Explore feudal Japan as a lethal shinobi assassin.',
    isNew: true,
    inStock: true
  },
  {
    id: '12',
    title: 'Minecraft: Legends',
    price: 39.99,
    rentPrice: 2.99,
    platform: 'PC',
    genre: 'Strategy',
    image: 'https://images.unsplash.com/photo-1587573089734-09cb69c0f2b4?auto=format&fit=crop&q=80&w=1000',
    rating: 4.4,
    releaseYear: 2023,
    description: 'Discover the mysteries of Minecraft in a new action strategy game.',
    isNew: false,
    inStock: true
  }
];

export interface MembershipTier {
  id: 'bronze' | 'silver' | 'gold';
  name: string;
  price: number;
  perks: string[];
  discount: number; // 0.1 = 10%
  color: string;
}

export const MEMBERSHIPS: MembershipTier[] = [
  {
    id: 'bronze',
    name: 'Bronze',
    price: 0,
    perks: ['Standard rental prices', 'Access to community forum'],
    discount: 0,
    color: 'text-amber-600'
  },
  {
    id: 'silver',
    name: 'Silver',
    price: 9.99,
    perks: ['10% off all rentals', 'Early access to new releases', '1 free rental / month'],
    discount: 0.1,
    color: 'text-slate-300'
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 19.99,
    perks: ['20% off all rentals', 'Free shipping', '2 free rentals / month', 'Priority support'],
    discount: 0.2,
    color: 'text-yellow-400'
  }
];
