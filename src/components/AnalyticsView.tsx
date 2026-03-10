import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, Calendar, DollarSign, Home, Users } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';

const dailyRevenue = [
  { day: '1', revenue: 9500, bookings: 1 },
  { day: '2', revenue: 0, bookings: 0 },
  { day: '3', revenue: 9000, bookings: 1 },
  { day: '4', revenue: 18500, bookings: 2 },
  { day: '5', revenue: 12000, bookings: 1 },
  { day: '6', revenue: 0, bookings: 0 },
  { day: '7', revenue: 14000, bookings: 1 },
  { day: '8', revenue: 21000, bookings: 2 },
  { day: '9', revenue: 9500, bookings: 1 },
  { day: '10', revenue: 47500, bookings: 3 },
];

const monthlyRevenue = [
  { month: 'Oct', revenue: 185000, occupancy: 62 },
  { month: 'Nov', revenue: 210000, occupancy: 71 },
  { month: 'Dec', revenue: 320000, occupancy: 89 },
  { month: 'Jan', revenue: 295000, occupancy: 84 },
  { month: 'Feb', revenue: 230000, occupancy: 73 },
  { month: 'Mar', revenue: 247500, occupancy: 78 },
];

const occupancyByProperty = [
  { name: 'Seaview', occupancy: 82 },
  { name: 'Sunset', occupancy: 71 },
  { name: 'Hillside', occupancy: 65 },
  { name: 'Beachfront', occupancy: 88 },
  { name: 'Pool Night', occupancy: 75 },
];

const seasonalData = [
  { period: 'Jan', demand: 85, price: 11000 },
  { period: 'Feb', demand: 72, price: 9500 },
  { period: 'Mar', demand: 78, price: 9500 },
  { period: 'Apr', demand: 92, price: 12500 },
  { period: 'May', demand: 55, price: 7500 },
  { period: 'Jun', demand: 48, price: 6800 },
  { period: 'Jul', demand: 65, price: 8000 },
  { period: 'Aug', demand: 60, price: 7500 },
  { period: 'Sep', demand: 50, price: 7000 },
  { period: 'Oct', demand: 68, price: 8500 },
  { period: 'Nov', demand: 75, price: 9000 },
  { period: 'Dec', demand: 95, price: 14000 },
];

const sourceData = [
  { name: 'Airbnb', value: 42, color: 'hsl(6, 72%, 55%)' },
  { name: 'Booking.com', value: 28, color: 'hsl(200, 65%, 48%)' },
  { name: 'Direct/LINE', value: 20, color: 'hsl(152, 56%, 45%)' },
  { name: 'Other', value: 10, color: 'hsl(38, 80%, 58%)' },
];

