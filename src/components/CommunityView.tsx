import { communityPosts } from '@/data/mockData';
import { MessageCircle, ThumbsUp, MapPin } from 'lucide-react';

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
      <p className="font-body text-xs text-muted-foreground mb-4">
        เชื่อมกลุ่มเจ้าของวิลล่าในพื้นที่ แชร์ข้อมูลและเคล็ดลับ
      </p>

      {/* Region tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {['ทั้งหมด', 'พัทยา', 'ขอนแก่น', 'ภูเก็ต'].map((region, i) => (
          <button
            key={region}
            className={`font-display text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
              i === 0
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-muted'
            }`}
          >
            {region}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {communityPosts.map((post) => (
          <div key={post.id} className="timeline-card">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display text-xs font-bold flex-shrink-0">
                {post.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-display text-sm font-semibold text-foreground">{post.author}</span>
                  <span className="font-display text-[10px] text-muted-foreground">{post.time}</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <MapPin size={10} className="text-muted-foreground" />
                  <span className="font-display text-[10px] text-muted-foreground">{post.region}</span>
                  <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded font-display ml-1">
                    {categoryLabels[post.category] || post.category}
                  </span>
                </div>
                <p className="font-body text-sm text-foreground leading-relaxed">{post.message}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground font-display">
                  <button className="flex items-center gap-1 hover:text-accent transition-colors">
                    <ThumbsUp size={12} /> {post.likes}
                  </button>
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                    <MessageCircle size={12} /> {post.replies}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityView;
