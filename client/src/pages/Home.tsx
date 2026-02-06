import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { GameCard } from '@/components/GameCard';
import { GameDetailModal } from '@/components/GameDetailModal';
import { useStore } from '@/hooks/use-store';
import { Game, MEMBERSHIPS } from '@/data/games';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Search, Filter, ShieldCheck, Truck, RefreshCcw, Trophy, Mail, CheckCircle2, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

// --- SECTIONS ---

// 1. Hero Section
function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Video/Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover opacity-30"
          alt="Hero background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="container relative z-10 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/50 px-4 py-1 text-sm backdrop-blur-md">
            THE FUTURE OF GAMING
          </Badge>
          <h1 className="text-5xl md:text-8xl font-display font-black text-white mb-6 tracking-tight">
            LEVEL UP YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary text-glow-primary">
              EXPERIENCE
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Rent the latest AAA titles, trade in your old collection, or buy your favorites to keep. 
            Join GameVault today and unlock the ultimate gaming library.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary text-black hover:bg-primary/90 font-bold h-14 px-8 text-lg shadow-[0_0_20px_-5px_hsl(var(--primary))] hover:shadow-[0_0_30px_-5px_hsl(var(--primary))] transition-all">
              Explore Catalog
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 h-14 px-8 text-lg font-bold">
              View Memberships
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scrolling Text Decor */}
      <div className="absolute -bottom-6 md:-bottom-10 w-full overflow-hidden py-4 border-t border-white/5 bg-black/40 backdrop-blur-sm">
        <div className="flex gap-8 animate-marquee whitespace-nowrap text-white/20 font-display font-bold text-4xl uppercase">
          <span>PlayStation</span> • <span>Xbox</span> • <span>Nintendo</span> • <span>PC Gaming</span> • <span>VR Ready</span> • <span>Next Gen</span> • <span>PlayStation</span> • <span>Xbox</span> • <span>Nintendo</span>
        </div>
      </div>
    </section>
  );
}

