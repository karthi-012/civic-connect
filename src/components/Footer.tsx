 import { Link } from 'react-router-dom';
 import { Mail, Phone, MapPin } from 'lucide-react';
 
 export function Footer() {
   return (
     <footer className="bg-primary text-primary-foreground mt-auto">
       <div className="container px-4 py-12">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           <div className="md:col-span-2">
             <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                 <span className="text-xl">🏛️</span>
               </div>
               <span className="font-display font-bold text-xl">CivicResolve</span>
             </div>
             <p className="text-primary-foreground/80 text-sm max-w-md mb-4">
               A crowdsourced platform connecting citizens with municipal authorities 
               for transparent and efficient civic issue resolution.
             </p>
             <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
               <span className="flex items-center gap-2">
                 <Mail className="w-4 h-4" />
                 support@civicresolve.gov.in
               </span>
               <span className="flex items-center gap-2">
                 <Phone className="w-4 h-4" />
                 1800-XXX-XXXX (Toll Free)
               </span>
               <span className="flex items-center gap-2">
                 <MapPin className="w-4 h-4" />
                 Municipal Corporation Office, City Center
               </span>
             </div>
           </div>
           
           <div>
             <h4 className="font-semibold mb-4">Quick Links</h4>
             <ul className="space-y-2 text-sm text-primary-foreground/70">
               <li><Link to="/citizen" className="hover:text-primary-foreground transition-colors">Report Issue</Link></li>
               <li><Link to="/track" className="hover:text-primary-foreground transition-colors">Track Status</Link></li>
               <li><Link to="/authority" className="hover:text-primary-foreground transition-colors">Authority Portal</Link></li>
               <li><Link to="/faq" className="hover:text-primary-foreground transition-colors">FAQs</Link></li>
             </ul>
           </div>
           
           <div>
             <h4 className="font-semibold mb-4">Resources</h4>
             <ul className="space-y-2 text-sm text-primary-foreground/70">
               <li><a href="#" className="hover:text-primary-foreground transition-colors">How It Works</a></li>
               <li><a href="#" className="hover:text-primary-foreground transition-colors">Guidelines</a></li>
               <li><a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a></li>
               <li><a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a></li>
             </ul>
           </div>
         </div>
         
         <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
           <p>© 2025 CivicResolve. Built for Design Thinking SIH25031.</p>
           <p className="mt-1">Empowering citizens, enabling governance.</p>
         </div>
       </div>
     </footer>
   );
 }