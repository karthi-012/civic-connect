 import { useState } from 'react';
 import { Link, useNavigate } from 'react-router-dom';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Label } from '@/components/ui/label';
 import { motion } from 'framer-motion';
 import { Mail, Lock, User, ArrowRight, Eye, EyeOff, Building2 } from 'lucide-react';
 import { toast } from 'sonner';
 
 const Auth = () => {
   const [isLogin, setIsLogin] = useState(true);
   const [isCitizen, setIsCitizen] = useState(true);
   const [showPassword, setShowPassword] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const navigate = useNavigate();
 
   const [formData, setFormData] = useState({
     name: '',
     email: '',
     password: '',
   });
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setIsLoading(true);
     
     // Simulate API call
     await new Promise(resolve => setTimeout(resolve, 1500));
     
     toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');
     setIsLoading(false);
     navigate(isCitizen ? '/citizen' : '/authority');
   };
 
   return (
     <div className="min-h-screen flex">
       {/* Left Side - Form */}
       <div className="flex-1 flex items-center justify-center p-8">
         <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           className="w-full max-w-md"
         >
           <Link to="/" className="flex items-center gap-3 mb-8">
             <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
               <span className="text-xl">🏛️</span>
             </div>
             <span className="font-display font-bold text-lg text-foreground">
               CivicResolve
             </span>
           </Link>
           
           <h1 className="text-2xl font-display font-bold text-foreground mb-2">
             {isLogin ? 'Welcome back' : 'Create your account'}
           </h1>
           <p className="text-muted-foreground mb-8">
             {isLogin 
               ? 'Enter your credentials to access your account' 
               : 'Join thousands of citizens making their community better'
             }
           </p>
           
           {/* User Type Toggle */}
           <div className="flex gap-2 p-1 bg-muted rounded-xl mb-6">
             <button
               type="button"
               onClick={() => setIsCitizen(true)}
               className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                 isCitizen 
                   ? 'bg-card text-foreground shadow-sm' 
                   : 'text-muted-foreground hover:text-foreground'
               }`}
             >
               <User className="w-4 h-4" />
               Citizen
             </button>
             <button
               type="button"
               onClick={() => setIsCitizen(false)}
               className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                 !isCitizen 
                   ? 'bg-card text-foreground shadow-sm' 
                   : 'text-muted-foreground hover:text-foreground'
               }`}
             >
               <Building2 className="w-4 h-4" />
               Authority
             </button>
           </div>
           
           <form onSubmit={handleSubmit} className="space-y-4">
             {!isLogin && (
               <div className="space-y-2">
                 <Label htmlFor="name">Full Name</Label>
                 <div className="relative">
                   <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                   <Input
                     id="name"
                     type="text"
                     placeholder="Enter your full name"
                     className="pl-10 input-civic"
                     value={formData.name}
                     onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                     required={!isLogin}
                   />
                 </div>
               </div>
             )}
             
             <div className="space-y-2">
               <Label htmlFor="email">Email</Label>
               <div className="relative">
                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                 <Input
                   id="email"
                   type="email"
                   placeholder="Enter your email"
                   className="pl-10 input-civic"
                   value={formData.email}
                   onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                   required
                 />
               </div>
             </div>
             
             <div className="space-y-2">
               <Label htmlFor="password">Password</Label>
               <div className="relative">
                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                 <Input
                   id="password"
                   type={showPassword ? 'text' : 'password'}
                   placeholder="Enter your password"
                   className="pl-10 pr-10 input-civic"
                   value={formData.password}
                   onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                   required
                 />
                 <button
                   type="button"
                   onClick={() => setShowPassword(!showPassword)}
                   className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                 >
                   {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                 </button>
               </div>
             </div>
             
             {isLogin && (
               <div className="flex justify-end">
                 <a href="#" className="text-sm text-primary hover:underline">
                   Forgot password?
                 </a>
               </div>
             )}
             
             <Button
               type="submit"
               className="w-full py-6 text-base gradient-hero"
               disabled={isLoading}
             >
               {isLoading ? (
                 'Please wait...'
               ) : (
                 <>
                   {isLogin ? 'Sign In' : 'Create Account'}
                   <ArrowRight className="ml-2 w-5 h-5" />
                 </>
               )}
             </Button>
           </form>
           
           <p className="text-center text-sm text-muted-foreground mt-6">
             {isLogin ? "Don't have an account?" : 'Already have an account?'}
             <button
               type="button"
               onClick={() => setIsLogin(!isLogin)}
               className="ml-1 text-primary font-medium hover:underline"
             >
               {isLogin ? 'Sign up' : 'Sign in'}
             </button>
           </p>
         </motion.div>
       </div>
       
       {/* Right Side - Decorative */}
       <div className="hidden lg:flex flex-1 gradient-hero items-center justify-center p-12 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
         
         <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.2 }}
           className="text-center text-primary-foreground relative z-10"
         >
           <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-8">
             <span className="text-5xl">🏛️</span>
           </div>
           <h2 className="text-3xl font-display font-bold mb-4">
             Make Your City Better
           </h2>
           <p className="text-primary-foreground/80 max-w-md">
             Report civic issues, track resolutions, and contribute to 
             building a transparent and accountable governance system.
           </p>
           
           <div className="mt-12 grid grid-cols-3 gap-6 text-center">
             <div>
               <p className="text-3xl font-display font-bold">15K+</p>
               <p className="text-sm text-primary-foreground/70">Issues Reported</p>
             </div>
             <div>
               <p className="text-3xl font-display font-bold">83%</p>
               <p className="text-sm text-primary-foreground/70">Resolution Rate</p>
             </div>
             <div>
               <p className="text-3xl font-display font-bold">48h</p>
               <p className="text-sm text-primary-foreground/70">Avg Response</p>
             </div>
           </div>
         </motion.div>
       </div>
     </div>
   );
 };
 
 export default Auth;