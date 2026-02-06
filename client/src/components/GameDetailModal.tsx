import { Game } from '@/data/games';
import { useStore } from '@/hooks/use-store';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Star, Clock, Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GameDetailModalProps {
  game: Game | null;
  onClose: () => void;
}

export function GameDetailModal({ game, onClose }: GameDetailModalProps) {
  const { addToCart } = useStore();
  const [rentalDays, setRentalDays] = useState<string>("7");
  const { toast } = useToast();

  if (!game) return null;

  const handleAddToCart = (type: 'buy' | 'rent') => {
    addToCart({
      game,
      type,
      rentalDays: type === 'rent' ? parseInt(rentalDays) as 7|14|30 : undefined,
      quantity: 1
    });
    onClose();
    toast({
      title: "Added to Cart",
      description: `${game.title} has been added.`,
    });
  };

  return (
    <Dialog open={!!game} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-card border-white/10 p-0 overflow-hidden text-foreground">
        <div className="grid md:grid-cols-2 h-full">
          {/* Left: Image & Visuals */}
          <div className="relative h-64 md:h-full">
            <img 
              src={game.image} 
              alt={game.title} 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent md:bg-gradient-to-r" />
            
            <div className="absolute bottom-4 left-4 flex gap-2">
              <Badge className="bg-primary text-black">{game.platform}</Badge>
              <Badge variant="secondary">{game.genre}</Badge>
            </div>
          </div>

          {/* Right: Info & Actions */}
          <div className="p-6 md:p-8 flex flex-col h-full overflow-y-auto">
            <div className="mb-6">
              <h2 className="text-3xl font-display font-bold mb-2">{game.title}</h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" /> {game.rating} Rating
                </span>
                <span>•</span>
                <span>{game.releaseYear}</span>
                <span>•</span>
                <span className={game.inStock ? "text-green-500" : "text-red-500"}>
                  {game.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {game.description}
              </p>
            </div>

            <Tabs defaultValue="buy" className="w-full mt-auto">
              <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10">
                <TabsTrigger value="buy">Buy</TabsTrigger>
                <TabsTrigger value="rent">Rent</TabsTrigger>
              </TabsList>
              
              <div className="p-6 mt-4 border border-white/10 rounded-xl bg-white/5">
                <TabsContent value="buy" className="mt-0 space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-muted-foreground">Purchase Price</span>
                    <span className="text-3xl font-bold text-primary">${game.price}</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Trophy className="w-4 h-4 text-accent" /> Include original case & manual
                    </li>
                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 text-accent" /> 30-day return policy
                    </li>
                  </ul>
                  <Button 
                    className="w-full bg-primary text-black hover:bg-primary/90 font-bold h-12"
                    onClick={() => handleAddToCart('buy')}
                    disabled={!game.inStock}
                  >
                    Add to Cart - ${game.price}
                  </Button>
                </TabsContent>

                <TabsContent value="rent" className="mt-0 space-y-4">
                  <div className="mb-4">
                    <Label className="mb-3 block text-muted-foreground">Select Duration</Label>
                    <RadioGroup value={rentalDays} onValueChange={setRentalDays} className="grid grid-cols-3 gap-2">
                      {[7, 14, 30].map((days) => (
                        <div key={days}>
                          <RadioGroupItem value={days.toString()} id={`days-${days}`} className="peer sr-only" />
                          <Label
                            htmlFor={`days-${days}`}
                            className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent/10 hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer transition-all"
                          >
                            <span className="font-bold text-lg">{days}</span>
                            <span className="text-xs text-muted-foreground">Days</span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="flex justify-between items-center mb-4 pt-4 border-t border-white/10">
                    <span className="text-muted-foreground">Total Rental Price</span>
                    <span className="text-3xl font-bold text-primary">
                      ${(game.rentPrice * parseInt(rentalDays)).toFixed(2)}
                    </span>
                  </div>

                  <Button 
                    className="w-full bg-secondary text-white hover:bg-secondary/90 font-bold h-12"
                    onClick={() => handleAddToCart('rent')}
                    disabled={!game.inStock}
                  >
                    Rent Now
                  </Button>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
