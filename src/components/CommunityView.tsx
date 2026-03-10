import { MessageCircle, ThumbsUp, MapPin, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface CommunityPost {
  id: string;
  region: { th: string; en: string };
  author: { th: string; en: string };
  avatar: string;
  time: { th: string; en: string };
  message: { th: string; en: string };
  likes: number;
  replies: number;
  category: string;
}

const communityPostsBilingual: CommunityPost[] = [
  {
    id: 'cp1',
    region: { th: 'พัทยา', en: 'Pattaya' },
    author: { th: 'คุณวิชัย', en: 'Wichai' },
    avatar: 'WC',
    time: { th: '2 ชม.', en: '2 hrs' },
    message: {
      th: 'แนะนำช่างแอร์ ช่างเอก 089-xxx-xxxx ซ่อมเร็ว ราคาถูก ซอยบัวขาว ดีทุกครั้งครับ 👍',
      en: 'Recommend AC technician Mr. Ek 089-xxx-xxxx — fast, affordable, Soi Buakhao. Great every time 👍',
    },
    likes: 12,
    replies: 4,
    category: 'vendor',
  },
  {
    id: 'cp2',
    region: { th: 'ขอนแก่น', en: 'Khon Kaen' },
    author: { th: 'คุณแพร', en: 'Prae' },
    avatar: 'PR',
    time: { th: '1 วัน', en: '1 day' },
    message: {
      th: 'เทศกาลไหมปีนี้ demand สูงมาก ปีที่แล้วราคาขึ้น 40% ใครปรับราคาแล้วบ้างคะ?',
      en: 'Silk Festival demand is super high this year. Last year prices went up 40%. Has anyone adjusted rates yet?',
    },
    likes: 8,
    replies: 6,
    category: 'pricing',
  },
  {
    id: 'cp3',
    region: { th: 'ภูเก็ต', en: 'Phuket' },
    author: { th: 'คุณมาร์ค', en: 'Mark' },
    avatar: 'MK',
    time: { th: '2 วัน', en: '2 days' },
    message: {
      th: 'ใครมีแม่บ้านว่างบ้างครับ? ช่วง high season คนไม่พอ ต้องการ 3 คน โซนกะตะ-กะรน',
      en: 'Anyone have housekeepers available? High season staffing shortage — need 3 people for Kata-Karon area.',
    },
    likes: 5,
    replies: 9,
    category: 'staffing',
  },
  {
    id: 'cp4',
    region: { th: 'พัทยา', en: 'Pattaya' },
    author: { th: 'คุณนิด', en: 'Nid' },
    avatar: 'ND',
    time: { th: '3 วัน', en: '3 days' },
    message: {
      th: 'TM30 ออนไลน์ตอนนี้เสถียรขึ้นมากเลยค่ะ ส่งผ่าน VillaFlow ไม่เคยมีปัญหา 🎉',
      en: 'Online TM30 is much more stable now. Submitting via VillaFlow has been flawless 🎉',
    },
    likes: 15,
    replies: 2,
    category: 'regulatory',
  },
];

const CommunityView = () => {
  const { t, language } = useLanguage();

  const categoryLabels: Record<string, { th: string; en: string }> = {
    vendor: { th: '🔧 ช่าง/บริการ', en: '🔧 Vendor' },
    pricing: { th: '💰 ราคา', en: '💰 Pricing' },
    staffing: { th: '👥 พนักงาน', en: '👥 Staffing' },
    regulatory: { th: '📋 กฎหมาย', en: '📋 Legal' },
  };

  const regions = [
    { th: 'ทั้งหมด', en: 'All' },
    { th: 'พัทยา', en: 'Pattaya' },
    { th: 'ขอนแก่น', en: 'Khon Kaen' },
    { th: 'ภูเก็ต', en: 'Phuket' },
  ];

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Users size={20} className="text-villa-ocean" />
        <h2 className="font-display font-bold text-lg text-foreground">{t('community.title')}</h2>
      </div>
      <p className="font-body text-xs text-muted-foreground mb-5">{t('community.subtitle')}</p>

      <div className="flex gap-2 mb-5 overflow-x-auto pb-1 scrollbar-hide">
        {regions.map((region, i) => (
          <button key={region.en} className={`font-display text-xs px-4 py-2.5 rounded-xl whitespace-nowrap transition-all font-semibold ${i === 0 ? 'bg-accent text-accent-foreground shadow-sm' : 'bg-card text-muted-foreground hover:bg-muted border border-border/50'}`}>
            {region[language]}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {communityPostsBilingual.map((post, idx) => {
          const catLabel = categoryLabels[post.category]?.[language] || post.category;
          return (
            <motion.div key={post.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: idx * 0.06 }} className="glass-card p-4">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent to-villa-ocean text-primary-foreground flex items-center justify-center font-display text-xs font-bold flex-shrink-0 shadow-sm">{post.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-display text-sm font-bold text-foreground">{post.author[language]}</span>
                    <span className="font-display text-[10px] text-muted-foreground">{post.time[language]}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <span className="badge-muted flex items-center gap-1"><MapPin size={8} /> {post.region[language]}</span>
                    <span className="badge-muted">{catLabel}</span>
                  </div>
                  <p className="font-body text-sm text-foreground leading-relaxed">{post.message[language]}</p>
                  <div className="flex items-center gap-5 mt-3 text-xs text-muted-foreground font-display">
                    <button className="flex items-center gap-1.5 hover:text-accent transition-colors"><ThumbsUp size={14} /> {post.likes}</button>
                    <button className="flex items-center gap-1.5 hover:text-villa-ocean transition-colors"><MessageCircle size={14} /> {post.replies}</button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CommunityView;
