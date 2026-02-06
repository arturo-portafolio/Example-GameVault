import { useState } from 'react';
import { Link } from 'react-scroll';
import { ShoppingCart, Menu, X, Gamepad2, User } from 'lucide-react';
import { useStore } from '@/hooks/use-store';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from '@/components/ui/sheet';
import { CartDrawer } from './CartDrawer';
import { Badge } from '@/components/ui/badge';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const cartCount = useStore(s => s.cart.reduce((acc, item) => acc + item.quantity, 0));
  const membership = useStore(s => s.membership);

  const navLinks = [
    { name: 'Catalog', to: 'catalog' },
    { name: 'Rentals', to: 'rentals' },
    { name: 'Trade-In', to: 'trade-in' },
    { name: 'Membership', to: 'membership' },
    { name: 'Contact', to: 'contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link 
          to="hero" 
          smooth={true} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
            <Gamepad2 className="w-8 h-8 text-primary group-hover:text-glow-primary transition-all" />
          </div>
          <span className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            GAMEVAULT
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              smooth={true}
              offset={-80}
              className="text-muted-foreground hover:text-primary transition-colors cursor-pointer font-medium uppercase tracking-wide text-sm"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
           {/* Membership Status Badge */}
           <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20">
              <User className="w-4 h-4 text-secondary" />
              <span className={`text-xs font-bold uppercase ${membership.color}`}>
                {membership.name}
              </span>
           </div>

          {/* Cart Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 hover:text-primary">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground border-none">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md bg-card border-l border-white/10">
              <SheetHeader>
                <SheetTitle className="font-display text-2xl text-primary">Your Cart</SheetTitle>
                <SheetDescription>Review your items before checkout.</SheetDescription>
              </SheetHeader>
              <CartDrawer />
            </SheetContent>
          </Sheet>

          {/* Mobile Menu Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-card border-b border-white/10 p-4 flex flex-col gap-4 shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              smooth={true}
              offset={-80}
              onClick={() => setIsOpen(false)}
              className="p-3 text-center rounded-lg hover:bg-white/5 cursor-pointer font-bold text-lg"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
