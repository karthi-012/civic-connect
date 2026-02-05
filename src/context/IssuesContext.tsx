 import { createContext, useContext, useState, ReactNode } from 'react';
 import { Issue, IssueCategory, IssuePriority } from '@/types/issue';
 import { mockIssues } from '@/data/mockIssues';
 
 interface NewIssueData {
   title: string;
   description: string;
   category: IssueCategory;
   priority: IssuePriority;
   address: string;
   imageUrl?: string;
   lat?: number;
   lng?: number;
   reportedBy: string;
 }
 
 interface IssuesContextType {
   issues: Issue[];
   addIssue: (data: NewIssueData) => Issue;
   updateIssueStatus: (id: string, status: Issue['status'], assignedTo?: string) => void;
   getIssueById: (id: string) => Issue | undefined;
   getUserIssues: (userName: string) => Issue[];
 }
 
 const IssuesContext = createContext<IssuesContextType | undefined>(undefined);
 
 export function IssuesProvider({ children }: { children: ReactNode }) {
   const [issues, setIssues] = useState<Issue[]>(mockIssues);
 
   const addIssue = (data: NewIssueData): Issue => {
     const newIssue: Issue = {
       id: `user-${Date.now()}`,
       title: data.title,
       description: data.description,
       category: data.category,
       status: 'reported',
       priority: data.priority,
       location: {
         address: data.address,
         lat: data.lat || 28.6139,
         lng: data.lng || 77.2090,
       },
       imageUrl: data.imageUrl,
       reportedBy: data.reportedBy,
       reportedAt: new Date(),
       upvotes: 0,
     };
 
     setIssues(prev => [newIssue, ...prev]);
     return newIssue;
   };
 
   const updateIssueStatus = (id: string, status: Issue['status'], assignedTo?: string) => {
     setIssues(prev => prev.map(issue => {
       if (issue.id === id) {
         return {
           ...issue,
           status,
           assignedTo: assignedTo || issue.assignedTo,
           resolvedAt: status === 'resolved' ? new Date() : issue.resolvedAt,
         };
       }
       return issue;
     }));
   };
 
   const getIssueById = (id: string) => issues.find(issue => issue.id === id);
 
   const getUserIssues = (userName: string) => 
     issues.filter(issue => issue.reportedBy === userName);
 
   return (
     <IssuesContext.Provider value={{ issues, addIssue, updateIssueStatus, getIssueById, getUserIssues }}>
       {children}
     </IssuesContext.Provider>
   );
 }
 
 export function useIssues() {
   const context = useContext(IssuesContext);
   if (context === undefined) {
     throw new Error('useIssues must be used within an IssuesProvider');
   }
   return context;
 }