 import { useState } from 'react';
 import { Header } from '@/components/Header';
 import { Footer } from '@/components/Footer';
 import { StatCard } from '@/components/StatCard';
 import { IssueCard } from '@/components/IssueCard';
 import { StatusBadge } from '@/components/StatusBadge';
 import { PriorityBadge } from '@/components/PriorityBadge';
 import { mockIssues } from '@/data/mockIssues';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
 import { 
   CATEGORY_LABELS, STATUS_LABELS, IssueCategory, IssueStatus, Issue, CATEGORY_ICONS
 } from '@/types/issue';
 import { motion, AnimatePresence } from 'framer-motion';
 import { 
   FileText, Clock, CheckCircle, AlertTriangle, Search, Filter, 
   TrendingUp, Users, MapPin, Calendar, X, UserPlus
 } from 'lucide-react';
 import { formatDistanceToNow, format } from 'date-fns';
 import { toast } from 'sonner';
 
 const AuthorityDashboard = () => {
   const [searchQuery, setSearchQuery] = useState('');
   const [categoryFilter, setCategoryFilter] = useState<string>('all');
   const [statusFilter, setStatusFilter] = useState<string>('all');
   const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
 
   const stats = [
     { 
       icon: FileText, 
       label: 'Total Issues', 
       value: mockIssues.length,
       change: '+12 this week',
       changeType: 'neutral' as const
     },
     { 
       icon: AlertTriangle, 
       label: 'Pending', 
       value: mockIssues.filter(i => i.status === 'reported').length,
       change: '-3 from yesterday',
       changeType: 'positive' as const
     },
     { 
       icon: Clock, 
       label: 'In Progress', 
       value: mockIssues.filter(i => i.status === 'in_progress').length,
       change: '+5 assigned today',
       changeType: 'neutral' as const
     },
     { 
       icon: CheckCircle, 
       label: 'Resolved', 
       value: mockIssues.filter(i => i.status === 'resolved').length,
       change: '83% resolution rate',
       changeType: 'positive' as const
     },
   ];
 
   const filteredIssues = mockIssues.filter(issue => {
     const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       issue.location.address.toLowerCase().includes(searchQuery.toLowerCase());
     const matchesCategory = categoryFilter === 'all' || issue.category === categoryFilter;
     const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
     return matchesSearch && matchesCategory && matchesStatus;
   });
 
   const handleStatusChange = (issueId: string, newStatus: IssueStatus) => {
     toast.success(`Issue status updated to "${STATUS_LABELS[newStatus]}"`);
     setSelectedIssue(null);
   };
 
   const handleAssign = (issueId: string) => {
     toast.success('Issue assigned to field worker');
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
               Authority Dashboard
             </h1>
             <p className="text-muted-foreground">
               Manage and resolve civic issues reported by citizens
             </p>
           </div>
           
           {/* Stats Grid */}
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
             {stats.map((stat, i) => (
               <StatCard key={stat.label} {...stat} delay={i * 0.1} />
             ))}
           </div>
           
           {/* Filters */}
           <div className="flex flex-col sm:flex-row gap-4 mb-6">
             <div className="relative flex-1">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
               <Input
                 placeholder="Search by title or location..."
                 className="pl-10 input-civic"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
             </div>
             
             <Select value={categoryFilter} onValueChange={setCategoryFilter}>
               <SelectTrigger className="w-full sm:w-48 input-civic">
                 <SelectValue placeholder="Category" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="all">All Categories</SelectItem>
                 {(Object.keys(CATEGORY_LABELS) as IssueCategory[]).map(cat => (
                   <SelectItem key={cat} value={cat}>{CATEGORY_LABELS[cat]}</SelectItem>
                 ))}
               </SelectContent>
             </Select>
             
             <Select value={statusFilter} onValueChange={setStatusFilter}>
               <SelectTrigger className="w-full sm:w-40 input-civic">
                 <SelectValue placeholder="Status" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="all">All Status</SelectItem>
                 {(Object.keys(STATUS_LABELS) as IssueStatus[]).map(status => (
                   <SelectItem key={status} value={status}>{STATUS_LABELS[status]}</SelectItem>
                 ))}
               </SelectContent>
             </Select>
           </div>
           
           {/* Issues Table */}
           <div className="bg-card rounded-xl border border-border overflow-hidden">
             <div className="overflow-x-auto">
               <table className="w-full">
                 <thead>
                   <tr className="border-b border-border bg-muted/50">
                     <th className="text-left p-4 font-semibold text-sm text-muted-foreground">Issue</th>
                     <th className="text-left p-4 font-semibold text-sm text-muted-foreground hidden md:table-cell">Location</th>
                     <th className="text-left p-4 font-semibold text-sm text-muted-foreground">Status</th>
                     <th className="text-left p-4 font-semibold text-sm text-muted-foreground hidden lg:table-cell">Priority</th>
                     <th className="text-left p-4 font-semibold text-sm text-muted-foreground hidden lg:table-cell">Reported</th>
                     <th className="text-right p-4 font-semibold text-sm text-muted-foreground">Actions</th>
                   </tr>
                 </thead>
                 <tbody>
                   {filteredIssues.map((issue, i) => (
                     <motion.tr
                       key={issue.id}
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ delay: i * 0.03 }}
                       className="border-b border-border hover:bg-muted/30 transition-colors cursor-pointer"
                       onClick={() => setSelectedIssue(issue)}
                     >
                       <td className="p-4">
                         <div className="flex items-center gap-3">
                           <span className="text-xl">{CATEGORY_ICONS[issue.category]}</span>
                           <div>
                             <p className="font-medium text-foreground line-clamp-1">{issue.title}</p>
                             <p className="text-sm text-muted-foreground">{CATEGORY_LABELS[issue.category]}</p>
                           </div>
                         </div>
                       </td>
                       <td className="p-4 hidden md:table-cell">
                         <span className="text-sm text-muted-foreground flex items-center gap-1">
                           <MapPin className="w-4 h-4" />
                           <span className="line-clamp-1">{issue.location.address}</span>
                         </span>
                       </td>
                       <td className="p-4">
                         <StatusBadge status={issue.status} size="sm" />
                       </td>
                       <td className="p-4 hidden lg:table-cell">
                         <PriorityBadge priority={issue.priority} />
                       </td>
                       <td className="p-4 hidden lg:table-cell">
                         <span className="text-sm text-muted-foreground">
                           {formatDistanceToNow(issue.reportedAt, { addSuffix: true })}
                         </span>
                       </td>
                       <td className="p-4 text-right">
                         <Button 
                           size="sm" 
                           variant="outline"
                           onClick={(e) => {
                             e.stopPropagation();
                             setSelectedIssue(issue);
                           }}
                         >
                           View
                         </Button>
                       </td>
                     </motion.tr>
                   ))}
                 </tbody>
               </table>
             </div>
             
             {filteredIssues.length === 0 && (
               <div className="p-12 text-center">
                 <p className="text-muted-foreground">No issues match your criteria</p>
               </div>
             )}
           </div>
         </motion.div>
       </main>
       
       {/* Issue Detail Modal */}
       <AnimatePresence>
         {selectedIssue && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
             onClick={() => setSelectedIssue(null)}
           >
             <motion.div
               initial={{ scale: 0.95, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.95, opacity: 0 }}
               className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
               onClick={(e) => e.stopPropagation()}
             >
               <div className="p-6 border-b border-border flex items-start justify-between">
                 <div>
                   <div className="flex items-center gap-2 mb-2">
                     <span className="text-2xl">{CATEGORY_ICONS[selectedIssue.category]}</span>
                     <span className="text-sm font-medium text-muted-foreground uppercase">
                       {CATEGORY_LABELS[selectedIssue.category]}
                     </span>
                   </div>
                   <h2 className="text-xl font-display font-bold">{selectedIssue.title}</h2>
                 </div>
                 <button
                   onClick={() => setSelectedIssue(null)}
                   className="p-2 rounded-full hover:bg-muted transition-colors"
                 >
                   <X className="w-5 h-5" />
                 </button>
               </div>
               
               <div className="p-6 space-y-6">
                 {selectedIssue.imageUrl && (
                   <img 
                     src={selectedIssue.imageUrl} 
                     alt={selectedIssue.title}
                     className="w-full h-48 object-cover rounded-xl"
                   />
                 )}
                 
                 <div>
                   <h4 className="text-sm font-medium text-muted-foreground mb-2">Description</h4>
                   <p className="text-foreground">{selectedIssue.description}</p>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <h4 className="text-sm font-medium text-muted-foreground mb-2">Status</h4>
                     <StatusBadge status={selectedIssue.status} />
                   </div>
                   <div>
                     <h4 className="text-sm font-medium text-muted-foreground mb-2">Priority</h4>
                     <PriorityBadge priority={selectedIssue.priority} />
                   </div>
                   <div>
                     <h4 className="text-sm font-medium text-muted-foreground mb-2">Location</h4>
                     <p className="text-sm flex items-center gap-1">
                       <MapPin className="w-4 h-4" />
                       {selectedIssue.location.address}
                     </p>
                   </div>
                   <div>
                     <h4 className="text-sm font-medium text-muted-foreground mb-2">Reported</h4>
                     <p className="text-sm flex items-center gap-1">
                       <Calendar className="w-4 h-4" />
                       {format(selectedIssue.reportedAt, 'PPp')}
                     </p>
                   </div>
                 </div>
                 
                 {selectedIssue.assignedTo && (
                   <div>
                     <h4 className="text-sm font-medium text-muted-foreground mb-2">Assigned To</h4>
                     <p className="text-sm flex items-center gap-1">
                       <Users className="w-4 h-4" />
                       {selectedIssue.assignedTo}
                     </p>
                   </div>
                 )}
                 
                 <div className="pt-4 border-t border-border">
                   <h4 className="text-sm font-medium text-muted-foreground mb-3">Update Status</h4>
                   <div className="flex flex-wrap gap-2">
                     {(['reported', 'in_progress', 'resolved'] as IssueStatus[]).map(status => (
                       <Button
                         key={status}
                         variant={selectedIssue.status === status ? 'default' : 'outline'}
                         size="sm"
                         onClick={() => handleStatusChange(selectedIssue.id, status)}
                       >
                         {STATUS_LABELS[status]}
                       </Button>
                     ))}
                   </div>
                 </div>
                 
                 {!selectedIssue.assignedTo && selectedIssue.status !== 'resolved' && (
                   <Button 
                     className="w-full gap-2"
                     onClick={() => handleAssign(selectedIssue.id)}
                   >
                     <UserPlus className="w-4 h-4" />
                     Assign to Field Worker
                   </Button>
                 )}
               </div>
             </motion.div>
           </motion.div>
         )}
       </AnimatePresence>
       
       <Footer />
     </div>
   );
 };
 
 export default AuthorityDashboard;