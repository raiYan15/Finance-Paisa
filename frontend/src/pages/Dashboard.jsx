import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import StatusBadge from '../components/StatusBadge';
import DocumentUpload from '../components/DocumentUpload';
import { applicationAPI, userAPI, uploadAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FiFileText, FiUser, FiUpload, FiArrowRight, FiClock, FiCheck, FiX, FiAlertCircle } from 'react-icons/fi';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';

const formatCurrency = (n) => n ? `₹${n.toLocaleString('en-IN')}` : '—';
const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

const statusIcons = {
  pending: FiClock,
  under_review: FiAlertCircle,
  approved: FiCheck,
  rejected: FiX,
  disbursed: RiMoneyDollarCircleLine,
};

export default function Dashboard() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('applications');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [appsRes, docsRes] = await Promise.all([
        applicationAPI.getAll(),
        uploadAPI.getMyDocuments(),
      ]);
      setApplications(appsRes.data?.data || []);
      setDocuments(docsRes.data?.data || []);
    } catch {
      setApplications([]);
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: 'Total Applications', value: applications.length, icon: FiFileText, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Approved', value: applications.filter(a => a.status === 'approved').length, icon: FiCheck, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20' },
    { label: 'Pending', value: applications.filter(a => a.status === 'pending').length, icon: FiClock, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    { label: 'Documents', value: documents.length, icon: FiUpload, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  ];

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: 'var(--bg-color)' }}>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-700" style={{ color: 'var(--text-primary)' }}>
              Welcome back, <span className="text-blue-600 dark:text-blue-400">{user?.name?.split(' ')[0]}!</span>
            </h1>
            <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>Here's your financial overview</p>
          </div>
          <Link to="/apply" className="btn-primary px-6 py-3 rounded-none flex items-center gap-2 text-sm font-600 focus-visible:ring-4 focus-visible:ring-blue-200 dark:focus-visible:ring-blue-900/40">
            <FiFileText /> Apply for Loan
          </Link>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="card hover:-translate-y-1">
              <div className={`w-10 h-10 rounded-none ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={stat.color} />
              </div>
              <div className="text-2xl font-700" style={{ color: 'var(--text-primary)' }}>{stat.value}</div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'applications', label: 'My Applications', icon: FiFileText },
            { id: 'profile', label: 'Profile', icon: FiUser },
            { id: 'documents', label: 'Documents', icon: FiUpload },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-none text-sm font-500 transition-all duration-200 border-b-2 ${
                activeTab === tab.id ? 'bg-gradient-primary text-white border-blue-700 dark:border-blue-300 shadow-md' : 'text-gray-600 dark:text-gray-400 border-transparent'
              }`}
              style={activeTab === tab.id ? undefined : { backgroundColor: 'var(--card-color)', border: '1px solid var(--border-color)' }}
            >
              <tab.icon className="text-sm" /> {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'applications' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => <div key={i} className="h-24 rounded-2xl shimmer" />)}
              </div>
            ) : applications.length === 0 ? (
              <div className="card text-center py-16">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-lg font-700 mb-2" style={{ color: 'var(--text-primary)' }}>No Applications Yet</h3>
                <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>Apply for your first loan to get started</p>
                <Link to="/apply" className="btn-primary px-6 py-3 rounded-none inline-flex items-center gap-2">
                  Apply Now <FiArrowRight />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map((app, i) => {
                  const StatusIcon = statusIcons[app.status] || FiClock;
                  return (
                    <motion.div key={app._id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                      className="card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-none bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                          <StatusIcon className="text-blue-600 dark:text-blue-400 text-lg" />
                        </div>
                        <div>
                          <div className="font-700 capitalize" style={{ color: 'var(--text-primary)' }}>
                            {app.loanRequirements?.loanType} Loan
                          </div>
                          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>#{app.applicationNumber}</div>
                          <div className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{formatDate(app.createdAt)}</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="text-right">
                          <div className="font-700" style={{ color: 'var(--text-primary)' }}>{formatCurrency(app.loanRequirements?.loanAmount)}</div>
                          <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>Score: {app.eligibilityScore}/100</div>
                        </div>
                        <StatusBadge status={app.status} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'profile' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card max-w-2xl">
            <h3 className="font-700 text-lg mb-6" style={{ color: 'var(--text-primary)' }}>Profile Information</h3>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-none bg-blue-600 flex items-center justify-center text-white text-2xl font-700">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-700 text-xl" style={{ color: 'var(--text-primary)' }}>{user?.name}</div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{user?.email}</div>
                <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Verified
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Full Name', value: user?.name },
                { label: 'Email', value: user?.email },
                { label: 'Phone', value: user?.phone },
                { label: 'Account Type', value: user?.role === 'admin' ? 'Administrator' : 'Customer' },
              ].map(item => (
                <div key={item.label} className="rounded-none p-4" style={{ backgroundColor: 'color-mix(in srgb, var(--card-color) 85%, var(--bg-color) 15%)', border: '1px solid var(--border-color)' }}>
                  <div className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>{item.label}</div>
                  <div className="font-600 capitalize" style={{ color: 'var(--text-primary)' }}>{item.value || '—'}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'documents' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="font-700 mb-4" style={{ color: 'var(--text-primary)' }}>Upload Document</h3>
              <DocumentUpload onUpload={() => loadData()} />
            </div>
            <div className="card">
              <h3 className="font-700 mb-4" style={{ color: 'var(--text-primary)' }}>Uploaded Documents ({documents.length})</h3>
              {documents.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <FiUpload className="text-4xl mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No documents uploaded yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {documents.map(doc => (
                    <div key={doc._id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5">
                      <FiFileText className="text-primary-500 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{doc.originalName}</div>
                        <div className="text-xs text-gray-400 capitalize">{doc.documentType} • {formatDate(doc.createdAt)}</div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${doc.status === 'verified' ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-gray-400'}`}>
                        {doc.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
