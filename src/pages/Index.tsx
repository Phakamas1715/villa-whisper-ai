import { useState } from 'react';
import SideNav from '@/components/SideNav';
import TimelineCard from '@/components/TimelineCard';
import DetailPane from '@/components/DetailPane';
import StatsHeader from '@/components/StatsHeader';
import CalendarView from '@/components/CalendarView';
import PropertiesView from '@/components/PropertiesView';
import CommunityView from '@/components/CommunityView';
import RegulatoryView from '@/components/RegulatoryView';
import TasksView from '@/components/TasksView';
import { mockTimeline, revenueThisMonth, dashboardStats } from '@/data/mockData';
import type { TimelineItem } from '@/data/mockData';
import { AnimatePresence, motion } from 'framer-motion';

const Index = () => {
  const [activeSection, setActiveSection] = useState('timeline');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showDetailMobile, setShowDetailMobile] = useState(false);

  const selectedItem: TimelineItem | null =
    mockTimeline.find((t) => t.id === selectedId) ?? null;

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setShowDetailMobile(true);
  };

  const handleCloseDetail = () => {
    setShowDetailMobile(false);
    setSelectedId(null);
  };

  const pendingAlerts = dashboardStats.regulatoryPending + dashboardStats.pendingInquiries;

  const renderSection = () => {
    switch (activeSection) {
      case 'calendar':
        return <CalendarView />;
      case 'properties':
        return <PropertiesView />;
      case 'community':
        return <CommunityView />;
      case 'regulatory':
        return <RegulatoryView />;
      case 'tasks':
        return <TasksView />;
      default:
        return (
          <>
            <StatsHeader />
            <div className="space-y-3">
              {mockTimeline.map((item) => (
                <TimelineCard
                  key={item.id}
                  item={item}
                  isSelected={selectedId === item.id}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SideNav
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        revenue={revenueThisMonth}
        pendingAlerts={pendingAlerts}
      />

      <div className="md:ml-16 pb-16 md:pb-0">
        <div className="max-w-6xl mx-auto flex gap-4 p-4 lg:p-6 min-h-screen">
          {/* Main content */}
          <div className="flex-1 min-w-0 lg:max-w-xl">
            <div className="mb-6">
              <h1 className="font-display font-bold text-xl text-foreground">VillaFlow</h1>
              <p className="font-display text-xs text-muted-foreground mt-0.5">
                Zero-Phone Villa Operations · Thai Intelligence OS
              </p>
            </div>
            {renderSection()}
          </div>

          {/* Detail pane — desktop (only on timeline) */}
          {activeSection === 'timeline' && (
            <div className="hidden lg:block w-80 xl:w-96 flex-shrink-0 sticky top-6 self-start">
              <DetailPane item={selectedItem} onClose={handleCloseDetail} />
            </div>
          )}
        </div>
      </div>

      {/* Detail pane — mobile overlay */}
      <AnimatePresence>
        {showDetailMobile && selectedItem && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="lg:hidden fixed inset-0 z-40 bg-card overflow-y-auto pt-4 px-4 pb-20"
          >
            <DetailPane item={selectedItem} onClose={handleCloseDetail} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
