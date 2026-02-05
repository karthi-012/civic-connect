 import { useState } from 'react';
 import { Header } from '@/components/Header';
 import { Footer } from '@/components/Footer';
 import { IssueCard } from '@/components/IssueCard';
 import { mockIssues } from '@/data/mockIssues';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
 import { CATEGORY_LABELS, STATUS_LABELS, IssueCategory, IssueStatus } from '@/types/issue';
 import { motion } from 'framer-motion';
 import { Search, Filter, MapPin, List, LayoutGrid } from 'lucide-react';
 
 const TrackIssues = () => {
   const [searchQuery, setSearchQuery] = useState('');
   const [categoryFilter, setCategoryFilter] = useState<string>('all');
   const [statusFilter, setStatusFilter] = useState<string>('all');
   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
 
   const filteredIssues = mockIssues.filter(issue => {
     const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
       issue.location.address.toLowerCase().includes(searchQuery.toLowerCase());
     
     const matchesCategory = categoryFilter === 'all' || issue.category === categoryFilter;
     const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
     
     return matchesSearch && matchesCategory && matchesStatus;
   });
 
   const statusCounts = {
     all: mockIssues.length,
     reported: mockIssues.filter(i => i.status === 'reported').length,
     in_progress: mockIssues.filter(i => i.status === 'in_progress').length,
     resolved: mockIssues.filter(i => i.status === 'resolved').length,
   };
 
   return (
     <div className="min-h-screen flex flex-col bg-background">
       <Header />
       
       <main className="flex-1 container px-4 py-8">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
         >
           <div className="mb-8">
             <h1 className="text-3xl font-display font-bold text-foreground mb-2">
               Track Issues
             </h1>
             <p className="text-muted-foreground">
               Monitor the status of reported civic issues in your area
             </p>
           </div>
           
           {/* Status Tabs */}
           <div className="flex flex-wrap gap-2 mb-6">
             {(['all', 'reported', 'in_progress', 'resolved'] as const).map(status => (
               <button
                 key={status}
                 onClick={() => setStatusFilter(status)}
                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                   statusFilter === status 
                     ? 'bg-primary text-primary-foreground' 
                     : 'bg-muted text-muted-foreground hover:bg-muted/80'
                 }`}
               >
                 {status === 'all' ? 'All' : STATUS_LABELS[status as IssueStatus]}
                 <span className="ml-2 px-2 py-0.5 rounded-full bg-black/10 text-xs">
                   {statusCounts[status]}
                 </span>
               </button>
             ))}
           </div>
           
           {/* Filters */}
           <div className="flex flex-col sm:flex-row gap-4 mb-8">
             <div className="relative flex-1">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
               <Input
                 placeholder="Search issues by title, description, or location..."
                 className="pl-10 input-civic"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
             </div>
             
             <Select value={categoryFilter} onValueChange={setCategoryFilter}>
               <SelectTrigger className="w-full sm:w-48 input-civic">
                 <Filter className="w-4 h-4 mr-2" />
                 <SelectValue placeholder="Category" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="all">All Categories</SelectItem>
                 {(Object.keys(CATEGORY_LABELS) as IssueCategory[]).map(cat => (
                   <SelectItem key={cat} value={cat}>
                     {CATEGORY_LABELS[cat]}
                   </SelectItem>
                 ))}
               </SelectContent>
             </Select>
             
             <div className="flex gap-1 border border-border rounded-xl p-1">
               <button
                 onClick={() => setViewMode('grid')}
                 className={`p-2 rounded-lg transition-colors ${
                   viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
                 }`}
               >
                 <LayoutGrid className="w-5 h-5" />
               </button>
               <button
                 onClick={() => setViewMode('list')}
                 className={`p-2 rounded-lg transition-colors ${
                   viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
                 }`}
               >
                 <List className="w-5 h-5" />
               </button>
             </div>
           </div>
           
           {/* Results */}
           {filteredIssues.length > 0 ? (
             <div className={viewMode === 'grid' 
               ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
               : 'flex flex-col gap-4'
             }>
               {filteredIssues.map((issue, i) => (
                 <motion.div
                   key={issue.id}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.05 }}
                 >
                   <IssueCard issue={issue} />
                 </motion.div>
               ))}
             </div>
           ) : (
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="text-center py-16"
             >
               <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                 <MapPin className="w-10 h-10 text-muted-foreground" />
               </div>
               <h3 className="text-lg font-semibold text-foreground mb-2">No issues found</h3>
               <p className="text-muted-foreground">
                 Try adjusting your search or filter criteria
               </p>
             </motion.div>
           )}
         </motion.div>
       </main>
       
       <Footer />
     </div>
   );
 };
 
 export default TrackIssues;