import { Game } from '@/data/games';
import { useStore } from '@/hooks/use-store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface GameCardProps {
  game: Game;
  onViewDetail: (game: Game) => void;
}

export function GameCard({ game, onViewDetail }: GameCardProps) {
  const { toggleWishlist, wishlist, addToCart } = useStore();
  const isWishlisted = wishlist.includes(game.id);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-card rounded-xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.2)]"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={game.image} 
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {game.isNew && (
            <Badge className="bg-primary text-black font-bold border-none shadow-lg shadow-primary/20">
              NEW
            </Badge>
          )}
          {!game.inStock && (
            <Badge variant="destructive" className="font-bold">
              OUT OF STOCK
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); toggleWishlist(game.id); }}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-primary/20 transition-colors"
        >
          <Heart 
            className={`w-5 h-5 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-white'}`} 
          />
        </button>

        {/* Quick Info Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform">
          <div className="flex items-center gap-1 text-yellow-400 mb-1">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-xs font-bold">{game.rating}</span>
          </div>
          <h3 className="font-display font-bold text-lg leading-tight mb-1 truncate">{game.title}</h3>
          <p className="text-sm text-muted-foreground">{game.genre} • {game.platform}</p>
        </div>
      </div>

      {/* Action Area */}
      <div className="p-4 border-t border-white/10 bg-card/50 backdrop-blur-sm">
        <div className="flex justify-between items-end mb-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Buy</p>
            <span className="text-lg font-bold text-white">${game.price}</span>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Rent</p>
            <span className="text-lg font-bold text-primary">${game.rentPrice}/day</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            className="w-full border-primary/50 text-primary hover:bg-primary hover:text-black font-bold"
            onClick={() => onViewDetail(game)}
          >
            Details
          </Button>
          <Button 
            className="w-full bg-primary text-black hover:bg-primary/90 font-bold"
            disabled={!game.inStock}
            onClick={() => addToCart({ game, type: 'buy', quantity: 1 })}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
