import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, User, Sparkles, Globe, Clock, Building2, ChevronDown, Pencil, Check, X } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  confidence?: number;
  language?: string;
  timestamp: Date;
  typing?: boolean;
  edited?: boolean;
}

const mockResponses: Record<string, { th: string; en: string; confidence: number }> = {
  'ราคา': {
    th: 'Villa Seaview ช่วงสงกรานต์ 12-16 เม.ย. (4 คืน) ราคาพิเศษ ฿56,000 รวม early check-in ค่ะ 🎉 สนใจจองเลยไหมคะ?',
    en: 'Villa Seaview for Songkran Apr 12-16 (4 nights) special rate ฿56,000 including early check-in 🎉 Would you like to book?',
    confidence: 0.95,
  },
  'ว่าง': {
    th: 'Villa Seaview ว่างช่วง 15-20 มี.ค. ค่ะ! ราคา ฿9,500/คืน (5 คืน = ฿47,500) รองรับ 6 ท่าน มีสระว่ายน้ำส่วนตัว + วิวทะเล ต้องการข้อมูลเพิ่มเติมไหมคะ?',
    en: 'Villa Seaview is available Mar 15-20! Rate ฿9,500/night (5 nights = ฿47,500) for up to 6 guests with private pool + sea view. Need more details?',
    confidence: 0.98,
  },
  'check-in': {
    th: 'เช็คอินเวลา 14:00 น. ค่ะ เราจะส่ง QR กุญแจดิจิทัล + WiFi + คู่มือ + แผนที่ Google ให้ทาง LINE 48 ชม. ก่อนเช็คอิน ไม่ต้องรอรับกุญแจค่ะ ✨',
    en: 'Check-in is at 2:00 PM. We\'ll send your digital QR key + WiFi + house manual + Google Maps via LINE 48 hrs before check-in. No need to wait for key handover ✨',
    confidence: 0.97,
  },
  'wifi': {
    th: 'WiFi ชื่อ "VillaSeaview_Guest" รหัส: Welcome2026 ความเร็ว 100 Mbps ค่ะ หากมีปัญหาเรื่อง internet แจ้งผ่านแอปได้เลยนะคะ ทีมช่างพร้อมแก้ไขภายใน 30 นาที!',
    en: 'WiFi name: "VillaSeaview_Guest" password: Welcome2026, speed 100 Mbps. If you have any internet issues, report via app — our team will fix within 30 minutes!',
    confidence: 0.99,
  },
  'pool': {
    th: 'สระว่ายน้ำส่วนตัวขนาด 8x4 เมตร ลึก 1.5 เมตร เปิดใช้ได้ 24 ชม. ค่ะ มีผ้าเช็ดตัวริมสระให้ + ไฟ LED เปลี่ยนสีตอนกลางคืนสวยมากค่ะ 🏊‍♂️',
    en: 'Private pool 8x4 meters, 1.5m deep, open 24 hours. Pool towels provided + beautiful LED color lights at night 🏊‍♂️',
    confidence: 0.96,
  },
  'default': {
    th: 'ขอบคุณสำหรับข้อความค่ะ! ระบบ AI กำลังวิเคราะห์คำถามของคุณ สำหรับคำถามเฉพาะทาง เจ้าของจะตอบกลับภายใน 1 ชม. ค่ะ ระหว่างนี้มีอะไรอยากสอบถามเพิ่มเติมไหมคะ? 😊',
    en: 'Thank you for your message! Our AI is analyzing your question. For specialized queries, the owner will respond within 1 hour. Meanwhile, is there anything else you\'d like to ask? 😊',
    confidence: 0.72,
  },
};

const suggestedQuestions = {
  th: ['ราคาช่วงสงกรานต์เท่าไหร่?', 'วิลล่าว่างวันไหนบ้าง?', 'เช็คอินกี่โมง?', 'WiFi รหัสอะไร?', 'สระว่ายน้ำเปิดกี่โมง?'],
  en: ['What\'s the Songkran rate?', 'When is the villa available?', 'What time is check-in?', 'What\'s the WiFi password?', 'Is the pool open 24hrs?'],
};

