import heroBg from '@/assets/hero-bg.jpg';
import { dashboardStats } from '@/data/mockData';
import { TrendingUp, Home, ShieldCheck, MessageCircle, ClipboardList, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection = () => {
  const { t } = useLanguage();

  const stats = [
    { label: t('stats.revenue'), value: `฿${(dashboardStats.revenue / 1000).toFixed(0)}k`, sub: `+${dashboardStats.revenueChange}%`, icon: TrendingUp, positive: true },
    { label: t('stats.occupancy'), value: `${dashboardStats.occupancy}%`, sub: `+${dashboardStats.occupancyChange}%`, icon: Home, positive: true },
    { label: t('stats.overbooking'), value: '0', sub: t('stats.zero'), icon: ShieldCheck, positive: true },
    { label: t('stats.ai_response'), value: `${dashboardStats.aiResponseRate}%`, sub: t('stats.auto'), icon: Zap, positive: true },
    { label: t('stats.tasks'), value: `${dashboardStats.activeTasks}`, sub: t('stats.active'), icon: ClipboardList, positive: false },
    { label: t('stats.inquiries'), value: `${dashboardStats.pendingInquiries}`, sub: t('stats.pending'), icon: MessageCircle, positive: false },
  ];

  return (
    <div className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative rounded-2xl overflow-hidden mb-6"
      >
        <img src={heroBg} alt="VillaFlow" className="w-full h-48 md:h-56 object-cover" />
        <div className="absolute inset-0 hero-overlay flex flex-col justify-end p-6">
          <h1 className="font-display font-extrabold text-2xl md:text-3xl text-primary-foreground leading-tight">
            {t('app.title')}
          </h1>
          <p className="font-body text-sm text-primary-foreground/80 mt-1">{t('app.tagline')}</p>
          <div className="flex items-center gap-3 mt-3">
            <span className="badge-accent">AI Powered</span>
            <span className="font-display text-xs text-primary-foreground/60">
              {t('app.properties_count')} · {new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="stat-card text-center"
          >
            <stat.icon size={16} className={`mx-auto mb-1.5 ${stat.positive ? 'text-accent' : 'text-muted-foreground'}`} />
            <div className="font-display text-xl font-bold text-foreground leading-none">{stat.value}</div>
            <div className="font-display text-[10px] text-muted-foreground mt-1">{stat.label}</div>
            <div className={`font-display text-[10px] font-semibold mt-0.5 ${stat.positive ? 'text-accent' : 'text-muted-foreground'}`}>{stat.sub}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
