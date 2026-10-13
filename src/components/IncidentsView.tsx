import React, { useState } from 'react';
import { 
  Flame, 
  Search, 
  Plus, 
  Filter, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Eye, 
  ShieldAlert,
  ChevronDown
} from 'lucide-react';
import { Language } from '../types';

interface IncidentsViewProps {
  lang: Language;
}

export const IncidentsView: React.FC<IncidentsViewProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'ALL' | 'High' | 'Medium' | 'Low'>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Investigating' | 'Containment' | 'Resolved' | 'Closed'>('ALL');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSeverity, setNewSeverity] = useState<'High' | 'Medium' | 'Low'>('High');

  const [incidents, setIncidents] = useState([
    {
      id: 'INC-001',
      title: 'Suspicious Login Attempt',
      severity: 'High',
      status: 'Investigating',
      date: 'Apr 28, 2025',
      owner: 'SOC Analyst'
    },
    {
      id: 'INC-002',
      title: 'Malware Detected',
      severity: 'Medium',
      status: 'Containment',
      date: 'Apr 25, 2025',
      owner: 'Endpoint Team'
    },
    {
      id: 'INC-003',
      title: 'Data Exfiltration Attempt',
      severity: 'High',
      status: 'Resolved',
      date: 'Apr 20, 2025',
      owner: 'Network Security'
    },
    {
      id: 'INC-004',
      title: 'Phishing Email Reported',
      severity: 'Low',
      status: 'Closed',
      date: 'Apr 15, 2025',
      owner: 'Security Awareness'
    },
    {
      id: 'INC-005',
      title: 'Unauthorized Access',
      severity: 'Medium',
      status: 'Resolved',
      date: 'Apr 10, 2025',
      owner: 'Identity & Access'
    }
  ]);

  const handleAddIncident = () => {
    if (!newTitle.trim()) return;
    const newInc = {
      id: `INC-00${incidents.length + 1}`,
      title: newTitle.trim(),
      severity: newSeverity,
      status: 'Investigating',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      owner: 'SOC Enclave'
    };
    setIncidents([newInc, ...incidents]);
    setNewTitle('');
    setIsReportModalOpen(false);
  };

  const filteredIncidents = incidents.filter(inc => {
    const matchesSearch = inc.title.toLowerCase().includes(searchQuery.toLowerCase()) || inc.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = severityFilter === 'ALL' || inc.severity === severityFilter;
    const matchesStatus = statusFilter === 'ALL' || inc.status === statusFilter;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header Card matching collage */}
      <div className="rounded-2xl p-6 bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-[#18264C] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-500" />
              <span className="text-xs font-black text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-md border border-rose-500/30">
                {isAr ? 'الاستجابة الأمنية للحوادث' : 'Security Incident Response'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-2">
              {isAr ? 'إدارة الحوادث السيبرانية' : 'Incident Management'}
            </h1>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
              {isAr ? 'تتبع والاستجابة للحوادث الأمنية باحتواء فوري وتوثيق تشفيري.' : 'Track and respond to security incidents.'}
            </p>
          </div>

          <button
            onClick={() => setIsReportModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center gap-2 shadow-md shadow-blue-600/25 transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>{isAr ? 'إبلاغ عن حادث أمني' : 'Report Incident'}</span>
          </button>
        </div>

        {/* Filter Controls Row matching collage */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-[#18264C] flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Left: Filters */}
          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value as any)}
              className="text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 dark:border-[#1A264D] bg-slate-50 dark:bg-[#0D1836] text-slate-700 dark:text-slate-200 outline-hidden"
            >
              <option value="ALL">All Severity</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 dark:border-[#1A264D] bg-slate-50 dark:bg-[#0D1836] text-slate-700 dark:text-slate-200 outline-hidden"
            >
              <option value="ALL">All Status</option>
              <option value="Investigating">Investigating</option>
              <option value="Containment">Containment</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Right: Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className={`w-3.5 h-3.5 text-slate-400 absolute top-1/2 -translate-y-1/2 ${isAr ? 'right-3' : 'left-3'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'بحث في الحوادث...' : 'Search incidents...'}
              className={`w-full text-xs font-semibold rounded-xl bg-slate-50 dark:bg-[#0D1836] border border-slate-200 dark:border-[#1A264D] text-slate-900 dark:text-white py-2 outline-hidden ${isAr ? 'pr-9 pl-3' : 'pl-9 pr-3'}`}
            />
          </div>

        </div>
      </div>

      {/* Incidents Table matching collage */}
      <div className="rounded-2xl p-6 bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-[#18264C] shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-[#18264C] text-[10px] font-black uppercase text-slate-400">
                <th className="pb-3">ID</th>
                <th className="pb-3">Title</th>
                <th className="pb-3">Severity</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Date</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#18264C] font-semibold text-slate-700 dark:text-slate-300">
              {filteredIncidents.map((inc) => (
                <tr key={inc.id} className="hover:bg-slate-50 dark:hover:bg-[#0D1836] transition-colors">
                  <td className="py-3.5 font-mono text-slate-400">{inc.id}</td>
                  <td className="py-3.5 font-bold text-slate-900 dark:text-white">{inc.title}</td>
                  <td className="py-3.5">
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black ${
                      inc.severity === 'High' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' :
                      inc.severity === 'Medium' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                      'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                    }`}>
                      {inc.severity}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      inc.status === 'Investigating' ? 'bg-rose-500/10 text-rose-500' :
                      inc.status === 'Containment' ? 'bg-amber-500/10 text-amber-500' :
                      inc.status === 'Resolved' ? 'bg-blue-500/10 text-blue-500' :
                      'bg-slate-100 dark:bg-slate-800 text-slate-400'
                    }`}>
                      {inc.status}
                    </span>
                  </td>
                  <td className="py-3.5 font-mono text-slate-400">{inc.date}</td>
                  <td className="py-3.5 text-right">
                    <button className="text-blue-600 dark:text-cyan-400 font-bold hover:underline">
                      View →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination matching collage */}
        <div className="pt-4 mt-4 border-t border-slate-100 dark:border-[#18264C] flex items-center justify-between text-xs text-slate-400 font-semibold">
          <span>Showing 1-5 of {incidents.length} incidents</span>
          <div className="flex items-center gap-1 font-mono text-[11px]">
            <button className="px-2 py-1 rounded bg-blue-600 text-white font-bold">1</button>
            <button className="px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800">2</button>
            <button className="px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800">3</button>
            <button className="px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800">&gt;</button>
          </div>
        </div>
      </div>

      {/* Report Incident Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-[#18264C] p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              {isAr ? 'الإبلاغ عن حادث أمني جديد' : 'Report Security Incident'}
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Incident Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Distributed Denial of Service Probe..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0D1836] text-slate-900 dark:text-white outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Severity</label>
                <select
                  value={newSeverity}
                  onChange={(e) => setNewSeverity(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0D1836] text-slate-900 dark:text-white outline-hidden font-bold"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleAddIncident}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
              >
                Submit Incident
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
