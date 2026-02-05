 import { useState } from 'react';
 import { Header } from '@/components/Header';
 import { Footer } from '@/components/Footer';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Textarea } from '@/components/ui/textarea';
 import { Label } from '@/components/ui/label';
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
 import { CATEGORY_LABELS, CATEGORY_ICONS, IssueCategory, IssuePriority, PRIORITY_LABELS } from '@/types/issue';
 import { motion } from 'framer-motion';
 import { Camera, MapPin, Upload, CheckCircle, AlertCircle, Loader2, Eye } from 'lucide-react';
 import { toast } from 'sonner';
 import { useIssues } from '@/context/IssuesContext';
 import { Link, useNavigate } from 'react-router-dom';
 
 const CitizenDashboard = () => {
   const { addIssue, getUserIssues } = useIssues();
   const navigate = useNavigate();
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [imagePreview, setImagePreview] = useState<string | null>(null);
   const [formData, setFormData] = useState({
     title: '',
     description: '',
     category: '' as IssueCategory | '',
     priority: 'medium' as IssuePriority,
     address: '',
   });
   const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
   const [locationLoading, setLocationLoading] = useState(false);
 
   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0];
     if (file) {
       const reader = new FileReader();
       reader.onloadend = () => {
         setImagePreview(reader.result as string);
       };
       reader.readAsDataURL(file);
     }
   };
 
   const getLocation = () => {
     setLocationLoading(true);
     if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(
         (position) => {
           setLocation({
             lat: position.coords.latitude,
             lng: position.coords.longitude,
           });
           setLocationLoading(false);
           toast.success('Location captured successfully!');
         },
         (error) => {
           setLocationLoading(false);
           toast.error('Unable to get location. Please enter address manually.');
         }
       );
     } else {
       setLocationLoading(false);
       toast.error('Geolocation is not supported by your browser.');
     }
   };
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     
     if (!formData.category) {
       toast.error('Please select a category');
       return;
     }
     
     if (!formData.title || !formData.description) {
       toast.error('Please fill in all required fields');
       return;
     }
 
     setIsSubmitting(true);

     // Simulate short delay
     await new Promise(resolve => setTimeout(resolve, 1000));

     // Add issue to global state
     const newIssue = addIssue({
       title: formData.title,
       description: formData.description,
       category: formData.category as IssueCategory,
       priority: formData.priority,
       address: formData.address || 'Location not specified',
       imageUrl: imagePreview || undefined,
       lat: location?.lat,
       lng: location?.lng,
       reportedBy: 'Current User', // This would come from auth in a real app
     });

     toast.success('Issue reported successfully! Track your complaint in the Track Issues page.', {
       action: {
         label: 'View Reports',
         onClick: () => navigate('/track'),
       },
     });
     setIsSubmitting(false);
     
     // Reset form
     setFormData({
       title: '',
       description: '',
       category: '',
       priority: 'medium',
       address: '',
     });
     setImagePreview(null);
     setLocation(null);
   };
 
   return (
     <div className="min-h-screen flex flex-col bg-background">
       <Header />
       
       <main className="flex-1 container px-4 py-8">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="max-w-2xl mx-auto"
         >
           <div className="text-center mb-8">
             <h1 className="text-3xl font-display font-bold text-foreground mb-2">
               Report a Civic Issue
             </h1>
             <p className="text-muted-foreground">
               Help improve your community by reporting problems that need attention
             </p>
           </div>
           
           <form onSubmit={handleSubmit} className="space-y-6">
             {/* Image Upload */}
             <div className="space-y-2">
               <Label>Photo Evidence</Label>
               <div 
                 className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-muted/30"
                 onClick={() => document.getElementById('image-upload')?.click()}
               >
                 {imagePreview ? (
                   <div className="relative">
                     <img 
                       src={imagePreview} 
                       alt="Preview" 
                       className="max-h-48 mx-auto rounded-lg object-cover"
                     />
                     <button
                       type="button"
                       onClick={(e) => {
                         e.stopPropagation();
                         setImagePreview(null);
                       }}
                       className="absolute top-2 right-2 w-8 h-8 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                     >
                       ×
                     </button>
                   </div>
                 ) : (
                   <div className="flex flex-col items-center gap-3">
                     <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                       <Camera className="w-8 h-8 text-primary" />
                     </div>
                     <div>
                       <p className="font-medium text-foreground">Click to upload photo</p>
                       <p className="text-sm text-muted-foreground">or drag and drop</p>
                     </div>
                   </div>
                 )}
                 <input
                   id="image-upload"
                   type="file"
                   accept="image/*"
                   className="hidden"
                   onChange={handleImageChange}
                 />
               </div>
             </div>
             
             {/* Category Selection */}
             <div className="space-y-2">
               <Label htmlFor="category">Issue Category *</Label>
               <Select
                 value={formData.category}
                 onValueChange={(value: IssueCategory) => 
                   setFormData(prev => ({ ...prev, category: value }))
                 }
               >
                 <SelectTrigger className="input-civic">
                   <SelectValue placeholder="Select category" />
                 </SelectTrigger>
                 <SelectContent>
                   {(Object.keys(CATEGORY_LABELS) as IssueCategory[]).map(cat => (
                     <SelectItem key={cat} value={cat}>
                       <span className="flex items-center gap-2">
                         <span>{CATEGORY_ICONS[cat]}</span>
                         <span>{CATEGORY_LABELS[cat]}</span>
                       </span>
                     </SelectItem>
                   ))}
                 </SelectContent>
               </Select>
             </div>
             
             {/* Title */}
             <div className="space-y-2">
               <Label htmlFor="title">Issue Title *</Label>
               <Input
                 id="title"
                 placeholder="e.g., Overflowing garbage bin on Main Street"
                 className="input-civic"
                 value={formData.title}
                 onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
               />
             </div>
             
             {/* Description */}
             <div className="space-y-2">
               <Label htmlFor="description">Description *</Label>
               <Textarea
                 id="description"
                 placeholder="Describe the issue in detail. Include how long it has been a problem and any other relevant information."
                 className="input-civic min-h-[120px]"
                 value={formData.description}
                 onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
               />
             </div>
             
             {/* Priority */}
             <div className="space-y-2">
               <Label htmlFor="priority">Priority Level</Label>
               <Select
                 value={formData.priority}
                 onValueChange={(value: IssuePriority) => 
                   setFormData(prev => ({ ...prev, priority: value }))
                 }
               >
                 <SelectTrigger className="input-civic">
                   <SelectValue placeholder="Select priority" />
                 </SelectTrigger>
                 <SelectContent>
                   {(Object.keys(PRIORITY_LABELS) as IssuePriority[]).map(priority => (
                     <SelectItem key={priority} value={priority}>
                       {PRIORITY_LABELS[priority]}
                     </SelectItem>
                   ))}
                 </SelectContent>
               </Select>
             </div>
             
             {/* Location */}
             <div className="space-y-2">
               <Label>Location</Label>
               <div className="flex gap-3">
                 <Input
                   placeholder="Enter address or area"
                   className="input-civic flex-1"
                   value={formData.address}
                   onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                 />
                 <Button
                   type="button"
                   variant="outline"
                   className="flex-shrink-0"
                   onClick={getLocation}
                   disabled={locationLoading}
                 >
                   {locationLoading ? (
                     <Loader2 className="w-5 h-5 animate-spin" />
                   ) : (
                     <MapPin className="w-5 h-5" />
                   )}
                 </Button>
               </div>
               {location && (
                 <p className="text-sm text-muted-foreground flex items-center gap-1">
                   <CheckCircle className="w-4 h-4 text-primary" />
                   GPS location captured: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                 </p>
               )}
             </div>
             
             {/* Submit Button */}
             <Button
               type="submit"
               className="w-full py-6 text-base gradient-hero"
               disabled={isSubmitting}
             >
               {isSubmitting ? (
                 <>
                   <Loader2 className="w-5 h-5 animate-spin mr-2" />
                   Submitting...
                 </>
               ) : (
                 <>
                   <Upload className="w-5 h-5 mr-2" />
                   Submit Report
                 </>
               )}
             </Button>
           </form>
           
           {/* Tips Section */}
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.3 }}
             className="mt-8 p-6 bg-secondary/50 rounded-xl"
           >
             <h3 className="font-semibold flex items-center gap-2 mb-3">
               <AlertCircle className="w-5 h-5 text-primary" />
               Tips for Effective Reporting
             </h3>
             <ul className="space-y-2 text-sm text-muted-foreground">
               <li>• Take clear photos that show the issue properly</li>
               <li>• Provide accurate location details for faster resolution</li>
               <li>• Be specific in your description about the problem</li>
               <li>• Check if the issue has already been reported to avoid duplicates</li>
             </ul>
           </motion.div>

             {/* My Recent Reports */}
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.4 }}
               className="mt-6 p-6 bg-card rounded-xl border border-border"
             >
               <div className="flex items-center justify-between mb-4">
                 <h3 className="font-semibold text-foreground">Your Recent Reports</h3>
                 <Link to="/track">
                   <Button variant="ghost" size="sm" className="gap-1">
                     <Eye className="w-4 h-4" />
                     View All
                   </Button>
                 </Link>
               </div>
               {getUserIssues('Current User').length > 0 ? (
                 <div className="space-y-3">
                   {getUserIssues('Current User').slice(0, 3).map(issue => (
                     <div key={issue.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                       <div className="flex items-center gap-3">
                         <span className="text-lg">{CATEGORY_ICONS[issue.category]}</span>
                         <div>
                           <p className="font-medium text-sm">{issue.title}</p>
                           <p className="text-xs text-muted-foreground">{issue.location.address}</p>
                         </div>
                       </div>
                       <span className={`text-xs px-2 py-1 rounded-full ${
                         issue.status === 'resolved' ? 'bg-green-100 text-green-700' :
                         issue.status === 'in_progress' ? 'bg-amber-100 text-amber-700' :
                         'bg-blue-100 text-blue-700'
                       }`}>
                         {issue.status === 'in_progress' ? 'In Progress' : 
                          issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                       </span>
                     </div>
                   ))}
                 </div>
               ) : (
                 <p className="text-sm text-muted-foreground text-center py-4">
                   No reports yet. Submit your first civic issue above!
                 </p>
               )}
             </motion.div>
         </motion.div>
       </main>
       
       <Footer />
     </div>
   );
 };
 
 export default CitizenDashboard;