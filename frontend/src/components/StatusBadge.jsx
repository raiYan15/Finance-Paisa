const statusConfig = {
  pending: { label: 'Pending', color: 'badge-pending', dot: 'bg-yellow-400' },
  under_review: { label: 'Under Review', color: 'badge-under_review', dot: 'bg-blue-400' },
  approved: { label: 'Approved', color: 'badge-approved', dot: 'bg-green-400' },
  rejected: { label: 'Rejected', color: 'badge-rejected', dot: 'bg-red-400' },
  disbursed: { label: 'Disbursed', color: 'badge-disbursed', dot: 'bg-purple-400' },
};

export default function StatusBadge({ status, size = 'sm' }) {
  const config = statusConfig[status] || statusConfig.pending;
  const sizeClass = size === 'lg' ? 'text-sm' : size === 'xs' ? 'text-[10px]' : 'text-xs';
  return (
    <span className={`${config.color} ${sizeClass}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse`} />
      {config.label}
    </span>
  );
}
