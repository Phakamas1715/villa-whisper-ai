import { TrendingUp, Home, Users, ClipboardList, AlertTriangle, MessageCircle } from 'lucide-react';
import { dashboardStats } from '@/data/mockData';

const StatsHeader = () => {
  const stats = [
    {
      label: 'Revenue',
      value: `฿${(dashboardStats.revenue / 1000).toFixed(0)}k`,
      change: `+${dashboardStats.revenueChange}%`,
      positive: true,
      icon: TrendingUp,
    },
    {
      label: 'Occupancy',
      value: `${dashboardStats.occupancy}%`,
      change: `+${dashboardStats.occupancyChange}%`,
      positive: true,
      icon: Home,
    },
    {
      label: 'Overbooking',
      value: `${dashboardStats.overbooking}`,
      change: 'Zero!',
      positive: true,
      icon: AlertTriangle,
    },
    {
      label: 'AI Response',
      value: `${dashboardStats.aiResponseRate}%`,
      change: 'Auto',
      positive: true,
      icon: MessageCircle,
    },
    {
      label: 'Tasks',
      value: `${dashboardStats.activeTasks}`,
      change: 'Active',
      positive: false,
      icon: ClipboardList,
    },
    {
      label: 'Inquiries',
      value: `${dashboardStats.pendingInquiries}`,
      change: 'Pending',
      positive: false,
      icon: Users,
    },
  ];

  return (
    <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="timeline-card flex flex-col items-center justify-center py-3 px-2 text-center"
        >
          <stat.icon size={14} className="text-muted-foreground mb-1" />
          <span className="font-display text-lg font-bold text-foreground leading-none">
            {stat.value}
          </span>
          <span className="font-display text-[10px] text-muted-foreground mt-0.5">
            {stat.label}
          </span>
          <span
            className={`font-display text-[10px] font-medium mt-0.5 ${
              stat.positive ? 'text-accent' : 'text-muted-foreground'
            }`}
          >
            {stat.change}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StatsHeader;
