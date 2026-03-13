import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Zap, TrendingUp, Users, Shield, Globe, Brain, Building2,
  MessageSquare, Calendar, FileText, ArrowRight, CheckCircle2,
  Smartphone, BarChart3, Target, Rocket, DollarSign, Clock,
  Layers, Star, ChevronRight, Printer
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6 },
};

const Pitch = () => {
  return (
    <div className="min-h-screen bg-background font-display print:bg-white">
      {/* Print Button - hidden in print */}
      <div className="fixed top-4 right-4 z-50 print:hidden flex gap-2">
        <Link to="/">
          <Button variant="outline" size="sm">← กลับหน้าหลัก</Button>
        </Link>
        <Button size="sm" onClick={() => window.print()} className="bg-accent text-accent-foreground gap-1.5">
          <Printer size={14} /> พิมพ์ / PDF
        </Button>
      </div>

      {/* Cover Section */}
      <section className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-accent/5 via-background to-muted/30 relative overflow-hidden print:min-h-0 print:py-16">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-bold mb-8">
              <Zap size={16} /> Investor Pitch Deck 2026
            </div>
            <h1 className="font-extrabold text-5xl sm:text-6xl md:text-7xl text-foreground mb-6 leading-[1.1] tracking-tight">
              Villa<span className="text-accent">Flow</span>
            </h1>
            <p className="text-xl sm:text-2xl text-foreground/80 font-semibold mb-4">
              Thai Property Intelligence OS
            </p>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              ลดงานรับสาย ลดงานจุกจิก ลดความเสี่ยง<br />
              และเห็นกำไรรายยูนิตในที่เดียว
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {['Workflow Automation', 'AI ไทยแท้', 'Compliance Support', 'Community Local'].map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full bg-foreground/5 text-foreground font-semibold border border-border/50">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 px-6 print:py-12">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp}>
            <SectionLabel icon={Target} text="ปัญหาที่ตลาดเจอ" />
            <h2 className="font-extrabold text-3xl sm:text-4xl text-foreground mb-3">
              เจ้าของที่พักไทยกำลังจมอยู่กับ<span className="text-destructive">งาน Manual</span>
            </h2>
            <p className="text-muted-foreground text-base mb-10 max-w-2xl">
              เป้าหมายปี 2026: 36.7 ล้านนักท่องเที่ยวต่างชาติ / รายได้ท่องเที่ยวรวม ~2.78 ล้านล้านบาท
              แต่เจ้าของ 1-15 ยูนิตยังใช้ LINE + Excel — ตอบช้า จองหลุด รีวิวแย่
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'ตอบซ้ำซ้อน 24/7', desc: 'รับสายกลางดึง ตอบ LINE/FB/OTA คำถามเดิมซ้ำๆ', icon: MessageSquare, stat: '70%+ เวลาหมดกับงานตอบ' },
              { title: 'Overbooking จาก iCal ช้า', desc: 'จองซ้ำข้ามแพลตฟอร์ม — ลูกค้าโกรธ รีวิว 1 ดาว', icon: Calendar, stat: '15-20% เจอ overbooking' },
              { title: 'Compliance ยุ่งยาก', desc: 'TM30 ต้องแจ้งที่พักต่างชาติภายใน 24 ชม. / TDAC ระบบดิจิทัลที่ต้องจัดการ', icon: Shield, stat: 'เสี่ยงโดนปรับหากพลาดขั้นตอน' },
              { title: 'ไม่เห็นกำไรจริง', desc: 'ไม่รู้ว่ายูนิตไหนกำไร/ขาดทุน ค่าใช้จ่ายกระจัดกระจาย', icon: BarChart3, stat: '60% ไม่ track ค่าใช้จ่ายรายยูนิต' },
            ].map((p, i) => (
              <motion.div key={p.title} {...fadeUp} transition={{ delay: i * 0.08 }} className="glass-card p-6 border-l-4 border-destructive/40">
                <div className="flex items-start gap-3">
                  <p.icon size={20} className="text-destructive mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{p.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{p.desc}</p>
                    <span className="text-xs font-bold text-destructive bg-destructive/10 px-2.5 py-1 rounded-full">{p.stat}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 px-6 bg-muted/30 print:py-12 print:bg-transparent">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp}>
            <SectionLabel icon={Zap} text="โซลูชัน" />
            <h2 className="font-extrabold text-3xl sm:text-4xl text-foreground mb-3">
              VillaFlow: <span className="text-accent">ระบบ OS</span> ที่ลดงาน Manual อย่างมีนัยสำคัญ
            </h2>
            <p className="text-muted-foreground text-base mb-10 max-w-2xl">
              ไม่ใช่ PMS ทั่วไป — แต่เป็น Operating System ที่รวม AI, Automation, Compliance Support และ Community ไว้ในที่เดียว
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Brain, title: 'AI Chat Brain', desc: 'รองรับ automate คำถามที่พบบ่อยและ workflow การสื่อสารหลายภาษา — เข้าใจบริบทไทย', color: 'text-accent' },
              { icon: Smartphone, title: 'Self-Service Journey', desc: 'แขก Self-Service ตั้งแต่จองถึง Check-out — เจ้าของเข้าจัดการเฉพาะเคสพิเศษ', color: 'text-accent' },
              { icon: Shield, title: 'Overbooking Shield', desc: 'Sync Airbnb/Booking/LINE real-time — บล็อกจองซ้ำอัตโนมัติ', color: 'text-accent' },
              { icon: FileText, title: 'Compliance Support', desc: 'TM30/TDAC workflow support, reminders, pre-filled submission flows + Export ภาษี', color: 'text-accent' },
              { icon: Users, title: 'Community Network', desc: 'เชื่อมเจ้าของในพื้นที่เดียวกัน แชร์แม่บ้าน/ช่าง/เคล็ดลับ', color: 'text-accent' },
              { icon: BarChart3, title: 'Finance Dashboard', desc: 'กำไรรายยูนิต + AI แนะนำราคา + พิมพ์ถามไทยได้', color: 'text-accent' },
            ].map((s, i) => (
              <motion.div key={s.title} {...fadeUp} transition={{ delay: i * 0.06 }} className="glass-card p-6 group hover:ring-1 hover:ring-accent/20">
                <s.icon size={24} className={`${s.color} mb-3 transition-transform group-hover:scale-110`} />
                <h3 className="font-bold text-foreground mb-1.5">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Size */}
      <section className="py-20 px-6 print:py-12">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp}>
            <SectionLabel icon={Globe} text="โอกาสทางตลาด" />
            <h2 className="font-extrabold text-3xl sm:text-4xl text-foreground mb-10">
              ตลาดที่พักไทย <span className="text-accent">มูลค่ามหาศาล</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-5 mb-8">
            {[
              { label: 'TAM', value: '฿120B+', desc: 'มูลค่าตลาดที่พักไทยทั้งหมด', sub: 'วิลล่า/คอนโด/โรงแรมเล็ก/หอพัก' },
              { label: 'SAM', value: '฿18B', desc: 'เจ้าของ 1-30 ยูนิตที่ต้องการ SaaS', sub: '~120,000 ราย ทั่วประเทศ' },
              { label: 'SOM (Y3)', value: '฿86.4M', desc: 'เป้าหมาย 3 ปีแรก', sub: '~6,000 ราย × ฿1,200 ARPU/mo' },
            ].map((m, i) => (
              <motion.div key={m.label} {...fadeUp} transition={{ delay: i * 0.1 }} className="glass-card p-6 text-center">
                <span className="text-xs font-bold text-accent bg-accent/10 px-3 py-1 rounded-full">{m.label}</span>
                <div className="font-extrabold text-4xl text-foreground mt-4 mb-2">{m.value}</div>
                <p className="text-sm font-semibold text-foreground mb-1">{m.desc}</p>
                <p className="text-xs text-muted-foreground">{m.sub}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="glass-card p-6 bg-accent/5 border border-accent/20">
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <TrendingUp size={18} className="text-accent" /> ทำไมตอนนี้?
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                'เป้าหมาย 36.7 ล้านนักท่องเที่ยว ปี 2026 — supply พุ่ง แข่งขันสูง',
                'Compliance เข้มขึ้น — เจ้าของต้องการ workflow support',
                'คู่แข่ง Global แพง/ไม่ local — โอกาสสำหรับ Thai-first',
                'AI ถูกลง 10x — ต้นทุนต่ำ สเกลได้',
              ].map((r) => (
                <div key={r} className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 size={16} className="text-accent mt-0.5 flex-shrink-0" />
                  {r}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Competitive Advantage */}
      <section className="py-20 px-6 bg-muted/30 print:py-12 print:bg-transparent">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp}>
            <SectionLabel icon={Star} text="ข้อได้เปรียบ" />
            <h2 className="font-extrabold text-3xl sm:text-4xl text-foreground mb-10">
              ทำไม <span className="text-accent">VillaFlow</span> ชนะ
            </h2>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-bold text-foreground">Feature</th>
                  <th className="text-center py-3 px-4 font-bold text-accent">VillaFlow</th>
                  <th className="text-center py-3 px-4 font-bold text-muted-foreground">Guesty / Hostaway</th>
                  <th className="text-center py-3 px-4 font-bold text-muted-foreground">Thai PMS ทั่วไป</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['AI ตอบภาษาไทย + 10 ภาษา', '✅', '🔶 EN only', '❌'],
                  ['Zero-Phone (AI ทำงานแทน 95%)', '✅', '❌', '❌'],
                  ['TM30 / TDAC Auto', '✅', '❌', '🔶 Manual'],
                  ['Community เจ้าของในพื้นที่', '✅', '❌', '❌'],
                  ['LINE + PromptPay Native', '✅', '❌', '🔶 บางส่วน'],
                  ['ราคาเริ่ม (ต่อเดือน)', '฿0 ฟรี', '$30-100+', '฿500-1,500'],
                  ['Damage AI Detection', '✅', '❌', '❌'],
                  ['Finance แยกรายยูนิต', '✅', '🔶', '❌'],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-3 px-4 font-semibold text-foreground">{row[0]}</td>
                    <td className="py-3 px-4 text-center text-accent font-bold">{row[1]}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{row[2]}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Business Model */}
      <section className="py-20 px-6 print:py-12">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp}>
            <SectionLabel icon={DollarSign} text="โมเดลธุรกิจ" />
            <h2 className="font-extrabold text-3xl sm:text-4xl text-foreground mb-10">
              รายได้ <span className="text-accent">Subscription + Marketplace</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { plan: 'Free', price: '฿0', units: '1 ยูนิต', desc: 'ฟรีถาวร ทุกฟีเจอร์พื้นฐาน' },
              { plan: 'Starter', price: '฿399', units: '1-3 ยูนิต', desc: 'เจ้าของเล็ก เริ่มต้นง่าย' },
              { plan: 'Pro', price: '฿990', units: '4-10 ยูนิต', desc: 'ฟีเจอร์ครบ + AI เต็มรูปแบบ' },
              { plan: 'Business', price: '฿2,490', units: '11-30 ยูนิต', desc: 'Multi-property + Priority' },
            ].map((p, i) => (
              <motion.div key={p.plan} {...fadeUp} transition={{ delay: i * 0.08 }} className="glass-card p-5">
                <span className="text-xs font-bold text-accent">{p.plan}</span>
                <div className="font-extrabold text-3xl text-foreground mt-2">{p.price}</div>
                <div className="text-xs text-muted-foreground mb-2">/ เดือน · {p.units}</div>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="glass-card p-6">
            <h3 className="font-bold text-foreground mb-4">รายได้เสริม (Additional Revenue Streams)</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { title: 'AI Usage Packs', desc: 'แพ็คเกจ AI เพิ่มเติมสำหรับ heavy users' },
                { title: 'Marketplace Fee', desc: 'ค่าคอมมิชชันจากการจับคู่แม่บ้าน/ช่าง 10-15%' },
                { title: 'Payment Processing', desc: 'ค่าธรรมเนียมระบบชำระเงิน 1.5-2.5%' },
              ].map((r) => (
                <div key={r.title} className="p-4 rounded-xl bg-muted/50">
                  <h4 className="font-bold text-sm text-foreground mb-1">{r.title}</h4>
                  <p className="text-xs text-muted-foreground">{r.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Traction & Roadmap */}
      <section className="py-20 px-6 bg-muted/30 print:py-12 print:bg-transparent">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp}>
            <SectionLabel icon={Rocket} text="Roadmap 12 เดือน" />
            <h2 className="font-extrabold text-3xl sm:text-4xl text-foreground mb-10">
              จาก MVP สู่ <span className="text-accent">SaaS Scaling</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { q: 'Q1', title: 'MVP & Pilot', items: ['พัฒนา Core Product', 'ทดสอบ 20 รายนำร่อง', 'ปรับ Pricing & UX'], status: 'กำลังดำเนินการ' },
              { q: 'Q2', title: 'Dashboard & Accounting', items: ['เพิ่มระบบบัญชี', 'ระบบ Referral', 'เริ่ม Revenue'], status: 'วางแผน' },
              { q: 'Q3', title: 'Integrations', items: ['เชื่อม Airbnb/Booking API', 'รายงานการเงินรายยูนิต', 'LINE Official Account'], status: 'วางแผน' },
              { q: 'Q4', title: 'Scale & Partners', items: ['Unit Economics ดี', 'Partnership ท่องเที่ยว', 'เตรียม Series A'], status: 'วางแผน' },
            ].map((phase, i) => (
              <motion.div key={phase.q} {...fadeUp} transition={{ delay: i * 0.08 }} className="glass-card p-5 relative">
                <div className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full mb-3 ${
                  i === 0 ? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'
                }`}>
                  <Clock size={12} /> {phase.q}
                </div>
                <h3 className="font-bold text-foreground mb-3">{phase.title}</h3>
                <ul className="space-y-2">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <ChevronRight size={14} className="mt-0.5 flex-shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
                <span className={`block mt-4 text-xs font-semibold ${i === 0 ? 'text-accent' : 'text-muted-foreground'}`}>
                  {phase.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Projections */}
      <section className="py-20 px-6 print:py-12">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp}>
            <SectionLabel icon={TrendingUp} text="ประมาณการรายได้" />
            <h2 className="font-extrabold text-3xl sm:text-4xl text-foreground mb-10">
              Financial <span className="text-accent">Projections</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-5 mb-8">
            {[
              { year: 'ปีที่ 1', users: '500 ราย', mrr: '฿500K', arr: '฿6M', highlight: false },
              { year: 'ปีที่ 2', users: '2,500 ราย', mrr: '฿3M', arr: '฿36M', highlight: false },
              { year: 'ปีที่ 3', users: '6,000 ราย', mrr: '฿15M', arr: '฿180M', highlight: true },
            ].map((y, i) => (
              <motion.div key={y.year} {...fadeUp} transition={{ delay: i * 0.1 }}
                className={`glass-card p-6 text-center ${y.highlight ? 'ring-2 ring-accent' : ''}`}>
                <span className="text-xs font-bold text-accent">{y.year}</span>
                <div className="font-extrabold text-3xl text-foreground mt-3">{y.arr}</div>
                <p className="text-xs text-muted-foreground mt-1">ARR</p>
                <div className="border-t border-border/50 mt-4 pt-4 grid grid-cols-2 gap-2">
                  <div>
                    <div className="font-bold text-sm text-foreground">{y.users}</div>
                    <p className="text-xs text-muted-foreground">ผู้ใช้</p>
                  </div>
                  <div>
                    <div className="font-bold text-sm text-foreground">{y.mrr}</div>
                    <p className="text-xs text-muted-foreground">MRR</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="glass-card p-6">
            <h3 className="font-bold text-foreground mb-3">Unit Economics (เป้าหมาย)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { metric: 'ARPU', value: '฿1,200/mo', desc: 'ค่าเฉลี่ยต่อราย' },
                { metric: 'CAC', value: '฿800', desc: 'ต้นทุนได้ลูกค้า' },
                { metric: 'LTV', value: '฿43,200', desc: 'มูลค่าตลอดอายุ (36 mo)' },
                { metric: 'LTV:CAC', value: '54x', desc: 'คุ้มค่าการลงทุน' },
              ].map((u) => (
                <div key={u.metric} className="text-center p-3 rounded-xl bg-muted/50">
                  <div className="text-xs font-bold text-accent mb-1">{u.metric}</div>
                  <div className="font-extrabold text-xl text-foreground">{u.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{u.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Ask */}
      <section className="py-20 px-6 bg-gradient-to-br from-accent/5 via-background to-muted/30 print:py-12 print:bg-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <SectionLabel icon={Layers} text="การระดมทุน" />
            <h2 className="font-extrabold text-3xl sm:text-4xl text-foreground mb-4">
              Seed Round: <span className="text-accent">฿10M</span>
            </h2>
            <p className="text-muted-foreground text-base mb-10 max-w-xl mx-auto">
              เพื่อขยาย Product, ทีม และฐานผู้ใช้ใน 12 เดือนแรก
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              { pct: '50%', title: 'Product & Engineering', desc: 'พัฒนาฟีเจอร์ + Integrations + AI' },
              { pct: '30%', title: 'Sales & Marketing', desc: 'GTM + Community Building + Referral' },
              { pct: '20%', title: 'Operations', desc: 'ทีมงาน + Legal + Infrastructure' },
            ].map((a, i) => (
              <motion.div key={a.title} {...fadeUp} transition={{ delay: i * 0.1 }} className="glass-card p-6">
                <div className="font-extrabold text-4xl text-accent mb-2">{a.pct}</div>
                <h3 className="font-bold text-foreground mb-1">{a.title}</h3>
                <p className="text-sm text-muted-foreground">{a.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp}>
            <div className="glass-card p-8 bg-accent/5 border border-accent/20 inline-block">
              <p className="text-lg font-bold text-foreground mb-4">
                "VillaFlow จะทำให้เจ้าของที่พักไทยนอนหลับสบาย —<br/>
                ไม่ต้องรับสาย ไม่ต้อง manual ไม่ต้องกลัวกฎหมาย"
              </p>
              <div className="flex items-center justify-center gap-3">
                <Link to="/dashboard">
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold gap-2 h-12 px-6">
                    ดู Live Demo <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="outline" className="font-bold h-12 px-6">
                    ดูราคา
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/50 text-center print:py-4">
        <p className="text-sm text-muted-foreground">
          VillaFlow © 2026 · Thai Property Intelligence OS · <a href="mailto:hello@villaflow.co" className="text-accent hover:underline">hello@villaflow.co</a>
        </p>
      </footer>
    </div>
  );
};

const SectionLabel = ({ icon: Icon, text }: { icon: any; text: string }) => (
  <div className="flex items-center gap-2 mb-4">
    <Icon size={16} className="text-accent" />
    <span className="text-xs font-bold text-accent uppercase tracking-wider">{text}</span>
  </div>
);

export default Pitch;
