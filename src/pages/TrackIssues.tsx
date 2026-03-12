import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useIssuesContext } from '@/hooks/useIssues';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CATEGORY_LABELS, CATEGORY_ICONS, IssueCategory, IssueStatus, STATUS_LABELS } from '@/types/issue';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, List, LayoutGrid, Loader2, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TrackIssues = () => {
  const { issues, isLoading } = useIssuesContext();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (issue.address?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    
    const matchesCategory = categoryFilter === 'all' || issue.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const statusCounts = {
    all: issues.length,
    reported: issues.filter(i => i.status === 'reported').length,
    in_progress: issues.filter(i => i.status === 'in_progress').length,
    resolved: issues.filter(i => i.status === 'resolved').length,
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* User Info Bar */}
          <div className="flex items-center justify-between mb-6 p-4 bg-card rounded-xl border border-border">
            <div>
              <p className="text-sm text-muted-foreground">Logged in as</p>
              <p className="font-medium text-foreground">{user?.email}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              Track Your Issues
            </h1>
            <p className="text-muted-foreground">
              Monitor the status of your reported civic issues
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
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredIssues.length > 0 ? (
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
                  className="bg-card rounded-xl border border-border p-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{CATEGORY_ICONS[issue.category as IssueCategory]}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground line-clamp-1">{issue.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{issue.description}</p>
                      <div className="flex items-center gap-2 mt-3 flex-wrap">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          issue.status === 'resolved' ? 'bg-green-100 text-green-700' :
                          issue.status === 'in_progress' ? 'bg-amber-100 text-amber-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {STATUS_LABELS[issue.status as IssueStatus]}
                        </span>
                        {issue.address && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {issue.address.length > 30 ? issue.address.slice(0, 30) + '...' : issue.address}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
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
                {issues.length === 0 
                  ? "You haven't reported any issues yet. Go to Report Issue to submit your first complaint."
                  : "Try adjusting your search or filter criteria"
                }
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
