import { Calendar, Home, ClipboardList, Building2, Bell, Users, Shield } from 'lucide-react';

interface SideNavProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  revenue: number;
  pendingAlerts: number;
}

const navItems = [
  { id: 'timeline', icon: Home, label: 'Timeline' },
  { id: 'calendar', icon: Calendar, label: 'Calendar' },
  { id: 'properties', icon: Building2, label: 'Properties' },
  { id: 'tasks', icon: ClipboardList, label: 'Tasks' },
  { id: 'community', icon: Users, label: 'Community' },
  { id: 'regulatory', icon: Shield, label: 'Regulatory' },
];

const SideNav = ({ activeSection, onSectionChange, revenue, pendingAlerts }: SideNavProps) => {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col items-center w-[68px] bg-sidebar py-6 gap-1 fixed left-0 top-0 h-full z-30">
        <div className="mb-8">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center font-display font-extrabold text-accent-foreground text-sm tracking-tight">
            VF
          </div>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`nav-icon-btn ${activeSection === item.id ? 'active' : ''}`}
              title={item.label}
            >
              <item.icon size={20} strokeWidth={activeSection === item.id ? 2.5 : 1.8} />
            </button>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-3 items-center">
          <div className="text-center px-1">
            <div className="text-[8px] text-sidebar-foreground/30 font-display uppercase tracking-widest">Rev</div>
            <div className="text-[11px] font-display font-bold text-accent">
              ฿{(revenue / 1000).toFixed(0)}k
            </div>
          </div>

          <div className="relative">
            <button className="nav-icon-btn" title="Notifications">
              <Bell size={20} strokeWidth={1.8} />
            </button>
            {pendingAlerts > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[9px] font-display font-bold flex items-center justify-center">
                {pendingAlerts}
              </span>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-sidebar flex justify-around items-center h-16 z-30 border-t border-sidebar-border pb-safe">
        {navItems.slice(0, 5).map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 ${
              activeSection === item.id ? 'text-accent' : 'text-sidebar-foreground/50'
            }`}
          >
            <item.icon size={20} strokeWidth={activeSection === item.id ? 2.5 : 1.8} />
            <span className="text-[9px] font-display font-medium">{item.label}</span>
          </button>
        ))}
        <div className="relative">
          <button
            className="flex flex-col items-center gap-0.5 py-1 px-2 text-sidebar-foreground/50"
            title="Notifications"
          >
            <Bell size={20} strokeWidth={1.8} />
            <span className="text-[9px] font-display font-medium">Alerts</span>
          </button>
          {pendingAlerts > 0 && (
            <span className="absolute top-0 right-0.5 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[9px] font-display font-bold flex items-center justify-center">
              {pendingAlerts}
            </span>
          )}
        </div>
      </nav>
    </>
  );
};

export default SideNav;
