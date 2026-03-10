import { useState } from 'react';
import SideNav from '@/components/SideNav';
import TimelineCard from '@/components/TimelineCard';
import DetailPane from '@/components/DetailPane';
import HeroSection from '@/components/HeroSection';
import CalendarView from '@/components/CalendarView';
import PropertiesView from '@/components/PropertiesView';
import CommunityView from '@/components/CommunityView';
import RegulatoryView from '@/components/RegulatoryView';
import TasksView from '@/components/TasksView';
import AnalyticsView from '@/components/AnalyticsView';
import AIChatView from '@/components/AIChatView';
import { mockTimeline, revenueThisMonth, dashboardStats } from '@/data/mockData';
import type { TimelineItem } from '@/data/mockData';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('timeline');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showDetailMobile, setShowDetailMobile] = useState(false);

  const selectedItem: TimelineItem | null = mockTimeline.find((ti) => ti.id === selectedId) ?? null;
  const pendingAlerts = dashboardStats.regulatoryPending + dashboardStats.pendingInquiries;

  const handleSelect = (id: string) => { setSelectedId(id); setShowDetailMobile(true); };
  const handleCloseDetail = () => { setShowDetailMobile(false); setSelectedId(null); };

  const renderSection = () => {
    switch (activeSection) {
      case 'analytics': return <AnalyticsView />;
      case 'calendar': return <CalendarView />;
      case 'properties': return <PropertiesView />;
      case 'community': return <CommunityView />;
      case 'regulatory': return <RegulatoryView />;
      case 'tasks': return <TasksView />;
      case 'chat': return <AIChatView />;
      default:
        return (
          <>
            <HeroSection />
            <p className="section-header">{t('timeline.title')}</p>
            <div className="space-y-3">
              {mockTimeline.map((item) => (
                <TimelineCard key={item.id} item={item} isSelected={selectedId === item.id} onSelect={handleSelect} />
              ))}
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SideNav activeSection={activeSection} onSectionChange={setActiveSection} revenue={revenueThisMonth} pendingAlerts={pendingAlerts} />
      <div className="md:ml-[80px] pb-24 md:pb-0">
        <div className="max-w-6xl mx-auto flex gap-5 p-4 lg:p-6 min-h-screen">
          <div className="flex-1 min-w-0 lg:max-w-2xl">{renderSection()}</div>
          {activeSection === 'timeline' && (
            <div className="hidden lg:block w-80 xl:w-[400px] flex-shrink-0 sticky top-6 self-start max-h-[calc(100vh-3rem)]">
              <DetailPane item={selectedItem} onClose={handleCloseDetail} />
            </div>
          )}
        </div>
      </div>
      <AnimatePresence>
        {showDetailMobile && selectedItem && (
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} className="lg:hidden fixed inset-0 z-40 bg-card overflow-y-auto">
            <DetailPane item={selectedItem} onClose={handleCloseDetail} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
