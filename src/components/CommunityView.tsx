import { communityPosts } from '@/data/mockData';
import { MessageCircle, ThumbsUp, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const categoryLabels: Record<string, string> = {
  vendor: '🔧 Vendor',
  pricing: '💰 Pricing',
  staffing: '👥 Staffing',
  regulatory: '📋 Regulatory',
};

const CommunityView = () => {
  return (
    <div>
      <h2 className="font-display font-bold text-lg text-foreground mb-1">Community Network</h2>
      <p className="font-body text-xs text-muted-foreground mb-5">
        เชื่อมกลุ่มเจ้าของวิลล่า แชร์ข้อมูลและเคล็ดลับ
      </p>

      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {['ทั้งหมด', 'พัทยา', 'ขอนแก่น', 'ภูเก็ต'].map((region, i) => (
          <button
            key={region}
            className={`font-display text-xs px-4 py-2 rounded-full whitespace-nowrap transition-all font-medium ${
              i === 0
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-card text-muted-foreground hover:bg-muted border border-border/50'
            }`}
          >
            {region}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {communityPosts.map((post, idx) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.06 }}
            className="glass-card p-4"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display text-xs font-bold flex-shrink-0">
                {post.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-display text-sm font-semibold text-foreground">{post.author}</span>
                  <span className="font-display text-[10px] text-muted-foreground">{post.time}</span>
                </div>
                <div className="flex items-center gap-1.5 mb-2.5">
                  <span className="badge-muted flex items-center gap-1"><MapPin size={8} /> {post.region}</span>
                  <span className="badge-muted">{categoryLabels[post.category] || post.category}</span>
                </div>
                <p className="font-body text-sm text-foreground leading-relaxed">{post.message}</p>
                <div className="flex items-center gap-5 mt-3 text-xs text-muted-foreground font-display">
                  <button className="flex items-center gap-1.5 hover:text-accent transition-colors">
                    <ThumbsUp size={14} /> {post.likes}
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                    <MessageCircle size={14} /> {post.replies}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommunityView;
