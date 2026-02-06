import { create } from 'zustand';
import { Game, GAMES, MEMBERSHIPS, MembershipTier } from '@/data/games';

export interface CartItem {
  game: Game;
  type: 'buy' | 'rent';
  rentalDays?: 7 | 14 | 30;
  quantity: number;
}

interface StoreState {
  // Catalog State
  games: Game[];
  searchQuery: string;
  filters: {
    platform: string | null;
    genre: string | null;
    priceMax: number | null;
  };
  setSearchQuery: (query: string) => void;
  setFilter: (key: keyof StoreState['filters'], value: string | number | null) => void;

  // Cart State
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (gameId: string) => void;
  clearCart: () => void;

  // User State
  membership: MembershipTier;
  setMembership: (tierId: MembershipTier['id']) => void;
  wishlist: string[];
  toggleWishlist: (gameId: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  games: GAMES,
  searchQuery: '',
  filters: {
    platform: null,
    genre: null,
    priceMax: null,
  },
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilter: (key, value) => 
    set((state) => ({ filters: { ...state.filters, [key]: value } })),

  cart: [],
  addToCart: (newItem) => set((state) => {
    const existing = state.cart.find(
      item => item.game.id === newItem.game.id && item.type === newItem.type
    );
    if (existing) {
      return {
        cart: state.cart.map(item => 
          (item.game.id === newItem.game.id && item.type === newItem.type)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    }
    return { cart: [...state.cart, newItem] };
  }),
  removeFromCart: (gameId) => 
    set((state) => ({ cart: state.cart.filter(item => item.game.id !== gameId) })),
  clearCart: () => set({ cart: [] }),

  membership: MEMBERSHIPS[0], // Default Bronze
  setMembership: (tierId) => 
    set({ membership: MEMBERSHIPS.find(m => m.id === tierId) || MEMBERSHIPS[0] }),
  
  wishlist: [],
  toggleWishlist: (gameId) => set((state) => {
    const inWishlist = state.wishlist.includes(gameId);
    return {
      wishlist: inWishlist 
        ? state.wishlist.filter(id => id !== gameId)
        : [...state.wishlist, gameId]
    };
  }),
}));
