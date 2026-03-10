import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'th' | 'en';

interface Translations {
  [key: string]: { th: string; en: string };
}

const translations: Translations = {
  // App
  'app.title': { th: 'VillaFlow', en: 'VillaFlow' },
  'app.tagline': { th: 'ระบบจัดการที่พักอัจฉริยะ · ทำงานแทนคุณ 100%', en: 'Intelligent Property OS · Zero-Phone Automation' },
  'app.properties_count': { th: '5 พร็อพเพอร์ตี้', en: '5 properties' },

  // Nav
  'nav.timeline': { th: 'ภาพรวม', en: 'Overview' },
  'nav.calendar': { th: 'ปฏิทิน', en: 'Calendar' },
  'nav.properties': { th: 'ที่พัก', en: 'Properties' },
  'nav.tasks': { th: 'งาน', en: 'Tasks' },
  'nav.community': { th: 'ชุมชน', en: 'Community' },
  'nav.regulatory': { th: 'กฎหมาย', en: 'Legal' },
  'nav.alerts': { th: 'แจ้งเตือน', en: 'Alerts' },
  'nav.analytics': { th: 'วิเคราะห์', en: 'Analytics' },
  'nav.revenue': { th: 'รายได้', en: 'Revenue' },

  // Stats
  'stats.revenue': { th: 'รายได้', en: 'Revenue' },
  'stats.occupancy': { th: 'เข้าพัก', en: 'Occupancy' },
  'stats.overbooking': { th: 'จองซ้ำ', en: 'Overlap' },
  'stats.ai_response': { th: 'AI ตอบ', en: 'AI Reply' },
  'stats.tasks': { th: 'งานค้าง', en: 'Tasks' },
  'stats.inquiries': { th: 'รอตอบ', en: 'Pending' },
  'stats.zero': { th: 'ปลอดภัย!', en: 'Safe!' },
  'stats.auto': { th: 'อัตโนมัติ', en: 'Auto' },
  'stats.active': { th: 'กำลังทำ', en: 'Active' },
  'stats.pending': { th: 'รอดำเนินการ', en: 'Waiting' },

  // Timeline
  'timeline.title': { th: 'กิจกรรมล่าสุด', en: 'Recent Activity' },
  'timeline.booking': { th: 'การจอง', en: 'Booking' },
  'timeline.inquiry': { th: 'สอบถาม', en: 'Inquiry' },
  'timeline.task': { th: 'งาน', en: 'Task' },
  'timeline.damage': { th: 'ความเสียหาย', en: 'Damage' },
  'timeline.pricing_ai': { th: 'AI ราคา', en: 'AI Price' },
  'timeline.regulatory': { th: 'กฎหมาย', en: 'Legal' },
  'timeline.community': { th: 'ชุมชน', en: 'Community' },
  'timeline.guest_flow': { th: 'เช็คอิน', en: 'Check-in' },
  'timeline.ai_draft': { th: 'AI ร่างตอบ', en: 'AI Draft' },
  'timeline.ai_detected': { th: 'AI ตรวจพบ', en: 'AI Found' },
  'timeline.auto_generated': { th: 'สร้างอัตโนมัติ', en: 'Auto-generated' },
  'timeline.today': { th: 'วันนี้', en: 'Today' },
  'timeline.yesterday': { th: 'เมื่อวาน', en: 'Yesterday' },

  // Detail
  'detail.select_item': { th: 'เลือกรายการเพื่อดูรายละเอียด', en: 'Select an item to view details' },
  'detail.select_item_sub': { th: 'กดที่รายการจากไทม์ไลน์ด้านซ้าย', en: 'Click any item from the timeline' },
  'detail.guest': { th: 'แขก', en: 'Guest' },
  'detail.checkin': { th: 'เช็คอิน', en: 'Check-in' },
  'detail.checkout': { th: 'เช็คเอาท์', en: 'Check-out' },
  'detail.guests': { th: 'จำนวนแขก', en: 'Guests' },
  'detail.total': { th: 'ราคารวม', en: 'Total' },
  'detail.confirm_booking': { th: 'ยืนยันการจอง', en: 'Confirm Booking' },
  'detail.send_ai_reply': { th: 'ส่งคำตอบ AI', en: 'Send AI Reply' },
  'detail.edit': { th: 'แก้ไข', en: 'Edit' },
  'detail.assigned': { th: 'ผู้รับผิดชอบ', en: 'Assigned To' },
  'detail.checklist': { th: 'รายการตรวจ', en: 'Checklist' },
  'detail.mark_completed': { th: 'เสร็จแล้ว ✓', en: 'Mark Done ✓' },
  'detail.severity': { th: 'ความรุนแรง', en: 'severity' },
  'detail.damaged_items': { th: 'รายการเสียหาย', en: 'Damaged Items' },
  'detail.est_cost': { th: 'ค่าเสียหายโดยประมาณ', en: 'Est. Cost' },
  'detail.auto_charge_ready': { th: '⚡ พร้อมเรียกเก็บอัตโนมัติ', en: '⚡ Auto Charge Ready' },
  'detail.send_charge': { th: 'เรียกเก็บเงิน', en: 'Charge Now' },
  'detail.create_ticket': { th: 'สร้างตั๋วซ่อม', en: 'Create Ticket' },
  'detail.current': { th: 'ราคาปัจจุบัน', en: 'Current Price' },
  'detail.suggested': { th: 'ราคาแนะนำ', en: 'Suggested' },
  'detail.multiplier': { th: 'ตัวคูณ', en: 'Multiplier' },
  'detail.demand': { th: 'ดีมานด์', en: 'Demand' },
  'detail.confidence': { th: 'ความมั่นใจ AI', en: 'AI Confidence' },
  'detail.ai_factors': { th: 'ปัจจัยวิเคราะห์', en: 'Analysis Factors' },
  'detail.apply_price': { th: 'ใช้ราคานี้', en: 'Apply Price' },
  'detail.nationality': { th: 'สัญชาติ', en: 'Nationality' },
  'detail.deadline': { th: 'กำหนดส่ง', en: 'Deadline' },
  'detail.auto_gen_desc': { th: 'เอกสารสร้างอัตโนมัติแล้ว พร้อมกดส่ง', en: 'Auto-generated document, ready to submit' },
  'detail.submit': { th: 'ส่งเอกสาร', en: 'Submit' },
  'detail.submitted': { th: '✓ ส่งแล้ว', en: '✓ Submitted' },
  'detail.reply': { th: 'ตอบกลับ', en: 'Reply' },
  'detail.sent_items': { th: 'รายการที่ส่งแล้ว', en: 'Items Sent' },
  'detail.zero_phone': { th: 'Zero-Phone ✨', en: 'Zero-Phone ✨' },
  'detail.from': { th: 'จาก', en: 'From' },
  'detail.guest_self_service': { th: 'เช็คอินอัตโนมัติ', en: 'Self Check-in' },
  'detail.night': { th: '/คืน', en: '/night' },
  'detail.persons': { th: 'ท่าน', en: 'guests' },

  // Properties
  'properties.title': { th: 'ที่พักของฉัน', en: 'My Properties' },
  'properties.managed': { th: 'ที่พักในระบบ', en: 'properties managed' },
  'properties.beds': { th: 'ห้องนอน', en: 'Beds' },
  'properties.baths': { th: 'ห้องน้ำ', en: 'Baths' },
  'properties.occ': { th: 'อัตราเข้าพัก', en: 'Occupancy' },
  'properties.rev': { th: 'รีวิว', en: 'reviews' },
  'properties.per_night': { th: '/คืน', en: '/night' },
  'properties.next_checkin': { th: 'เช็คอินถัดไป:', en: 'Next check-in:' },

  // Calendar
  'calendar.title': { th: 'ปฏิทินจองที่พัก', en: 'Booking Calendar' },
  'calendar.month': { th: 'มีนาคม 2026', en: 'March 2026' },
  'calendar.upcoming': { th: 'การจองที่กำลังจะมา', en: 'Upcoming Bookings' },

  // Tasks
  'tasks.title': { th: 'งานและปฏิบัติการ', en: 'Tasks & Operations' },
  'tasks.subtitle': { th: 'แม่บ้าน · ช่างซ่อม · บำรุงรักษา', en: 'Housekeeping · Repairs · Maintenance' },
  'tasks.active': { th: 'กำลังดำเนินการ', en: 'In Progress' },
  'tasks.completed': { th: 'เสร็จสิ้นแล้ว', en: 'Completed' },
  'tasks.auto_created': { th: '⚡ สร้างอัตโนมัติ', en: '⚡ Auto-created' },

  // Community
  'community.title': { th: 'เครือข่ายเจ้าของ', en: 'Owner Network' },
  'community.subtitle': { th: 'แชร์ข้อมูล แม่บ้าน ช่าง เคล็ดลับกับเจ้าของในพื้นที่', en: 'Share staff, vendors & tips with local owners' },
  'community.all': { th: 'ทั้งหมด', en: 'All' },

  // Regulatory
  'regulatory.title': { th: 'ระบบกฎหมายอัจฉริยะ', en: 'Legal Intelligence' },
  'regulatory.subtitle': { th: 'TM30 · TDAC · ภาษี — จัดการอัตโนมัติ', en: 'TM30 · TDAC · Tax — Fully Automated' },
  'regulatory.auto_generate': { th: 'สร้างอัตโนมัติ', en: 'Auto-generate' },
  'regulatory.export_tax': { th: 'ส่งออกภาษี', en: 'Export Tax' },
  'regulatory.guest_report': { th: 'รายงานแขก', en: 'Guest Report' },
  'regulatory.action_required': { th: 'ต้องดำเนินการ', en: 'Action Required' },
  'regulatory.completed': { th: 'เสร็จสิ้น', en: 'Completed' },
  'regulatory.urgent': { th: 'เร่งด่วน!', en: 'Urgent!' },
  'regulatory.submit_now': { th: 'ส่งตอนนี้', en: 'Submit Now' },
  'regulatory.recent_docs': { th: 'เอกสารล่าสุด', en: 'Recent Documents' },
  'regulatory.tm30_preview': { th: 'ตัวอย่างเอกสาร TM30', en: 'TM30 Document Preview' },
  'regulatory.tdac_preview': { th: 'ตัวอย่างรายงาน TDAC', en: 'TDAC Report Preview' },
  'regulatory.tax_preview': { th: 'สรุปภาษี ภ.ง.ด.', en: 'Tax Summary (PND)' },
  'regulatory.auto_filled': { th: 'กรอกอัตโนมัติ', en: 'Auto-filled' },

  // Language
  'lang.switch': { th: 'EN', en: 'TH' },

  // Analytics
  'analytics.title': { th: 'วิเคราะห์รายได้', en: 'Revenue Analytics' },
  'analytics.subtitle': { th: 'สรุปรายได้ · Occupancy · แนวโน้มตามฤดูกาล', en: 'Revenue · Occupancy · Seasonal Trends' },
  'analytics.total_revenue': { th: 'รายได้รวม', en: 'Total Revenue' },
  'analytics.avg_occupancy': { th: 'เข้าพักเฉลี่ย', en: 'Avg Occupancy' },
  'analytics.total_bookings': { th: 'จองทั้งหมด', en: 'Bookings' },
  'analytics.avg_rate': { th: 'ราคาเฉลี่ย', en: 'Avg Rate' },
  'analytics.this_month': { th: 'เดือนนี้', en: 'This month' },
  'analytics.per_night': { th: '/คืน', en: '/night' },
  'analytics.daily_revenue': { th: 'รายได้รายวัน', en: 'Daily Revenue' },
  'analytics.march_2026': { th: 'มีนาคม 2026', en: 'March 2026' },
  'analytics.monthly_overview': { th: 'สรุปรายเดือน', en: 'Monthly Overview' },
  'analytics.revenue_and_occupancy': { th: 'รายได้ + อัตราเข้าพัก', en: 'Revenue + Occupancy' },
  'analytics.revenue': { th: 'รายได้', en: 'Revenue' },
  'analytics.occupancy': { th: 'เข้าพัก', en: 'Occupancy' },
  'analytics.occupancy_by_property': { th: 'อัตราเข้าพักตามที่พัก', en: 'Occupancy by Property' },
  'analytics.booking_sources': { th: 'แหล่งที่มาการจอง', en: 'Booking Sources' },
  'analytics.seasonal_trends': { th: 'แนวโน้มตามฤดูกาล', en: 'Seasonal Trends' },
  'analytics.demand_vs_price': { th: 'ดีมานด์ vs ราคาเฉลี่ย · ทั้งปี', en: 'Demand vs Avg Price · Full Year' },
  'analytics.demand': { th: 'ดีมานด์', en: 'Demand' },
  'analytics.avg_price': { th: 'ราคาเฉลี่ย', en: 'Avg Price' },

  // Chat AI
  'nav.chat': { th: 'AI แชท', en: 'AI Chat' },
  'chat.title': { th: 'AI Chat Brain', en: 'AI Chat Brain' },
  'chat.subtitle': { th: 'ตอบแขกอัตโนมัติ 95% ทุกภาษา — เข้าใจบริบทไทย', en: 'Auto-reply 95% of guest messages in any language — Thai context aware' },
  'chat.auto': { th: 'อัตโนมัติ 95%', en: '95% Auto' },
  'chat.welcome': { th: 'สวัสดีค่ะ! AI พร้อมตอบแขกแล้ว', en: 'Hello! AI is ready to reply guests' },
  'chat.welcome_sub': { th: 'ลองถามคำถามที่แขกมักจะถาม — AI จะตอบอัตโนมัติพร้อมแสดง confidence score', en: 'Try asking common guest questions — AI auto-replies with confidence scores' },
  'chat.placeholder': { th: 'พิมพ์ข้อความแขก (ไทย/อังกฤษ)...', en: 'Type a guest message (Thai/English)...' },
  'chat.confidence': { th: 'ความมั่นใจ', en: 'Confidence' },
  'chat.context': { th: 'บริบท', en: 'Context' },
  'chat.ai_mode': { th: 'AI ตอบอัตโนมัติ', en: 'AI Auto-reply' },
  'chat.edit_reply': { th: 'แก้ไขคำตอบ', en: 'Edit Reply' },
  'chat.send_reply': { th: 'ส่งคำตอบ', en: 'Send Reply' },
  'chat.cancel': { th: 'ยกเลิก', en: 'Cancel' },
  'chat.save': { th: 'บันทึก', en: 'Save' },
  'chat.edited': { th: 'แก้ไขแล้ว', en: 'Edited' },
  'chat.platform': { th: 'แพลตฟอร์ม', en: 'Platform' },
  'timeline.replied': { th: 'ตอบแล้ว', en: 'Replied' },
  'detail.edit_response': { th: 'แก้ไขคำตอบ', en: 'Edit Response' },
  'detail.platform_source': { th: 'แพลตฟอร์ม', en: 'Platform' },

  // Landing Page
  'landing.nav.features': { th: 'ฟีเจอร์', en: 'Features' },
  'landing.nav.pricing': { th: 'ราคา', en: 'Pricing' },
  'landing.nav.testimonials': { th: 'รีวิว', en: 'Reviews' },
  'landing.nav.demo': { th: 'ทดลองใช้ฟรี', en: 'Try Free' },
  'landing.nav.login': { th: 'เข้าสู่ระบบ', en: 'Login' },
  'landing.hero.badge': { th: '🏆 ระบบจัดการที่พักอัจฉริยะอันดับ 1 ของไทย', en: '🏆 Thailand\'s #1 Intelligent Property OS' },
  'landing.hero.title1': { th: 'นอนหลับสบาย', en: 'Sleep Tight.' },
  'landing.hero.title2': { th: 'ระบบทำงานแทน', en: 'We Run It.' },
  'landing.hero.subtitle': { th: 'ระบบอัจฉริยะที่ทำงานแทนเจ้าของที่พัก 100% — ไม่ต้องรับสาย ไม่ต้องจัดการเอง ไม่ต้องกลัวกฎหมาย', en: 'The AI-powered system that runs your property 100% — no calls, no manual work, no legal worries' },
  'landing.hero.cta': { th: 'เริ่มใช้ฟรี — ไม่ต้องใส่บัตร', en: 'Start Free — No Credit Card' },
  'landing.hero.cta2': { th: 'ดูตัวอย่าง Dashboard', en: 'View Demo Dashboard' },
  'landing.hero.stat1': { th: 'เจ้าของใช้งาน', en: 'Active Owners' },
  'landing.hero.stat2': { th: 'ที่พักจัดการ', en: 'Properties Managed' },
  'landing.hero.stat3': { th: 'ลดงาน manual', en: 'Less Manual Work' },
  'landing.hero.stat4': { th: 'รองรับภาษา', en: 'Languages' },
  'landing.features.title': { th: 'ทำไมต้อง VillaFlow?', en: 'Why VillaFlow?' },
  'landing.features.subtitle': { th: '8 โมดูลอัจฉริยะที่ไม่เหมือนใครในโลก — สร้างจาก pain จริงของเจ้าของที่พักไทย', en: '8 intelligent modules unlike anything else — built from real Thai property owner pain points' },
  'landing.f1.title': { th: 'AI Chat Brain', en: 'AI Chat Brain' },
  'landing.f1.desc': { th: 'ตอบแขกอัตโนมัติ 95% ทุกภาษา — เข้าใจบริบทไทย "สงกรานต์ราคาพุ่ง"', en: 'Auto-reply 95% of guest messages in any language — understands Thai context' },
  'landing.f2.title': { th: 'Zero-Phone Journey', en: 'Zero-Phone Journey' },
  'landing.f2.desc': { th: 'จองถึงเช็คเอาท์ ไม่ต้องเจ้าของคุย — QR เช็คอิน + คู่มืออัตโนมัติ', en: 'Book to checkout without owner contact — QR check-in + auto guide' },
  'landing.f3.title': { th: 'Overbooking Shield', en: 'Overbooking Shield' },
  'landing.f3.desc': { th: 'Sync Airbnb/Booking/LINE real-time — AI บล็อกจองซ้ำอัตโนมัติ', en: 'Real-time Airbnb/Booking/LINE sync — AI blocks double bookings' },
  'landing.f4.title': { th: 'Damage AI', en: 'Damage AI' },
  'landing.f4.desc': { th: 'ตรวจความเสียหายด้วย AI + เรียกเก็บ PromptPay/Stripe อัตโนมัติ', en: 'AI damage detection + auto charge via PromptPay/Stripe' },
  'landing.f5.title': { th: 'Thai Ops Hub', en: 'Thai Ops Hub' },
  'landing.f5.desc': { th: 'แอปแม่บ้านภาษาไทย — สแกน QR เช็คลิสต์ + สร้าง task อัตโนมัติ', en: 'Thai-language housekeeper app — QR checklist + auto task creation' },
  'landing.f6.title': { th: 'Regulatory AI', en: 'Regulatory AI' },
  'landing.f6.desc': { th: 'TM30/TDAC อัตโนมัติ + เตือน 24 ชม. + export ภาษีปุ่มเดียว', en: 'Auto TM30/TDAC + 24hr alerts + one-click tax export' },
  'landing.f7.title': { th: 'Community Network', en: 'Community Network' },
  'landing.f7.desc': { th: 'เชื่อมเจ้าของในพื้นที่ — แชร์แม่บ้าน ช่าง เคล็ดลับฤดูฝน', en: 'Connect local owners — share staff, vendors & seasonal tips' },
  'landing.f8.title': { th: 'Owner Dashboard', en: 'Owner Dashboard' },
  'landing.f8.desc': { th: 'สรุปรายได้ + occupancy + AI แนะนำราคา — พิมพ์ถามไทยได้', en: 'Revenue + occupancy + AI pricing — ask in Thai' },
  'landing.pricing.title': { th: 'ราคาที่เจ้าของเล็กก็ใช้ได้', en: 'Pricing Small Owners Love' },
  'landing.pricing.subtitle': { th: 'ถูกที่สุดในตลาด — ฟรีถาวรสำหรับ 1–3 ยูนิต', en: 'Most affordable in market — free forever for 1–3 units' },
  'landing.pricing.free': { th: 'ฟรีถาวร', en: 'Free Forever' },
  'landing.pricing.free.price': { th: '฿0', en: '฿0' },
  'landing.pricing.free.period': { th: '/เดือน', en: '/month' },
  'landing.pricing.free.desc': { th: '1–3 ยูนิต · ทุกฟีเจอร์หลัก', en: '1–3 units · All core features' },
  'landing.pricing.free.f1': { th: 'AI Chat ตอบแขกอัตโนมัติ', en: 'AI Auto-reply for guests' },
  'landing.pricing.free.f2': { th: 'Zero-Phone Guest Journey', en: 'Zero-Phone Guest Journey' },
  'landing.pricing.free.f3': { th: 'Overbooking Shield', en: 'Overbooking Shield' },
  'landing.pricing.free.f4': { th: 'TM30/TDAC อัตโนมัติ', en: 'Auto TM30/TDAC' },
  'landing.pricing.free.f5': { th: 'Dashboard รายได้', en: 'Revenue Dashboard' },
  'landing.pricing.pro': { th: 'Pro', en: 'Pro' },
  'landing.pricing.pro.price': { th: '฿399', en: '฿399' },
  'landing.pricing.pro.desc': { th: 'ไม่จำกัดยูนิต · ทุกฟีเจอร์', en: 'Unlimited units · All features' },
  'landing.pricing.pro.f1': { th: 'ทุกอย่างใน Free +', en: 'Everything in Free +' },
  'landing.pricing.pro.f2': { th: 'Thai Ops Hub แม่บ้าน/ช่าง', en: 'Thai Ops Hub for staff' },
  'landing.pricing.pro.f3': { th: 'AI Dynamic Pricing', en: 'AI Dynamic Pricing' },
  'landing.pricing.pro.f4': { th: 'Export ภาษี ภ.ง.ด.', en: 'Tax Export (PND)' },
  'landing.pricing.pro.f5': { th: 'รองรับ 10+ ภาษา', en: '10+ Languages' },
  'landing.pricing.premium': { th: 'Premium', en: 'Premium' },
  'landing.pricing.premium.price': { th: '฿799', en: '฿799' },
  'landing.pricing.premium.desc': { th: 'Community + AI Damage + Priority', en: 'Community + AI Damage + Priority' },
  'landing.pricing.premium.f1': { th: 'ทุกอย่างใน Pro +', en: 'Everything in Pro +' },
  'landing.pricing.premium.f2': { th: 'Community Network', en: 'Community Network' },
  'landing.pricing.premium.f3': { th: 'AI Damage Detection', en: 'AI Damage Detection' },
  'landing.pricing.premium.f4': { th: 'Auto Charge PromptPay/Stripe', en: 'Auto Charge PromptPay/Stripe' },
  'landing.pricing.premium.f5': { th: 'Priority Support LINE', en: 'Priority LINE Support' },
  'landing.pricing.popular': { th: 'ยอดนิยม', en: 'Most Popular' },
  'landing.pricing.cta.free': { th: 'เริ่มใช้ฟรี', en: 'Start Free' },
  'landing.pricing.cta.pro': { th: 'ทดลอง 30 วัน ฟรี', en: '30-Day Free Trial' },
  'landing.pricing.cta.premium': { th: 'ทดลอง 30 วัน ฟรี', en: '30-Day Free Trial' },
  'landing.pricing.guarantee': { th: '✅ ทดลองฟรี 30 วัน · คืนเงิน 100% · ไม่ผูกสัญญา', en: '✅ 30-day free trial · 100% refund · No contract' },
  'landing.testimonials.title': { th: 'เจ้าของจริง พูดจริง', en: 'Real Owners, Real Results' },
  'landing.testimonials.subtitle': { th: 'ดูว่าเจ้าของที่พักในไทยใช้ VillaFlow แล้วชีวิตเปลี่ยนอย่างไร', en: 'See how Thai property owners transformed their lives with VillaFlow' },
  'landing.cta.title': { th: 'พร้อมนอนหลับสบายหรือยัง?', en: 'Ready to Sleep Tight?' },
  'landing.cta.subtitle': { th: 'เริ่มต้นฟรี วันนี้ — ระบบทำงานแทนคุณตั้งแต่วันแรก', en: 'Start free today — the system works for you from day one' },
  'landing.cta.button': { th: 'เริ่มใช้ VillaFlow ฟรี', en: 'Start VillaFlow Free' },
  'landing.footer.tagline': { th: 'ระบบจัดการที่พักอัจฉริยะสำหรับเจ้าของไทย', en: 'Intelligent Property OS for Thai Owners' },
  'landing.footer.product': { th: 'ผลิตภัณฑ์', en: 'Product' },
  'landing.footer.support': { th: 'ช่วยเหลือ', en: 'Support' },
  'landing.footer.legal': { th: 'กฎหมาย', en: 'Legal' },
  'landing.suitable': { th: 'เหมาะกับทุกประเภทที่พัก', en: 'For Every Property Type' },
  'landing.suitable.subtitle': { th: 'วิลล่า · โรงแรม · คอนโด · หอพัก · บ้านเช่า · พูลวิลล่า', en: 'Villa · Hotel · Condo · Dormitory · Rental · Pool Villa' },
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
