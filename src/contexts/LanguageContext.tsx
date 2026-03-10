import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'th' | 'en';

interface Translations {
  [key: string]: { th: string; en: string };
}

const translations: Translations = {
  // App
  'app.title': { th: 'VillaFlow', en: 'VillaFlow' },
  'app.tagline': { th: 'ระบบจัดการวิลล่าอัจฉริยะ · Zero-Phone', en: 'Zero-Phone Villa Operations · Thai Intelligence OS' },
  'app.properties_count': { th: '3 พร็อพเพอร์ตี้', en: '3 properties' },

  // Nav
  'nav.timeline': { th: 'ไทม์ไลน์', en: 'Timeline' },
  'nav.calendar': { th: 'ปฏิทิน', en: 'Calendar' },
  'nav.properties': { th: 'พร็อพเพอร์ตี้', en: 'Properties' },
  'nav.tasks': { th: 'งาน', en: 'Tasks' },
  'nav.community': { th: 'ชุมชน', en: 'Community' },
  'nav.regulatory': { th: 'กฎหมาย', en: 'Regulatory' },
  'nav.alerts': { th: 'แจ้งเตือน', en: 'Alerts' },
  'nav.revenue': { th: 'รายได้', en: 'Rev' },

  // Stats
  'stats.revenue': { th: 'รายได้', en: 'Revenue' },
  'stats.occupancy': { th: 'อัตราเข้าพัก', en: 'Occupancy' },
  'stats.overbooking': { th: 'จองซ้ำ', en: 'Overbooking' },
  'stats.ai_response': { th: 'AI ตอบ', en: 'AI Response' },
  'stats.tasks': { th: 'งาน', en: 'Tasks' },
  'stats.inquiries': { th: 'สอบถาม', en: 'Inquiries' },
  'stats.zero': { th: 'ศูนย์!', en: 'Zero!' },
  'stats.auto': { th: 'อัตโนมัติ', en: 'Auto' },
  'stats.active': { th: 'กำลังทำ', en: 'Active' },
  'stats.pending': { th: 'รอดำเนินการ', en: 'Pending' },

  // Timeline
  'timeline.title': { th: 'ไทม์ไลน์', en: 'Timeline' },
  'timeline.booking': { th: 'การจอง', en: 'Booking' },
  'timeline.inquiry': { th: 'สอบถาม', en: 'Inquiry' },
  'timeline.task': { th: 'งาน', en: 'Task' },
  'timeline.damage': { th: 'ความเสียหาย', en: 'Damage' },
  'timeline.pricing_ai': { th: 'AI ราคา', en: 'Pricing AI' },
  'timeline.regulatory': { th: 'กฎหมาย', en: 'Regulatory' },
  'timeline.community': { th: 'ชุมชน', en: 'Community' },
  'timeline.guest_flow': { th: 'Guest Flow', en: 'Guest Flow' },
  'timeline.ai_draft': { th: 'แบบร่าง AI', en: 'AI Draft' },
  'timeline.ai_detected': { th: 'AI ตรวจพบ', en: 'AI Detected' },
  'timeline.auto_generated': { th: 'สร้างอัตโนมัติ', en: 'Auto-generated' },
  'timeline.today': { th: 'วันนี้', en: 'Today' },
  'timeline.yesterday': { th: 'เมื่อวาน', en: 'Yesterday' },

  // Detail
  'detail.select_item': { th: 'เลือกรายการเพื่อดูรายละเอียด', en: 'Select an item to view details' },
  'detail.select_item_sub': { th: 'เลือกจากไทม์ไลน์', en: 'Select an item from the timeline' },
  'detail.guest': { th: 'แขก', en: 'Guest' },
  'detail.checkin': { th: 'เช็คอิน', en: 'Check-in' },
  'detail.checkout': { th: 'เช็คเอาท์', en: 'Check-out' },
  'detail.guests': { th: 'จำนวนแขก', en: 'Guests' },
  'detail.total': { th: 'ราคารวม', en: 'Total' },
  'detail.confirm_booking': { th: 'ยืนยันการจอง', en: 'Confirm Booking' },
  'detail.send_ai_reply': { th: 'ส่งคำตอบ AI', en: 'Send AI Reply' },
  'detail.edit': { th: 'แก้ไข', en: 'Edit' },
  'detail.assigned': { th: 'มอบหมาย', en: 'Assigned' },
  'detail.checklist': { th: 'รายการตรวจสอบ', en: 'Checklist' },
  'detail.mark_completed': { th: 'ทำเสร็จแล้ว', en: 'Mark as Completed' },
  'detail.severity': { th: 'ความรุนแรง', en: 'severity' },
  'detail.damaged_items': { th: 'รายการเสียหาย', en: 'Damaged Items' },
  'detail.est_cost': { th: 'ค่าใช้จ่ายโดยประมาณ', en: 'Est. Cost' },
  'detail.auto_charge_ready': { th: 'พร้อมเรียกเก็บอัตโนมัติ', en: 'Auto Charge Ready' },
  'detail.send_charge': { th: 'เรียกเก็บเงิน', en: 'Send Charge' },
  'detail.create_ticket': { th: 'สร้างตั๋ว', en: 'Create Ticket' },
  'detail.current': { th: 'ปัจจุบัน', en: 'Current' },
  'detail.suggested': { th: 'แนะนำ', en: 'Suggested' },
  'detail.multiplier': { th: 'ตัวคูณ', en: 'Multiplier' },
  'detail.demand': { th: 'อุปสงค์', en: 'Demand' },
  'detail.confidence': { th: 'ความมั่นใจ', en: 'Confidence' },
  'detail.ai_factors': { th: 'ปัจจัย AI', en: 'AI Factors' },
  'detail.apply_price': { th: 'ใช้ราคานี้', en: 'Apply Price' },
  'detail.nationality': { th: 'สัญชาติ', en: 'Nationality' },
  'detail.deadline': { th: 'กำหนดส่ง', en: 'Deadline' },
  'detail.auto_gen_desc': { th: 'เอกสารสร้างอัตโนมัติ พร้อมส่ง', en: 'Document auto-generated, ready to submit' },
  'detail.submit': { th: 'ส่ง', en: 'Submit' },
  'detail.submitted': { th: 'ส่งแล้ว', en: 'Submitted' },
  'detail.reply': { th: 'ตอบกลับ', en: 'Reply' },
  'detail.sent_items': { th: 'รายการที่ส่ง', en: 'Sent Items' },
  'detail.zero_phone': { th: 'Zero-Phone', en: 'Zero-Phone' },
  'detail.from': { th: 'จาก', en: 'From' },
  'detail.guest_self_service': { th: 'Guest Self-Service', en: 'Guest Self-Service' },

  // Properties
  'properties.title': { th: 'พร็อพเพอร์ตี้', en: 'Properties' },
  'properties.managed': { th: 'พร็อพเพอร์ตี้ที่จัดการ', en: 'properties managed' },
  'properties.beds': { th: 'ห้องนอน', en: 'Beds' },
  'properties.baths': { th: 'ห้องน้ำ', en: 'Baths' },
  'properties.occ': { th: 'เข้าพัก', en: 'Occ.' },
  'properties.rev': { th: 'รีวิว', en: 'rev' },
  'properties.per_night': { th: '/คืน', en: '/night' },
  'properties.next_checkin': { th: 'เช็คอินถัดไป:', en: 'Next check-in:' },

  // Calendar
  'calendar.title': { th: 'ปฏิทิน', en: 'Calendar' },
  'calendar.month': { th: 'มีนาคม 2026', en: 'March 2026' },
  'calendar.upcoming': { th: 'กำลังจะมาถึง', en: 'Upcoming' },

  // Tasks
  'tasks.title': { th: 'งานและปฏิบัติการ', en: 'Tasks & Ops' },
  'tasks.subtitle': { th: 'แม่บ้าน · ช่าง · Maintenance', en: 'Housekeeping · Repair · Maintenance' },
  'tasks.active': { th: 'กำลังดำเนินการ', en: 'Active' },
  'tasks.completed': { th: 'เสร็จสิ้น', en: 'Completed' },
  'tasks.auto_created': { th: 'สร้างอัตโนมัติ', en: 'Auto-created' },

  // Community
  'community.title': { th: 'เครือข่ายชุมชน', en: 'Community Network' },
  'community.subtitle': { th: 'เชื่อมกลุ่มเจ้าของวิลล่า แชร์ข้อมูลและเคล็ดลับ', en: 'Connect with villa owners, share tips and insights' },
  'community.all': { th: 'ทั้งหมด', en: 'All' },

  // Regulatory
  'regulatory.title': { th: 'ระบบกฎหมายไทยอัจฉริยะ', en: 'Thai Regulatory Intelligence' },
  'regulatory.subtitle': { th: 'TM30 · TDAC · ภาษี ภ.ง.ด. — อัตโนมัติ', en: 'TM30 · TDAC · Tax — Automated' },
  'regulatory.auto_generate': { th: 'สร้างอัตโนมัติ', en: 'Auto-generate' },
  'regulatory.export_tax': { th: 'ส่งออกภาษี', en: 'Export Tax' },
  'regulatory.action_required': { th: 'ต้องดำเนินการ', en: 'Action Required' },
  'regulatory.completed': { th: 'เสร็จสิ้น', en: 'Completed' },
  'regulatory.urgent': { th: 'เร่งด่วน', en: 'Urgent' },
  'regulatory.submit_now': { th: 'ส่งตอนนี้', en: 'Submit Now' },

  // Language
  'lang.switch': { th: 'EN', en: 'TH' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'th',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('th');

  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
