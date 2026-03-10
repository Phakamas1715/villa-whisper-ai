import { mockTimeline, propertyImages } from '@/data/mockData';
import { Shield, CheckCircle2, Clock, AlertTriangle, FileText, Download, Eye, Printer, Globe, User, MapPin, CalendarDays, Hash, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

type DocType = 'tm30' | 'tdac' | 'tax' | null;

const RegulatoryView = () => {
  const { t, language } = useLanguage();
  const [previewDoc, setPreviewDoc] = useState<DocType>(null);
  const items = mockTimeline.filter((ti) => ti.type === 'regulatory');
  const pending = items.filter((ti) => ti.status === 'pending');
  const completed = items.filter((ti) => ti.status === 'completed');

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Shield size={20} className="text-accent" />
        <h2 className="font-display font-bold text-lg text-foreground">{t('regulatory.title')}</h2>
      </div>
      <p className="font-body text-xs text-muted-foreground mb-5">{t('regulatory.subtitle')}</p>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <motion.button onClick={() => setPreviewDoc('tm30')} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card flex flex-col items-center justify-center py-5 hover:ring-2 hover:ring-accent/30 transition-all">
          <Shield size={24} className="text-accent mb-2" />
          <span className="font-display text-sm font-bold text-foreground">TM30</span>
          <span className="font-display text-[10px] text-muted-foreground mt-0.5">{t('regulatory.auto_generate')}</span>
        </motion.button>
        <motion.button onClick={() => setPreviewDoc('tdac')} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.05 }} className="glass-card flex flex-col items-center justify-center py-5 hover:ring-2 hover:ring-villa-ocean/30 transition-all">
          <Globe size={24} className="text-villa-ocean mb-2" />
          <span className="font-display text-sm font-bold text-foreground">TDAC</span>
          <span className="font-display text-[10px] text-muted-foreground mt-0.5">{t('regulatory.guest_report')}</span>
        </motion.button>
        <motion.button onClick={() => setPreviewDoc('tax')} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="glass-card flex flex-col items-center justify-center py-5 hover:ring-2 hover:ring-villa-gold/30 transition-all">
          <FileText size={24} className="text-villa-gold mb-2" />
          <span className="font-display text-sm font-bold text-foreground">{language === 'th' ? 'ภ.ง.ด.' : 'PND'}</span>
          <span className="font-display text-[10px] text-muted-foreground mt-0.5">{t('regulatory.export_tax')}</span>
        </motion.button>
      </div>

      {/* Document Preview Modal */}
      <AnimatePresence>
        {previewDoc && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }} className="mb-6">
            {previewDoc === 'tm30' && <TM30Preview t={t} language={language} onClose={() => setPreviewDoc(null)} />}
            {previewDoc === 'tdac' && <TDACPreview t={t} language={language} onClose={() => setPreviewDoc(null)} />}
            {previewDoc === 'tax' && <TaxPreview t={t} language={language} onClose={() => setPreviewDoc(null)} />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completed Documents History */}
      <div className="mb-6">
        <h3 className="section-header flex items-center gap-1"><CheckCircle2 size={12} className="text-accent" /> {t('regulatory.recent_docs')} (3)</h3>
        <div className="space-y-2">
          {[
            { type: 'TM30', guest: 'Ms. Kim (Korea)', property: 'Villa Hillside', date: '2026-02-28', status: 'submitted' },
            { type: 'TDAC', guest: language === 'th' ? 'รายงานรอบ ม.ค.-ก.พ.' : 'Jan-Feb Report', property: language === 'th' ? 'ทุกที่พัก' : 'All Properties', date: '2026-03-01', status: 'submitted' },
            { type: language === 'th' ? 'ภ.ง.ด.90' : 'PND 90', guest: language === 'th' ? 'รอบปีภาษี 2025' : 'Tax Year 2025', property: '', date: '2026-02-15', status: 'filed' },
          ].map((doc, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }} className="glass-card p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${doc.type === 'TM30' ? 'bg-accent/10' : doc.type === 'TDAC' ? 'bg-villa-ocean/10' : 'bg-villa-gold/10'}`}>
                {doc.type === 'TM30' ? <Shield size={18} className="text-accent" /> : doc.type === 'TDAC' ? <Globe size={18} className="text-villa-ocean" /> : <FileText size={18} className="text-villa-gold" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-display text-sm font-bold text-foreground">{doc.type}</span>
                  <span className="badge-accent">{doc.status === 'submitted' ? (language === 'th' ? '✓ ส่งแล้ว' : '✓ Submitted') : (language === 'th' ? '✓ ยื่นแล้ว' : '✓ Filed')}</span>
                </div>
                <p className="font-body text-xs text-muted-foreground truncate">{doc.guest}{doc.property ? ` · ${doc.property}` : ''}</p>
                <p className="font-display text-[10px] text-muted-foreground">{doc.date}</p>
              </div>
              <button className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
                <Eye size={14} className="text-muted-foreground" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pending Actions */}
      {pending.length > 0 && (
        <div className="mb-6">
          <h3 className="section-header flex items-center gap-1"><AlertTriangle size={12} className="text-destructive" /> {t('regulatory.action_required')} ({pending.length})</h3>
          <div className="space-y-2.5">
            {pending.map((item) => {
              const img = propertyImages[item.data.property as string];
              return (
                <div key={item.id} className="glass-card p-0 overflow-hidden">
                  {img && (
                    <div className="relative h-28 overflow-hidden">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-r from-destructive/20 to-transparent" />
                      <div className="absolute top-2.5 left-3"><span className="badge-destructive shadow-sm">{t('regulatory.urgent')}</span></div>
                    </div>
                  )}
                  <div className="p-4">
                    <h4 className="font-display text-sm font-bold text-foreground">{item.title}</h4>
                    <p className="font-body text-xs text-muted-foreground mt-1">{item.subtitle}</p>
                    {item.data.deadline && <p className="badge-destructive inline-block mt-2">{t('detail.deadline')}: {item.data.deadline as string}</p>}
                    <Button size="sm" className="mt-3 w-full bg-accent text-accent-foreground hover:bg-accent/90 font-display font-bold text-xs h-10">{t('regulatory.submit_now')}</Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {completed.length > 0 && (
        <div>
          <h3 className="section-header flex items-center gap-1"><CheckCircle2 size={12} className="text-accent" /> {t('regulatory.completed')} ({completed.length})</h3>
          <div className="space-y-2">
            {completed.map((item) => (
              <div key={item.id} className="glass-card p-4 opacity-70">
                <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-accent" /><span className="font-display text-sm text-foreground">{item.title}</span></div>
                <p className="font-body text-xs text-muted-foreground mt-1">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ─── TM30 Document Preview ─── */
function TM30Preview({ t, language, onClose }: { t: (k: string) => string; language: string; onClose: () => void }) {
  return (
    <div className="glass-card overflow-hidden">
      <div className="bg-accent/5 border-b border-accent/20 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield size={18} className="text-accent" />
          <span className="font-display text-sm font-bold text-foreground">{t('regulatory.tm30_preview')}</span>
          <span className="badge-accent">{t('regulatory.auto_filled')}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80"><Printer size={14} className="text-muted-foreground" /></button>
          <button className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80"><Download size={14} className="text-muted-foreground" /></button>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-destructive/10 hover:text-destructive text-muted-foreground font-display text-xs font-bold">✕</button>
        </div>
      </div>
      
      {/* Document body */}
      <div className="p-5 bg-card">
        <div className="border-2 border-border rounded-xl p-5 space-y-5 bg-background">
          {/* Header */}
          <div className="text-center border-b border-border pb-4">
            <p className="font-display text-[10px] text-muted-foreground uppercase tracking-wider">{language === 'th' ? 'แบบแจ้งที่พักอาศัยของคนต่างด้าว' : 'Notification of Residence for Foreign Nationals'}</p>
            <h3 className="font-display text-lg font-extrabold text-foreground mt-1">{language === 'th' ? 'แบบ ตม.30' : 'Form TM.30'}</h3>
            <p className="font-display text-[10px] text-muted-foreground mt-1">{language === 'th' ? 'ตามมาตรา 38 แห่ง พ.ร.บ.คนเข้าเมือง พ.ศ.2522' : 'Under Section 38, Immigration Act B.E.2522'}</p>
          </div>

          {/* Owner Info */}
          <div>
            <p className="font-display text-[10px] font-bold text-accent uppercase tracking-wider mb-2">{language === 'th' ? 'ข้อมูลเจ้าของ/ผู้แจ้ง' : 'Owner / Notifier Information'}</p>
            <div className="grid grid-cols-2 gap-3">
              <DocField icon={User} label={language === 'th' ? 'ชื่อเจ้าของ' : 'Owner Name'} value="Phakamas Villaflow Co., Ltd." />
              <DocField icon={Hash} label={language === 'th' ? 'เลขที่ใบอนุญาต' : 'License No.'} value="PKT-2026-00451" />
              <DocField icon={Building2} label={language === 'th' ? 'ที่พัก' : 'Property'} value="Villa Seaview" />
              <DocField icon={MapPin} label={language === 'th' ? 'ที่อยู่' : 'Address'} value={language === 'th' ? '123/4 ม.5 ต.นาจอมเทียน อ.สัตหีบ จ.ชลบุรี' : '123/4 Moo 5, Na Jomtien, Sattahip, Chonburi'} />
            </div>
          </div>

          {/* Guest Info */}
          <div>
            <p className="font-display text-[10px] font-bold text-villa-ocean uppercase tracking-wider mb-2">{language === 'th' ? 'ข้อมูลผู้เข้าพัก' : 'Guest Information'}</p>
            <div className="grid grid-cols-2 gap-3">
              <DocField icon={User} label={language === 'th' ? 'ชื่อ-นามสกุล' : 'Full Name'} value="John Miller" />
              <DocField icon={Globe} label={language === 'th' ? 'สัญชาติ' : 'Nationality'} value="USA" />
              <DocField icon={Hash} label={language === 'th' ? 'เลขพาสปอร์ต' : 'Passport No.'} value="US-XXXX7892" />
              <DocField icon={CalendarDays} label={language === 'th' ? 'วันเข้าพัก' : 'Check-in Date'} value="2026-03-15" />
              <DocField icon={CalendarDays} label={language === 'th' ? 'วันออก' : 'Check-out Date'} value="2026-03-20" />
              <DocField icon={Clock} label={language === 'th' ? 'กำหนดแจ้ง' : 'Deadline'} value="2026-03-16 (24 hrs)" />
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-villa-gold/5 border border-villa-gold/20">
            <Clock size={16} className="text-villa-gold" />
            <span className="font-display text-xs font-semibold text-villa-gold">{language === 'th' ? 'สถานะ: รอเจ้าของกดยืนยันเพื่อส่งออนไลน์' : 'Status: Awaiting owner confirmation to submit online'}</span>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 font-display font-bold text-xs h-10">
            <CheckCircle2 size={14} className="mr-1.5" />{language === 'th' ? 'ยืนยันและส่ง TM30' : 'Confirm & Submit TM30'}
          </Button>
          <Button variant="outline" className="font-display text-xs h-10">
            <Eye size={14} className="mr-1.5" />{language === 'th' ? 'แก้ไข' : 'Edit'}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ─── TDAC Report Preview ─── */
function TDACPreview({ t, language, onClose }: { t: (k: string) => string; language: string; onClose: () => void }) {
  const guests = [
    { name: 'John Miller', nationality: 'USA', passport: 'US-XXXX7892', checkIn: '2026-03-15', checkOut: '2026-03-20', property: 'Villa Seaview' },
    { name: 'Ms. Kim Soo-yeon', nationality: 'Korea', passport: 'KR-XXXX3341', checkIn: '2026-03-22', checkOut: '2026-03-25', property: 'Villa Hillside' },
    { name: 'Takeshi Tanaka', nationality: 'Japan', passport: 'JP-XXXX5510', checkIn: '2026-03-02', checkOut: '2026-03-09', property: 'Villa Hillside' },
  ];

  return (
    <div className="glass-card overflow-hidden">
      <div className="bg-villa-ocean/5 border-b border-villa-ocean/20 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe size={18} className="text-villa-ocean" />
          <span className="font-display text-sm font-bold text-foreground">{t('regulatory.tdac_preview')}</span>
          <span className="badge-muted">{language === 'th' ? 'รอบ มี.ค. 2026' : 'Period: Mar 2026'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80"><Download size={14} className="text-muted-foreground" /></button>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-destructive/10 hover:text-destructive text-muted-foreground font-display text-xs font-bold">✕</button>
        </div>
      </div>
      
      <div className="p-5 bg-card">
        <div className="border-2 border-border rounded-xl p-5 bg-background">
          <div className="text-center border-b border-border pb-3 mb-4">
            <p className="font-display text-[10px] text-muted-foreground uppercase tracking-wider">{language === 'th' ? 'รายงานแขกต่างชาติประจำงวด (ทุก 2 เดือน)' : 'Bi-monthly Foreign Guest Report (TDAC)'}</p>
            <h3 className="font-display text-base font-extrabold text-foreground mt-1">{language === 'th' ? 'รายงานแขก TDAC' : 'TDAC Guest Report'}</h3>
          </div>

          {/* Guest Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="font-display text-[10px] text-muted-foreground uppercase tracking-wider py-2 pr-3">#</th>
                  <th className="font-display text-[10px] text-muted-foreground uppercase tracking-wider py-2 pr-3">{language === 'th' ? 'ชื่อ' : 'Name'}</th>
                  <th className="font-display text-[10px] text-muted-foreground uppercase tracking-wider py-2 pr-3">{language === 'th' ? 'สัญชาติ' : 'Nationality'}</th>
                  <th className="font-display text-[10px] text-muted-foreground uppercase tracking-wider py-2 pr-3">{language === 'th' ? 'พาสปอร์ต' : 'Passport'}</th>
                  <th className="font-display text-[10px] text-muted-foreground uppercase tracking-wider py-2 pr-3">{language === 'th' ? 'เข้าพัก' : 'Check-in'}</th>
                  <th className="font-display text-[10px] text-muted-foreground uppercase tracking-wider py-2">{language === 'th' ? 'ที่พัก' : 'Property'}</th>
                </tr>
              </thead>
              <tbody>
                {guests.map((g, i) => (
                  <tr key={i} className="border-b border-border/30">
                    <td className="font-display text-xs text-muted-foreground py-2.5 pr-3">{i + 1}</td>
                    <td className="font-display text-xs font-semibold text-foreground py-2.5 pr-3">{g.name}</td>
                    <td className="font-display text-xs text-foreground py-2.5 pr-3">{g.nationality}</td>
                    <td className="font-display text-[11px] text-muted-foreground py-2.5 pr-3">{g.passport}</td>
                    <td className="font-display text-[11px] text-muted-foreground py-2.5 pr-3">{g.checkIn}</td>
                    <td className="font-display text-xs text-foreground py-2.5">{g.property}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center gap-2 p-3 rounded-xl bg-accent/5 border border-accent/15">
            <CheckCircle2 size={16} className="text-accent" />
            <span className="font-display text-xs text-accent font-semibold">{language === 'th' ? 'ข้อมูลครบ 3 รายการ พร้อมส่ง' : '3 records complete, ready to submit'}</span>
          </div>
        </div>

        <Button className="w-full mt-4 bg-villa-ocean text-accent-foreground hover:bg-villa-ocean/90 font-display font-bold text-xs h-10">
          <Globe size={14} className="mr-1.5" />{language === 'th' ? 'ส่งรายงาน TDAC' : 'Submit TDAC Report'}
        </Button>
      </div>
    </div>
  );
}

/* ─── Tax (ภ.ง.ด.) Preview ─── */
function TaxPreview({ t, language, onClose }: { t: (k: string) => string; language: string; onClose: () => void }) {
  const months = language === 'th'
    ? ['ต.ค.', 'พ.ย.', 'ธ.ค.', 'ม.ค.', 'ก.พ.', 'มี.ค.']
    : ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
  const revenues = [185000, 210000, 320000, 295000, 230000, 247500];
  const total = revenues.reduce((a, b) => a + b, 0);

  return (
    <div className="glass-card overflow-hidden">
      <div className="bg-villa-gold/5 border-b border-villa-gold/20 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-villa-gold" />
          <span className="font-display text-sm font-bold text-foreground">{t('regulatory.tax_preview')}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80"><Download size={14} className="text-muted-foreground" /></button>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-destructive/10 hover:text-destructive text-muted-foreground font-display text-xs font-bold">✕</button>
        </div>
      </div>
      
      <div className="p-5 bg-card">
        <div className="border-2 border-border rounded-xl p-5 bg-background">
          <div className="text-center border-b border-border pb-3 mb-4">
            <p className="font-display text-[10px] text-muted-foreground uppercase tracking-wider">{language === 'th' ? 'สรุปรายได้ประจำปีภาษี 2025-2026' : 'Annual Income Summary — Tax Year 2025-2026'}</p>
            <h3 className="font-display text-base font-extrabold text-foreground mt-1">{language === 'th' ? 'ภ.ง.ด. 90 — สรุปรายได้ค่าเช่า' : 'PND 90 — Rental Income Summary'}</h3>
          </div>

          <div className="space-y-2">
            {months.map((m, i) => (
              <div key={m} className="flex items-center justify-between py-2 border-b border-border/20">
                <span className="font-display text-xs text-foreground">{m}</span>
                <div className="flex-1 mx-4 h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(revenues[i] / 320000) * 100}%` }} transition={{ delay: i * 0.1, duration: 0.5 }} className="h-full rounded-full bg-villa-gold" />
                </div>
                <span className="font-display text-xs font-bold text-foreground">฿{revenues[i].toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-xl bg-villa-gold/5 border border-villa-gold/20">
            <div className="flex justify-between items-center mb-2">
              <span className="font-display text-xs text-muted-foreground">{language === 'th' ? 'รายได้รวม' : 'Total Income'}</span>
              <span className="font-display text-lg font-extrabold text-foreground">฿{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-display text-xs text-muted-foreground">{language === 'th' ? 'ค่าใช้จ่ายหักลดหย่อน (30%)' : 'Deductible Expenses (30%)'}</span>
              <span className="font-display text-sm font-semibold text-foreground">-฿{(total * 0.3).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-villa-gold/20">
              <span className="font-display text-xs font-bold text-foreground">{language === 'th' ? 'เงินได้สุทธิ' : 'Net Taxable Income'}</span>
              <span className="font-display text-lg font-extrabold text-villa-gold">฿{(total * 0.7).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button className="flex-1 bg-villa-gold text-accent-foreground hover:bg-villa-gold/90 font-display font-bold text-xs h-10">
            <Download size={14} className="mr-1.5" />{language === 'th' ? 'ดาวน์โหลด ภ.ง.ด.90' : 'Download PND 90'}
          </Button>
          <Button variant="outline" className="font-display text-xs h-10">
            <Printer size={14} className="mr-1.5" />{language === 'th' ? 'พิมพ์' : 'Print'}
          </Button>
        </div>
      </div>
    </div>
  );
}

function DocField({ icon: Icon, label, value }: { icon: typeof User; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <div className="w-7 h-7 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon size={12} className="text-muted-foreground" />
      </div>
      <div className="min-w-0">
        <span className="font-display text-[9px] text-muted-foreground block">{label}</span>
        <span className="font-display text-xs font-medium text-foreground block truncate">{value}</span>
      </div>
    </div>
  );
}

export default RegulatoryView;
