import { useStore } from '@/hooks/use-store';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function CartDrawer() {
  const { cart, removeFromCart, clearCart, membership } = useStore();
  const { toast } = useToast();

  const subtotal = cart.reduce((acc, item) => {
    const price = item.type === 'buy' ? item.game.price : (item.game.rentPrice * (item.rentalDays || 1));
    return acc + (price * item.quantity);
  }, 0);

  const discount = membership.discount > 0 ? subtotal * membership.discount : 0;
  const total = subtotal - discount;

  const handleCheckout = () => {
    toast({
      title: "Order Confirmed!",
      description: `Thank you for your purchase. Total: $${total.toFixed(2)}`,
      className: "bg-primary text-primary-foreground border-none"
    });
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-50">
        <ShoppingBag className="w-16 h-16 text-muted-foreground" />
        <p className="text-lg font-medium">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <ScrollArea className="flex-1 pr-4 -mr-4 mt-4">
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={`${item.game.id}-${item.type}`} className="flex gap-4 p-3 bg-white/5 rounded-lg border border-white/5">
              <img 
                src={item.game.image} 
                alt={item.game.title} 
                className="w-16 h-20 object-cover rounded"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold truncate text-sm">{item.game.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded ${item.type === 'buy' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                    {item.type === 'buy' ? 'Buy' : `Rent (${item.rentalDays} days)`}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-bold text-primary">
                    ${(item.type === 'buy' ? item.game.price : (item.game.rentPrice * (item.rentalDays || 1))).toFixed(2)}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-destructive hover:bg-destructive/20"
                    onClick={() => removeFromCart(item.game.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="mt-4 space-y-4 bg-background pt-4 border-t border-white/10">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-primary">
              <span>{membership.name} Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
          <Separator className="bg-white/10" />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-primary text-glow-primary">${total.toFixed(2)}</span>
          </div>
        </div>

        <Button 
          className="w-full bg-primary text-black hover:bg-primary/90 font-bold h-12 text-lg shadow-lg shadow-primary/20"
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}