const AIChatView = () => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getAIResponse = (userMessage: string): { content: string; confidence: number } => {
    const msg = userMessage.toLowerCase();
    for (const [key, resp] of Object.entries(mockResponses)) {
      if (key === 'default') continue;
      if (msg.includes(key) || 
          (key === 'ราคา' && (msg.includes('price') || msg.includes('rate') || msg.includes('cost') || msg.includes('สงกรานต์') || msg.includes('songkran'))) ||
          (key === 'ว่าง' && (msg.includes('available') || msg.includes('vacancy') || msg.includes('free'))) ||
          (key === 'check-in' && (msg.includes('checkin') || msg.includes('เช็คอิน') || msg.includes('check in'))) ||
          (key === 'wifi' && (msg.includes('internet') || msg.includes('password') || msg.includes('รหัส'))) ||
          (key === 'pool' && (msg.includes('สระ') || msg.includes('swimming') || msg.includes('swim')))
      ) {
        return { content: resp[language], confidence: resp.confidence };
      }
    }
    return { content: mockResponses.default[language], confidence: mockResponses.default.confidence };
  };

  const sendMessage = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const { content, confidence } = getAIResponse(messageText);
      const detected = /[ก-๙]/.test(messageText) ? 'th' : 'en';
      const aiMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content,
        confidence,
        language: detected,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)]">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Bot size={24} className="text-accent" />
          <h2 className="font-display font-bold text-xl text-foreground">{t('chat.title')}</h2>
          <span className="badge-accent">{t('chat.auto')}</span>
        </div>
        <p className="font-body text-sm text-muted-foreground">{t('chat.subtitle')}</p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4 scrollbar-hide">
        {messages.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
            <div className="w-22 h-22 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-5" style={{ width: '88px', height: '88px' }}>
              <Bot size={40} className="text-accent" />
            </div>
            <h3 className="font-display font-bold text-xl text-foreground mb-2">{t('chat.welcome')}</h3>
            <p className="font-body text-base text-muted-foreground max-w-sm mx-auto mb-6">{t('chat.welcome_sub')}</p>
            
            <div className="flex flex-wrap gap-2 justify-center max-w-lg mx-auto">
              {suggestedQuestions[language].map((q, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  onClick={() => sendMessage(q)}
                  className="glass-card px-4 py-3 text-base font-display font-medium text-foreground hover:ring-2 hover:ring-accent/30 transition-all"
                >
                  {q}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot size={20} className="text-accent" />
                </div>
              )}
              <div className={`max-w-[80%] ${msg.role === 'user' ? 'order-first' : ''}`}>
                <div className={`rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-accent text-accent-foreground rounded-tr-md'
                    : 'glass-card rounded-tl-md'
                }`}>
                  <p className={`font-body text-base leading-relaxed ${msg.role === 'user' ? '' : 'text-foreground'}`}>{msg.content}</p>
                </div>
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-3 mt-1.5 px-1">
                    {msg.confidence && (
                      <div className="flex items-center gap-1">
                        <Sparkles size={13} className="text-accent" />
                        <span className="font-display text-xs font-semibold text-accent">
                          {t('chat.confidence')}: {(msg.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                    )}
                    {msg.language && (
                      <div className="flex items-center gap-1">
                        <Globe size={13} className="text-muted-foreground" />
                        <span className="font-display text-xs text-muted-foreground">
                          {msg.language === 'th' ? '🇹🇭 TH' : '🇬🇧 EN'}
                        </span>
                      </div>
                    )}
                    <span className="font-display text-xs text-muted-foreground flex items-center gap-0.5">
                      <Clock size={11} />
                      {msg.timestamp.toLocaleTimeString(language === 'th' ? 'th-TH' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                )}
              </div>
              {msg.role === 'user' && (
                <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                  <User size={20} className="text-muted-foreground" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Bot size={20} className="text-accent" />
            </div>
            <div className="glass-card rounded-2xl rounded-tl-md px-5 py-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-accent/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-3 h-3 rounded-full bg-accent/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-3 h-3 rounded-full bg-accent/40 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Property context bar */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <Building2 size={15} className="text-muted-foreground" />
        <span className="font-display text-sm text-muted-foreground">{t('chat.context')}: Villa Seaview</span>
        <ChevronDown size={14} className="text-muted-foreground" />
        <span className="ml-auto badge-accent">{t('chat.ai_mode')}</span>
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder={t('chat.placeholder')}
          className="flex-1 h-14 rounded-xl bg-muted border border-border/50 px-4 font-display text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
          disabled={isTyping}
        />
        <button
          onClick={() => sendMessage()}
          disabled={!input.trim() || isTyping}
          className="w-14 h-14 rounded-xl bg-accent text-accent-foreground flex items-center justify-center hover:bg-accent/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default AIChatView;
