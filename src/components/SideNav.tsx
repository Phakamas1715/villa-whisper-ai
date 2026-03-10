import { Calendar, Home, ClipboardList, Building2, Bell, Users, Shield, Globe, Zap, BarChart3 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

interface SideNavProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  revenue: number;
  pendingAlerts: number;
}

const SideNav = ({ activeSection, onSectionChange, revenue, pendingAlerts }: SideNavProps) => {
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { id: 'timeline', icon: Home, label: t('nav.timeline') },
    { id: 'analytics', icon: BarChart3, label: t('nav.analytics') },
    { id: 'calendar', icon: Calendar, label: t('nav.calendar') },
    { id: 'properties', icon: Building2, label: t('nav.properties') },
    { id: 'tasks', icon: ClipboardList, label: t('nav.tasks') },
    { id: 'community', icon: Users, label: t('nav.community') },
    { id: 'regulatory', icon: Shield, label: t('nav.regulatory') },
  ];

  const toggleLang = () => setLanguage(language === 'th' ? 'en' : 'th');

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col items-center w-[72px] bg-sidebar py-5 gap-1 fixed left-0 top-0 h-full z-30">
        <Link to="/" className="mb-6 group">
          <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center font-display font-extrabold text-accent-foreground text-sm tracking-tight transition-transform group-hover:scale-110 shadow-md">
            <Zap size={20} />
          </div>
        </Link>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`nav-icon-btn relative group ${activeSection === item.id ? 'active' : ''}`}
              title={item.label}
            >
              <item.icon size={20} strokeWidth={activeSection === item.id ? 2.5 : 1.8} />
              {/* Tooltip */}
              <span className="absolute left-full ml-3 px-2.5 py-1 rounded-lg bg-foreground text-background text-[11px] font-display font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg z-50">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-2 items-center">
          <div className="text-center px-1 py-2 rounded-lg bg-sidebar-accent/50">
            <div className="text-[8px] text-sidebar-foreground/40 font-display uppercase tracking-widest">{t('nav.revenue')}</div>
            <div className="text-[11px] font-display font-bold text-accent">฿{(revenue / 1000).toFixed(0)}k</div>
          </div>

          <button
            onClick={toggleLang}
            className="nav-icon-btn group relative"
            title={language === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}
          >
            <Globe size={18} strokeWidth={1.8} />
            <span className="absolute -bottom-0.5 -right-0.5 text-[7px] font-display font-bold text-accent bg-sidebar-accent rounded px-0.5">
              {t('lang.switch')}
            </span>
          </button>

          <div className="relative">
            <button className="nav-icon-btn" title={t('nav.alerts')}>
              <Bell size={20} strokeWidth={1.8} />
            </button>
            {pendingAlerts > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-destructive text-destructive-foreground text-[9px] font-display font-bold flex items-center justify-center animate-pulse">
                {pendingAlerts}
              </span>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-sidebar/95 backdrop-blur-xl flex justify-around items-center h-16 z-30 border-t border-sidebar-border pb-safe">
        {navItems.slice(0, 5).map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 transition-colors ${
              activeSection === item.id ? 'text-accent' : 'text-sidebar-foreground/50'
            }`}
          >
            <item.icon size={20} strokeWidth={activeSection === item.id ? 2.5 : 1.8} />
            <span className="text-[9px] font-display font-medium">{item.label}</span>
          </button>
        ))}

        <button
          onClick={toggleLang}
          className="flex flex-col items-center gap-0.5 py-1 px-2 text-sidebar-foreground/50"
        >
          <Globe size={20} strokeWidth={1.8} />
          <span className="text-[9px] font-display font-medium">{language === 'th' ? 'EN' : 'TH'}</span>
        </button>

        <div className="relative">
          <button className="flex flex-col items-center gap-0.5 py-1 px-2 text-sidebar-foreground/50">
            <Bell size={20} strokeWidth={1.8} />
            <span className="text-[9px] font-display font-medium">{t('nav.alerts')}</span>
          </button>
          {pendingAlerts > 0 && (
            <span className="absolute top-0 right-0.5 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[9px] font-display font-bold flex items-center justify-center">
              {pendingAlerts}
            </span>
          )}
        </div>
      </nav>
    </>
  );
};

export default SideNav;
