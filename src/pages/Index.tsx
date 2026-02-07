import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { IssueCard } from '@/components/IssueCard';
import { useIssues } from '@/context/IssuesContext';
import { motion } from 'framer-motion';
import { 
  MapPin, Camera, Bell, ArrowRight, Shield
} from 'lucide-react';

const features = [
  {
    icon: Camera,
    title: 'Easy Reporting',
    description: 'Snap a photo, describe the issue, and submit. GPS auto-detects your location.',
  },
  {
    icon: MapPin,
    title: 'Location Tracking',
    description: 'Issues are mapped for better visualization and faster response by authorities.',
  },
  {
    icon: Bell,
    title: 'Real-time Updates',
    description: 'Get notified when your complaint status changes from reported to resolved.',
  },
  {
    icon: Shield,
    title: 'Transparent Process',
    description: 'Track every step of the resolution process with complete transparency.',
  },
];

const howItWorks = [
  { step: 1, title: 'Report', description: 'Capture and submit civic issues with photos and location' },
  { step: 2, title: 'Track', description: 'Monitor real-time status updates on your complaints' },
  { step: 3, title: 'Resolve', description: 'Authorities address issues and mark them resolved' },
];
 
const Index = () => {
  const { issues } = useIssues();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative gradient-hero text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        <div className="container relative px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Empowering Citizens, Enabling Governance
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                Report Civic Issues,
                <br />
                <span className="text-accent">Get Them Resolved</span>
              </h1>
              
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl">
                A transparent, centralized platform for citizens to report civic problems 
                like garbage, potholes, water leakage, and more — and track them until resolution.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/citizen">
                  <Button className="btn-hero text-base">
                    Report an Issue
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/track">
                  <Button variant="outline" className="btn-hero-outline text-base">
                    Track Your Complaints
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
       
       {/* How It Works */}
       <section className="py-20 bg-background">
         <div className="container px-4">
           <div className="text-center mb-16">
             <h2 className="section-title mb-4">How It Works</h2>
             <p className="section-subtitle mx-auto">
               Three simple steps to make your city better
             </p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
             {howItWorks.map((item, i) => (
               <motion.div
                 key={item.step}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.4, delay: i * 0.1 }}
                 className="text-center"
               >
                 <div className="w-16 h-16 rounded-2xl gradient-hero text-primary-foreground text-2xl font-display font-bold flex items-center justify-center mx-auto mb-4">
                   {item.step}
                 </div>
                 <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                 <p className="text-muted-foreground">{item.description}</p>
               </motion.div>
             ))}
           </div>
         </div>
       </section>
       
       {/* Features */}
       <section className="py-20 bg-secondary/50">
         <div className="container px-4">
           <div className="text-center mb-16">
             <h2 className="section-title mb-4">Why CivicResolve?</h2>
             <p className="section-subtitle mx-auto">
               Built with citizens in mind, designed for efficient governance
             </p>
           </div>
           
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
             {features.map((feature, i) => (
               <motion.div
                 key={feature.title}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.4, delay: i * 0.1 }}
                 className="bg-card p-6 rounded-2xl border border-border hover:shadow-card-hover transition-all duration-300"
               >
                 <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                   <feature.icon className="w-6 h-6 text-primary" />
                 </div>
                 <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                 <p className="text-sm text-muted-foreground">{feature.description}</p>
               </motion.div>
             ))}
           </div>
         </div>
       </section>
       
        {/* Recent Issues - Only show if there are issues */}
        {issues.length > 0 && (
          <section className="py-20 bg-background">
            <div className="container px-4">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <h2 className="section-title mb-2">Recent Issues</h2>
                  <p className="text-muted-foreground">Latest reports from citizens in your area</p>
                </div>
                <Link to="/track">
                  <Button variant="outline" className="hidden sm:flex gap-2">
                    View All
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {issues.slice(0, 3).map((issue) => (
                  <IssueCard key={issue.id} issue={issue} />
                ))}
              </div>
              
              <div className="text-center mt-8 sm:hidden">
                <Link to="/track">
                  <Button variant="outline" className="gap-2">
                    View All Issues
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}
       
       {/* CTA Section */}
       <section className="py-20 gradient-hero text-primary-foreground">
         <div className="container px-4 text-center">
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
           >
             <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
               Be the Change in Your Community
             </h2>
             <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
               Join thousands of citizens who are making their neighborhoods better, 
               one report at a time.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Link to="/citizen">
                 <Button className="btn-hero text-base">
                   Start Reporting Now
                 </Button>
               </Link>
               <Link to="/auth">
                 <Button variant="outline" className="btn-hero-outline text-base">
                   Create Account
                 </Button>
               </Link>
             </div>
           </motion.div>
         </div>
       </section>
       
       <Footer />
     </div>
   );
 };
 
 export default Index;
