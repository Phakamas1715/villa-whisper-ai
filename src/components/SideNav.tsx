import { Calendar, Home, ClipboardList, Building2, Bell, Settings, Users, Shield, MessageCircle } from 'lucide-react';

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
      <aside className="hidden md:flex flex-col items-center w-16 bg-sidebar py-6 gap-2 fixed left-0 top-0 h-full z-30">
        <div className="mb-6">
          <div className="w-9 h-9 rounded-lg bg-sidebar-primary flex items-center justify-center font-display font-bold text-sidebar-primary-foreground text-sm">
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
              <item.icon size={20} />
            </button>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-2 items-center">
          <div className="text-center">
            <div className="text-[9px] text-sidebar-foreground/40 font-display uppercase tracking-wider">
              Revenue
            </div>
            <div className="text-xs font-display font-semibold text-sidebar-primary">
              ฿{(revenue / 1000).toFixed(0)}k
            </div>
          </div>

          <div className="relative">
            <button className="nav-icon-btn" title="Notifications">
              <Bell size={20} />
            </button>
            {pendingAlerts > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[9px] font-display font-bold flex items-center justify-center">
                {pendingAlerts}
              </span>
            )}
          </div>
          <button className="nav-icon-btn" title="Settings">
            <Settings size={20} />
          </button>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-sidebar flex justify-around items-center h-14 z-30">
        {navItems.slice(0, 5).map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`nav-icon-btn ${activeSection === item.id ? 'active' : ''}`}
          >
            <item.icon size={20} />
          </button>
        ))}
        <div className="relative">
          <button className="nav-icon-btn" title="Notifications">
            <Bell size={20} />
          </button>
          {pendingAlerts > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[9px] font-display font-bold flex items-center justify-center">
              {pendingAlerts}
            </span>
          )}
        </div>
      </nav>
    </>
  );
};

export default SideNav;