// 2. Catalog Section
function Catalog({ onOpenDetail }: { onOpenDetail: (g: Game) => void }) {
  const { games, searchQuery, setSearchQuery, filters, setFilter } = useStore();

  const filteredGames = games.filter(g => {
    const matchesSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = filters.platform ? g.platform === filters.platform : true;
    const matchesGenre = filters.genre ? g.genre === filters.genre : true;
    const matchesPrice = filters.priceMax ? g.price <= filters.priceMax : true;
    return matchesSearch && matchesPlatform && matchesGenre && matchesPrice;
  });

  return (
    <section id="catalog" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-display font-bold text-white mb-2">Game <span className="text-primary">Catalog</span></h2>
            <p className="text-muted-foreground">Discover over 1000+ titles available for rent or purchase.</p>
          </div>
          
          <div className="flex flex-wrap gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search games..." 
                className="pl-10 bg-white/5 border-white/10 focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select onValueChange={(v) => setFilter('platform', v === 'all' ? null : v)}>
              <SelectTrigger className="w-[140px] bg-white/5 border-white/10">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="PlayStation">PlayStation</SelectItem>
                <SelectItem value="Xbox">Xbox</SelectItem>
                <SelectItem value="Nintendo">Nintendo</SelectItem>
                <SelectItem value="PC">PC</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(v) => setFilter('genre', v === 'all' ? null : v)}>
              <SelectTrigger className="w-[140px] bg-white/5 border-white/10">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                <SelectItem value="Action">Action</SelectItem>
                <SelectItem value="RPG">RPG</SelectItem>
                <SelectItem value="Racing">Racing</SelectItem>
                <SelectItem value="Shooter">Shooter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} onViewDetail={onOpenDetail} />
          ))}
        </div>
        
        {filteredGames.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-xl">No games found matching your criteria.</p>
            <Button variant="link" onClick={() => { setSearchQuery(''); setFilter('platform', null); setFilter('genre', null); }} className="text-primary mt-2">
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

// 4. Rental Info Section
function RentalInfo() {
  const features = [
    { icon: Clock, title: "Flexible Duration", desc: "Rent for 7, 14, or 30 days. Extend anytime from your dashboard." },
    { icon: Truck, title: "Fast Delivery", desc: "Digital codes delivered instantly. Physical discs arrive in 2 days." },
    { icon: ShieldCheck, title: "Damage Protection", desc: "All discs are covered. Scratches happen, don't worry about it." },
  ];

  return (
    <section id="rentals" className="py-24 bg-card/30 border-y border-white/5 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">HOW IT WORKS</Badge>
          <h2 className="text-4xl font-display font-bold mb-4">Rental <span className="text-accent">Process</span></h2>
          <p className="text-muted-foreground">Stop paying full price for games you only play once. Renting is smarter, cheaper, and easier.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-background/50 p-8 rounded-2xl border border-white/5 hover:border-primary/30 transition-all hover:-translate-y-2 group">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-display">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 5. Trade-In Section
function TradeIn() {
  const { toast } = useToast();
  const [estimatedValue, setEstimatedValue] = useState<number | null>(null);

  const calculateTradeIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate calculation
    const randomValue = Math.floor(Math.random() * (45 - 15) + 15);
    setEstimatedValue(randomValue);
    toast({
      title: "Valuation Complete",
      description: "Based on current market demand.",
    });
  };

  return (
    <section id="trade-in" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-display font-bold mb-6">Trade In & <span className="text-secondary">Level Up</span></h2>
            <p className="text-lg text-muted-foreground mb-8">
              Turn your old games into credit for new ones. We offer the best trade-in values in the market, guaranteed.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <RefreshCcw className="w-6 h-6 text-secondary shrink-0" />
                <div>
                  <h4 className="font-bold text-lg">Instant Quote</h4>
                  <p className="text-muted-foreground text-sm">Get a valuation in seconds online.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Truck className="w-6 h-6 text-secondary shrink-0" />
                <div>
                  <h4 className="font-bold text-lg">Free Shipping</h4>
                  <p className="text-muted-foreground text-sm">We provide the shipping label. Just pack and send.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 blur-[60px] rounded-full" />
            
            <h3 className="text-2xl font-bold mb-6 font-display">Value Calculator</h3>
            <form onSubmit={calculateTradeIn} className="space-y-4">
              <div className="space-y-2">
                <Label>Game Title</Label>
                <Input placeholder="e.g. God of War Ragnarok" className="bg-background/50 border-white/10" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Platform</Label>
                  <Select>
                    <SelectTrigger className="bg-background/50 border-white/10">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ps5">PS5</SelectItem>
                      <SelectItem value="xbox">Xbox Series X</SelectItem>
                      <SelectItem value="switch">Switch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Condition</Label>
                  <Select>
                    <SelectTrigger className="bg-background/50 border-white/10">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="perfect">Like New</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button type="submit" className="w-full bg-secondary text-white hover:bg-secondary/90 font-bold h-12 mt-2">
                Get Quote
              </Button>
            </form>

            {estimatedValue !== null && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 p-4 bg-secondary/10 rounded-xl border border-secondary/30 text-center"
              >
                <p className="text-sm text-muted-foreground mb-1">Estimated Credit Value</p>
                <p className="text-4xl font-bold text-secondary font-display text-glow-secondary">${estimatedValue}.00</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// 6. Membership Section
function Membership() {
  const { membership, setMembership } = useStore();
  const { toast } = useToast();

  const handleSelect = (tier: typeof MEMBERSHIPS[0]) => {
    setMembership(tier.id);
    toast({
      title: `Welcome to ${tier.name}!`,
      description: "Your new benefits are active immediately.",
    });
  };

  return (
    <section id="membership" className="py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/0 via-primary/5 to-card/0" />

      <div className="container relative mx-auto px-4 text-center">
        <h2 className="text-4xl font-display font-bold mb-4">Membership <span className="text-primary">Tiers</span></h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-16">
          Unlock exclusive discounts, free rentals, and priority shipping with our premium memberships.
        </p>

        <div className="grid md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
          {MEMBERSHIPS.map((tier) => {
            const isActive = membership.id === tier.id;
            const isGold = tier.id === 'gold';
            
            return (
              <motion.div 
                key={tier.id}
                whileHover={{ y: -10 }}
                className={`
                  relative bg-card rounded-2xl p-8 border 
                  ${isActive ? 'border-primary ring-2 ring-primary/50 shadow-[0_0_30px_-5px_hsl(var(--primary)/0.3)] scale-105 z-10' : 'border-white/10 hover:border-white/20'}
                  ${isGold ? 'md:scale-110 md:-translate-y-4' : ''}
                  transition-all duration-300
                `}
              >
                {isActive && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-black text-xs font-bold px-3 py-1 rounded-full uppercase">
                    Current Plan
                  </div>
                )}
                
                <h3 className={`text-2xl font-display font-bold mb-2 ${tier.color}`}>{tier.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${tier.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>

                <ul className="space-y-4 mb-8 text-left">
                  {tier.perks.map((perk, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className={`w-5 h-5 shrink-0 ${tier.color}`} />
                      {perk}
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full font-bold ${isActive ? 'bg-primary text-black' : 'bg-white/10 hover:bg-white/20'}`}
                  variant={isActive ? 'default' : 'outline'}
                  onClick={() => handleSelect(tier)}
                  disabled={isActive}
                >
                  {isActive ? 'Active' : 'Upgrade'}
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// 8. Contact Section
function Contact() {
  const contactSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    message: z.string().min(10)
  });

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" }
  });

  const { toast } = useToast();

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    toast({
      title: "Message Sent!",
      description: "We'll get back to you shortly.",
    });
    form.reset();
  };

  return (
    <section id="contact" className="py-24 bg-card/30 border-t border-white/5">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-4">Get in <span className="text-accent">Touch</span></h2>
          <p className="text-muted-foreground">Have questions about a game or your membership? We're here to help.</p>
        </div>

        <div className="bg-background border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} className="bg-white/5 border-white/10" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field} className="bg-white/5 border-white/10" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <textarea 
                        className="flex min-h-[120px] w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                        placeholder="How can we help you?" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-primary text-black hover:bg-primary/90 font-bold h-12 text-lg">
                Send Message
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}

// 9. Footer
function Footer() {
  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h3 className="text-2xl font-display font-bold text-white">GAMEVAULT</h3>
          <p className="text-sm text-muted-foreground mt-2">© 2025 GameVault Inc. All rights reserved.</p>
        </div>
        <div className="flex gap-6">
          {['Privacy', 'Terms', 'Support', 'Careers'].map(item => (
            <a key={item} href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// --- MAIN PAGE COMPONENT ---

export default function Home() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground font-body selection:bg-primary selection:text-black">
      <Navbar />
      
      <main>
        <Hero />
        <Catalog onOpenDetail={setSelectedGame} />
        <RentalInfo />
        <TradeIn />
        <Membership />
        <Contact />
      </main>

      <Footer />
      
      <GameDetailModal 
        game={selectedGame} 
        onClose={() => setSelectedGame(null)} 
      />
    </div>
  );
}