const AnalyticsView = () => {
  const { t } = useLanguage();

  const summaryStats = [
    { label: t('analytics.total_revenue'), value: '฿247,500', sub: '+18.5%', icon: DollarSign, positive: true },
    { label: t('analytics.avg_occupancy'), value: '78%', sub: '+12%', icon: Home, positive: true },
    { label: t('analytics.total_bookings'), value: '18', sub: t('analytics.this_month'), icon: Calendar, positive: true },
    { label: t('analytics.avg_rate'), value: '฿10,200', sub: t('analytics.per_night'), icon: TrendingUp, positive: true },
  ];

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <BarChart3 size={22} className="text-accent" />
        <h2 className="font-display font-bold text-xl text-foreground">{t('analytics.title')}</h2>
      </div>
      <p className="font-body text-sm text-muted-foreground mb-5">{t('analytics.subtitle')}</p>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {summaryStats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.06 }}
            className="stat-card text-center group hover:ring-1 hover:ring-accent/20"
          >
            <stat.icon size={20} className="mx-auto mb-2 text-accent transition-transform group-hover:scale-110" />
            <div className="font-display text-2xl font-bold text-foreground leading-none">{stat.value}</div>
            <div className="font-display text-xs text-muted-foreground mt-1.5">{stat.label}</div>
            <div className={`font-display text-xs font-semibold mt-0.5 ${stat.positive ? 'text-accent' : 'text-muted-foreground'}`}>{stat.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Daily Revenue Chart */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display text-base font-bold text-foreground">{t('analytics.daily_revenue')}</h3>
            <p className="font-display text-xs text-muted-foreground">{t('analytics.march_2026')}</p>
          </div>
          <span className="badge-accent">+18.5%</span>
        </div>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyRevenue}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(152, 56%, 45%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(152, 56%, 45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 16%, 90%)" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: 'hsl(210, 10%, 50%)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: 'hsl(210, 10%, 50%)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: 'hsl(0, 0%, 100%)', border: '1px solid hsl(210, 16%, 90%)', borderRadius: '12px', fontSize: '13px', fontFamily: 'Plus Jakarta Sans' }}
                formatter={(value: number) => [`฿${value.toLocaleString()}`, t('analytics.revenue')]}
              />
              <Area type="monotone" dataKey="revenue" stroke="hsl(152, 56%, 45%)" strokeWidth={2.5} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Monthly Revenue + Occupancy */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display text-base font-bold text-foreground">{t('analytics.monthly_overview')}</h3>
            <p className="font-display text-xs text-muted-foreground">{t('analytics.revenue_and_occupancy')}</p>
          </div>
        </div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 16%, 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'hsl(210, 10%, 50%)' }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="rev" tick={{ fontSize: 12, fill: 'hsl(210, 10%, 50%)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
              <YAxis yAxisId="occ" orientation="right" tick={{ fontSize: 12, fill: 'hsl(200, 65%, 48%)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip
                contentStyle={{ backgroundColor: 'hsl(0, 0%, 100%)', border: '1px solid hsl(210, 16%, 90%)', borderRadius: '12px', fontSize: '13px', fontFamily: 'Plus Jakarta Sans' }}
                formatter={(value: number, name: string) => {
                  if (name === 'revenue') return [`฿${value.toLocaleString()}`, t('analytics.revenue')];
                  return [`${value}%`, t('analytics.occupancy')];
                }}
              />
              <Bar yAxisId="rev" dataKey="revenue" fill="hsl(152, 56%, 45%)" radius={[6, 6, 0, 0]} opacity={0.85} />
              <Line yAxisId="occ" type="monotone" dataKey="occupancy" stroke="hsl(200, 65%, 48%)" strokeWidth={2.5} dot={{ r: 4, fill: 'hsl(200, 65%, 48%)' }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-5 mt-3 justify-center">
          <div className="flex items-center gap-1.5"><div className="w-3.5 h-3.5 rounded-sm bg-accent" /><span className="font-display text-xs text-muted-foreground">{t('analytics.revenue')}</span></div>
          <div className="flex items-center gap-1.5"><div className="w-3.5 h-3.5 rounded-full bg-villa-ocean" /><span className="font-display text-xs text-muted-foreground">{t('analytics.occupancy')}</span></div>
        </div>
      </motion.div>

      {/* Two column: Occupancy by Property + Source Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass-card p-5">
          <h3 className="font-display text-base font-bold text-foreground mb-4">{t('analytics.occupancy_by_property')}</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={occupancyByProperty} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 16%, 90%)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 12, fill: 'hsl(210, 10%, 50%)' }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fill: 'hsl(210, 10%, 50%)' }} axisLine={false} tickLine={false} width={80} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(0, 0%, 100%)', border: '1px solid hsl(210, 16%, 90%)', borderRadius: '12px', fontSize: '13px' }} formatter={(v: number) => [`${v}%`, t('analytics.occupancy')]} />
                <Bar dataKey="occupancy" fill="hsl(152, 56%, 45%)" radius={[0, 6, 6, 0]} opacity={0.85} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-5">
          <h3 className="font-display text-base font-bold text-foreground mb-4">{t('analytics.booking_sources')}</h3>
          <div className="h-48 flex items-center">
            <div className="w-1/2">
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie data={sourceData} cx="50%" cy="50%" innerRadius={38} outerRadius={60} dataKey="value" strokeWidth={2} stroke="hsl(0, 0%, 100%)">
                    {sourceData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 space-y-3">
              {sourceData.map((s) => (
                <div key={s.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                  <span className="font-display text-sm text-foreground flex-1">{s.name}</span>
                  <span className="font-display text-sm font-bold text-foreground">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Seasonal Demand + Price Trend */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display text-base font-bold text-foreground">{t('analytics.seasonal_trends')}</h3>
            <p className="font-display text-xs text-muted-foreground">{t('analytics.demand_vs_price')}</p>
          </div>
          <Users size={18} className="text-muted-foreground" />
        </div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={seasonalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 16%, 90%)" />
              <XAxis dataKey="period" tick={{ fontSize: 12, fill: 'hsl(210, 10%, 50%)' }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="demand" tick={{ fontSize: 12, fill: 'hsl(152, 56%, 45%)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <YAxis yAxisId="price" orientation="right" tick={{ fontSize: 12, fill: 'hsl(38, 80%, 58%)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: 'hsl(0, 0%, 100%)', border: '1px solid hsl(210, 16%, 90%)', borderRadius: '12px', fontSize: '13px', fontFamily: 'Plus Jakarta Sans' }}
                formatter={(value: number, name: string) => {
                  if (name === 'demand') return [`${value}%`, t('analytics.demand')];
                  return [`฿${value.toLocaleString()}`, t('analytics.avg_price')];
                }}
              />
              <Line yAxisId="demand" type="monotone" dataKey="demand" stroke="hsl(152, 56%, 45%)" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line yAxisId="price" type="monotone" dataKey="price" stroke="hsl(38, 80%, 58%)" strokeWidth={2.5} dot={{ r: 4 }} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-5 mt-3 justify-center">
          <div className="flex items-center gap-1.5"><div className="w-4 h-0.5 bg-accent rounded" /><span className="font-display text-xs text-muted-foreground">{t('analytics.demand')}</span></div>
          <div className="flex items-center gap-1.5"><div className="w-4 h-0.5 bg-villa-gold rounded" style={{ borderStyle: 'dashed' }} /><span className="font-display text-xs text-muted-foreground">{t('analytics.avg_price')}</span></div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsView;
