import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import StatusBadge from '../components/StatusBadge';
import { adminAPI } from '../services/api';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { FiUsers, FiFileText, FiCheck, FiX, FiClock, FiSearch, FiFilter } from 'react-icons/fi';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import toast from 'react-hot-toast';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const PIE_COLORS = ['#2563EB','#3B82F6','#60A5FA','#93C5FD','#BFDBFE','#1D4ED8','#0EA5E9'];

const formatCurrency = (n) => n ? `₹${(n/100000).toFixed(1)}L` : '—';
const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day:'2-digit', month:'short' }) : '—';

export default function AdminPanel() {
  const [dashData, setDashData] = useState(null);
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [processing, setProcessing] = useState(null);

  useEffect(() => { loadAll(); }, []);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [dashRes, appsRes, usersRes] = await Promise.all([
        adminAPI.getDashboard(),
        adminAPI.getApplications({ limit: 50 }),
        adminAPI.getUsers({ limit: 50 }),
      ]);
      setDashData(dashRes.data?.data);
      setApplications(appsRes.data?.data || []);
      setUsers(usersRes.data?.data || []);
    } catch (err) {
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (appId, newStatus, notes = '') => {
    setProcessing(appId);
    try {
      await adminAPI.updateApplication(appId, { status: newStatus, adminNotes: notes });
      toast.success(`Application ${newStatus} successfully!`);
      setApplications(prev => prev.map(a => a._id === appId ? { ...a, status: newStatus } : a));
    } catch {
      toast.error('Failed to update application');
    } finally {
      setProcessing(null);
    }
  };

  const stats = dashData?.stats || {};
  const statCards = [
    { label: 'Total Users', value: stats.totalUsers || 0, icon: FiUsers, color: 'text-primary-500', bg: 'bg-primary-50 dark:bg-primary-500/10' },
    { label: 'Total Applications', value: stats.totalApplications || 0, icon: FiFileText, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Approved', value: stats.approvedApps || 0, icon: FiCheck, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
    { label: 'Pending Review', value: stats.pendingApps || 0, icon: FiClock, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
  ];

  // Prepare chart data
  const monthlyChartData = dashData?.monthlyData?.map(d => ({
    month: MONTHS[(d._id.month - 1)],
    applications: d.count,
    amount: d.totalAmount / 100000, // in lakhs
  })) || [];

  const pieData = dashData?.loanTypeData?.map(d => ({
    name: d._id?.charAt(0).toUpperCase() + d._id?.slice(1) || 'Other',
    value: d.count,
  })) || [];

  const filteredApps = applications.filter(a => {
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    const matchSearch = !searchQuery || a.personalDetails?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) || a.applicationNumber?.includes(searchQuery);
    return matchStatus && matchSearch;
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiFileText },
    { id: 'applications', label: `Applications (${applications.length})`, icon: FiFileText },
    { id: 'users', label: `Users (${users.length})`, icon: FiUsers },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-900 transition-colors duration-300">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              <span className="text-blue-600 dark:text-blue-400">Admin</span> Panel
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage Finance Paisa platform</p>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="card">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={stat.color} />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{loading ? '—' : stat.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-none text-sm font-500 whitespace-nowrap transition-all duration-200 ${
                activeTab === tab.id ? 'bg-gradient-primary text-white shadow-glow' : 'bg-white dark:bg-navy-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'
              }`}>
              <tab.icon className="text-sm" /> {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly applications chart */}
            <div className="card">
              <h3 className="font-bold text-gray-900 dark:text-white mb-6">Monthly Applications</h3>
              {loading ? <div className="h-48 shimmer rounded-xl" /> : monthlyChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={monthlyChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }} labelStyle={{ color: '#f1f5f9' }} />
                    <Bar dataKey="applications" fill="#2563EB" radius={[0, 0, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-48 flex items-center justify-center text-gray-400 text-sm">No data yet</div>
              )}
            </div>

            {/* Loan type distribution */}
            <div className="card">
              <h3 className="font-bold text-gray-900 dark:text-white mb-6">Loan Type Distribution</h3>
              {loading ? <div className="h-48 shimmer rounded-xl" /> : pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                      {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-48 flex items-center justify-center text-gray-400 text-sm">No data yet</div>
              )}
            </div>

            {/* Recent activity */}
            <div className="card lg:col-span-2">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Recent Applications</h3>
              <div className="space-y-3">
                {applications.slice(0, 5).map(app => (
                  <div key={app._id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/5">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white text-sm">{app.personalDetails?.fullName}</div>
                      <div className="text-xs text-gray-500">#{app.applicationNumber} · {formatCurrency(app.loanRequirements?.loanAmount)} · {app.loanRequirements?.loanType}</div>
                    </div>
                    <StatusBadge status={app.status} />
                  </div>
                ))}
                {applications.length === 0 && <div className="text-center py-8 text-gray-400 text-sm">No applications yet</div>}
              </div>
            </div>
          </motion.div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center mb-6">
              <div className="relative flex-1 min-w-48">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search name or Application #..." className="input-field pl-9 text-sm" />
              </div>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="input-field w-44 text-sm">
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="disbursed">Disbursed</option>
              </select>
            </div>

            {loading ? (
              <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-20 shimmer rounded-2xl" />)}</div>
            ) : (
              <div className="space-y-3">
                {filteredApps.map(app => (
                  <div key={app._id} className="card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 shrink-0 rounded-none bg-blue-600 flex items-center justify-center text-white text-xs font-700">
                        {app.personalDetails?.fullName?.charAt(0) || 'U'}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-gray-900 dark:text-white text-sm truncate">{app.personalDetails?.fullName}</div>
                        <div className="text-xs text-gray-500">#{app.applicationNumber} · {formatDate(app.createdAt)}</div>
                        <div className="text-xs text-gray-400 capitalize">{app.loanRequirements?.loanType} · {formatCurrency(app.loanRequirements?.loanAmount)}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="text-right mr-2">
                        <div className="text-xs text-gray-400">Score</div>
                        <div className={`text-sm font-bold ${app.eligibilityScore >= 70 ? 'text-emerald-500' : app.eligibilityScore >= 50 ? 'text-amber-500' : 'text-red-500'}`}>{app.eligibilityScore}/100</div>
                      </div>
                      <StatusBadge status={app.status} />
                      {app.status === 'pending' && (
                        <>
                          <button onClick={() => handleStatusUpdate(app._id, 'under_review')} disabled={processing === app._id}
                            className="text-xs px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-200 dark:hover:bg-blue-500/20 transition-colors disabled:opacity-50">
                            Review
                          </button>
                        </>
                      )}
                      {(app.status === 'pending' || app.status === 'under_review') && (
                        <>
                          <button onClick={() => handleStatusUpdate(app._id, 'approved')} disabled={processing === app._id}
                            className="text-xs px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold hover:bg-emerald-200 transition-colors disabled:opacity-50">
                            <FiCheck className="inline mr-1" />Approve
                          </button>
                          <button onClick={() => handleStatusUpdate(app._id, 'rejected', 'Does not meet eligibility criteria')} disabled={processing === app._id}
                            className="text-xs px-3 py-1.5 rounded-lg bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 font-semibold hover:bg-red-200 transition-colors disabled:opacity-50">
                            <FiX className="inline mr-1" />Reject
                          </button>
                        </>
                      )}
                      {app.status === 'approved' && (
                        <button onClick={() => handleStatusUpdate(app._id, 'disbursed')} disabled={processing === app._id}
                          className="text-xs px-3 py-1.5 rounded-lg bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold hover:bg-purple-200 transition-colors disabled:opacity-50">
                          <RiMoneyDollarCircleLine className="inline mr-1" />Disburse
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {filteredApps.length === 0 && (
                  <div className="text-center py-12 text-gray-400">
                    <FiFileText className="text-4xl mx-auto mb-3 opacity-50" />
                    <p>No applications found</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card overflow-x-auto">
            <h3 className="font-bold text-gray-900 dark:text-white mb-6">All Registered Users</h3>
            {loading ? (
              <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-12 shimmer rounded-xl" />)}</div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-white/5">
                    <th className="pb-3 font-medium">User</th>
                    <th className="pb-3 font-medium hidden md:table-cell">Phone</th>
                    <th className="pb-3 font-medium hidden lg:table-cell">Joined</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                  {users.map(u => (
                    <tr key={u._id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-none bg-blue-600 flex items-center justify-center text-white text-xs font-700 shrink-0">
                            {u.name?.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">{u.name}</div>
                            <div className="text-xs text-gray-400">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-gray-600 dark:text-gray-400 hidden md:table-cell">{u.phone}</td>
                      <td className="py-3 text-gray-500 hidden lg:table-cell">{formatDate(u.createdAt)}</td>
                      <td className="py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${u.isVerified ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-gray-100 dark:bg-white/5 text-gray-500'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${u.isVerified ? 'bg-emerald-400' : 'bg-gray-400'}`} />
                          {u.isVerified ? 'Verified' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
