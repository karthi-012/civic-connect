 import { Link, useLocation } from 'react-router-dom';
 import { Button } from '@/components/ui/button';
 import { Menu, X, Bell, User } from 'lucide-react';
 import { useState } from 'react';
 import { motion, AnimatePresence } from 'framer-motion';
 
 export function Header() {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const location = useLocation();
   
   const navLinks = [
     { href: '/', label: 'Home' },
     { href: '/citizen', label: 'Report Issue' },
     { href: '/track', label: 'Track Issues' },
     { href: '/authority', label: 'Authority' },
   ];
   
   const isActive = (path: string) => location.pathname === path;
   
   return (
     <header className="sticky top-0 z-50 w-full bg-card/80 backdrop-blur-lg border-b border-border">
       <div className="container flex h-16 items-center justify-between px-4">
         <Link to="/" className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
             <span className="text-xl">🏛️</span>
           </div>
           <span className="font-display font-bold text-lg text-foreground hidden sm:block">
             CivicResolve
           </span>
         </Link>
         
         {/* Desktop Nav */}
         <nav className="hidden md:flex items-center gap-1">
           {navLinks.map(link => (
             <Link key={link.href} to={link.href}>
               <Button
                 variant={isActive(link.href) ? "secondary" : "ghost"}
                 size="sm"
                 className={isActive(link.href) ? "bg-secondary text-secondary-foreground" : ""}
               >
                 {link.label}
               </Button>
             </Link>
           ))}
         </nav>
         
         <div className="hidden md:flex items-center gap-2">
           <Button variant="ghost" size="icon" className="relative">
             <Bell className="h-5 w-5" />
             <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
               3
             </span>
           </Button>
           <Link to="/auth">
             <Button variant="default" size="sm" className="gap-2">
               <User className="h-4 w-4" />
               Login
             </Button>
           </Link>
         </div>
         
         {/* Mobile Menu Button */}
         <Button
           variant="ghost"
           size="icon"
           className="md:hidden"
           onClick={() => setIsMenuOpen(!isMenuOpen)}
         >
           {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
         </Button>
       </div>
       
       {/* Mobile Menu */}
       <AnimatePresence>
         {isMenuOpen && (
           <motion.div
             initial={{ opacity: 0, height: 0 }}
             animate={{ opacity: 1, height: 'auto' }}
             exit={{ opacity: 0, height: 0 }}
             className="md:hidden border-t border-border bg-card"
           >
             <nav className="container px-4 py-4 flex flex-col gap-2">
               {navLinks.map(link => (
                 <Link
                   key={link.href}
                   to={link.href}
                   onClick={() => setIsMenuOpen(false)}
                   className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                     isActive(link.href) 
                       ? 'bg-primary text-primary-foreground' 
                       : 'text-foreground hover:bg-muted'
                   }`}
                 >
                   {link.label}
                 </Link>
               ))}
               <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                 <Button className="w-full mt-2">Login / Sign Up</Button>
               </Link>
             </nav>
           </motion.div>
         )}
       </AnimatePresence>
     </header>
   );
 }