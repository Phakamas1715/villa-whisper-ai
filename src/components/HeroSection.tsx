import villaAerial from '@/assets/villa-aerial.jpg';
import villaInterior from '@/assets/villa-interior.jpg';
import villaPoolNight from '@/assets/villa-pool-night.jpg';
import { dashboardStats, galleryImages } from '@/data/mockData';
import { TrendingUp, Home, ShieldCheck, MessageCircle, ClipboardList, Zap, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

const HeroSection = () => {
  const { t } = useLanguage();
  const [activeImg, setActiveImg] = useState(0);

  const heroImages = [villaAerial, villaPoolNight, villaInterior];

  const stats = [
    { label: t('stats.revenue'), value: `฿${(dashboardStats.revenue / 1000).toFixed(0)}k`, sub: `+${dashboardStats.revenueChange}%`, icon: TrendingUp, positive: true },
    { label: t('stats.occupancy'), value: `${dashboardStats.occupancy}%`, sub: `+${dashboardStats.occupancyChange}%`, icon: Home, positive: true },
    { label: t('stats.overbooking'), value: '0', sub: t('stats.zero'), icon: ShieldCheck, positive: true },
    { label: t('stats.ai_response'), value: `${dashboardStats.aiResponseRate}%`, sub: t('stats.auto'), icon: Zap, positive: true },
    { label: t('stats.tasks'), value: `${dashboardStats.activeTasks}`, sub: t('stats.active'), icon: ClipboardList, positive: false },
    { label: t('stats.inquiries'), value: `${dashboardStats.pendingInquiries}`, sub: t('stats.pending'), icon: MessageCircle, positive: false },
  ];

  return (
    <div className="mb-8 space-y-5">
      {/* Main hero with image carousel */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative rounded-2xl overflow-hidden"
      >
        <div className="relative h-56 md:h-64">
          {heroImages.map((img, i) => (
            <motion.img
              key={i}
              src={img}
              alt="VillaFlow"
              className="absolute inset-0 w-full h-full object-cover"
              initial={false}
              animate={{ opacity: activeImg === i ? 1 : 0 }}
              transition={{ duration: 0.8 }}
            />
          ))}
          <div className="absolute inset-0 hero-overlay" />
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="badge-accent shadow-sm">AI Powered</span>
              <span className="badge-accent shadow-sm">Zero-Phone</span>
            </div>
            <h1 className="font-display font-extrabold text-2xl md:text-3xl text-primary-foreground leading-tight">
              {t('app.title')}
            </h1>
            <p className="font-body text-sm text-primary-foreground/80 mt-1 max-w-md">{t('app.tagline')}</p>
            <div className="flex items-center gap-2 mt-3">
              <span className="font-display text-xs text-primary-foreground/60">
                {t('app.properties_count')} · {new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
          </div>

          {/* Image dots */}
          <div className="absolute bottom-4 right-4 flex gap-1.5">
            {heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-2 h-2 rounded-full transition-all ${activeImg === i ? 'bg-accent w-5' : 'bg-primary-foreground/40 hover:bg-primary-foreground/60'}`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Gallery thumbnails strip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
      >
        {galleryImages.map((img, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0 w-20 h-14 rounded-xl overflow-hidden cursor-pointer ring-2 ring-transparent hover:ring-accent/50 transition-all"
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </motion.div>
        ))}
        <div className="flex-shrink-0 w-20 h-14 rounded-xl bg-muted flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
          <span className="text-xs text-muted-foreground font-display font-semibold flex items-center gap-0.5">
            +12 <ChevronRight size={12} />
          </span>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + idx * 0.05 }}
            className="stat-card text-center group hover:ring-1 hover:ring-accent/20"
          >
            <stat.icon size={16} className={`mx-auto mb-1.5 transition-transform group-hover:scale-110 ${stat.positive ? 'text-accent' : 'text-muted-foreground'}`} />
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
