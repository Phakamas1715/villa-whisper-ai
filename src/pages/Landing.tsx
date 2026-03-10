import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  MessageCircle, Smartphone, Shield, Camera, ClipboardList,
  Scale, Users, BarChart3, Check, Globe, ArrowRight, Star,
  ChevronRight, Play, Zap, Building2, Hotel, Home, Warehouse
} from 'lucide-react';
import { Button } from '@/components/ui/button';

import landingHero from '@/assets/landing-hero.jpg';
import appMockup from '@/assets/landing-app-mockup.jpg';
import testimonial1 from '@/assets/testimonial-1.jpg';
import testimonial2 from '@/assets/testimonial-2.jpg';
import testimonial3 from '@/assets/testimonial-3.jpg';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6 },
};

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const Landing = () => {
  const { t, language, setLanguage } = useLanguage();

  const features = [
    { icon: MessageCircle, title: t('landing.f1.title'), desc: t('landing.f1.desc'), color: 'text-villa-ocean' },
    { icon: Smartphone, title: t('landing.f2.title'), desc: t('landing.f2.desc'), color: 'text-accent' },
    { icon: Shield, title: t('landing.f3.title'), desc: t('landing.f3.desc'), color: 'text-destructive' },
    { icon: Camera, title: t('landing.f4.title'), desc: t('landing.f4.desc'), color: 'text-villa-gold' },
    { icon: ClipboardList, title: t('landing.f5.title'), desc: t('landing.f5.desc'), color: 'text-villa-ocean' },
    { icon: Scale, title: t('landing.f6.title'), desc: t('landing.f6.desc'), color: 'text-accent' },
    { icon: Users, title: t('landing.f7.title'), desc: t('landing.f7.desc'), color: 'text-villa-gold' },
    { icon: BarChart3, title: t('landing.f8.title'), desc: t('landing.f8.desc'), color: 'text-primary' },
  ];

  const testimonials = [
    {
      img: testimonial1,
      name: language === 'th' ? 'คุณแพร' : 'Khun Prae',
      role: language === 'th' ? 'เจ้าของวิลล่า 5 หลัง · ภูเก็ต' : 'Owner of 5 Villas · Phuket',
      quote: language === 'th'
        ? '"ก่อนใช้ VillaFlow รับสายวันละ 20+ สาย ตอนนี้โทรศัพท์เงียบหมด แต่ booking เพิ่ม 35%!"'
        : '"Before VillaFlow, I took 20+ calls daily. Now my phone is silent, but bookings are up 35%!"',
      stars: 5,
    },
    {
      img: testimonial2,
      name: language === 'th' ? 'คุณวิชัย' : 'Khun Wichai',
      role: language === 'th' ? 'เจ้าของคอนโด 12 ยูนิต · พัทยา' : 'Owner of 12 Condos · Pattaya',
      quote: language === 'th'
        ? '"TM30 เมื่อก่อนลืมส่งโดนปรับ 2 ครั้ง ตอนนี้ VillaFlow ทำให้อัตโนมัติ ไม่เคยพลาดอีก"'
        : '"I got fined twice for late TM30. VillaFlow automates it — never missed again"',
      stars: 5,
    },
    {
      img: testimonial3,
      name: language === 'th' ? 'คุณนิด' : 'Khun Nid',
      role: language === 'th' ? 'เจ้าของหอพัก · ขอนแก่น' : 'Dormitory Owner · Khon Kaen',
      quote: language === 'th'
        ? '"ราคาฟรีสำหรับ 3 ยูนิต ทำให้ลองใช้ไม่กลัว ตอนนี้อัพเป็น Pro แล้ว คุ้มมากค่ะ!"'
        : '"Free for 3 units let me try risk-free. Now I\'m on Pro — totally worth it!"',
      stars: 5,
    },
  ];

  const propertyTypes = [
    { icon: Home, label: language === 'th' ? 'วิลล่า' : 'Villa' },
    { icon: Hotel, label: language === 'th' ? 'โรงแรม' : 'Hotel' },
    { icon: Building2, label: language === 'th' ? 'คอนโด' : 'Condo' },
    { icon: Warehouse, label: language === 'th' ? 'หอพัก' : 'Dormitory' },
    { icon: Home, label: language === 'th' ? 'บ้านเช่า' : 'Rental' },
    { icon: Zap, label: language === 'th' ? 'พูลวิลล่า' : 'Pool Villa' },
  ];

  return (
    <div className="min-h-screen bg-background font-display">
      {/* ─── Navbar ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Zap size={18} className="text-accent-foreground" />
            </div>
            <span className="font-extrabold text-lg text-foreground">VillaFlow</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">{t('landing.nav.features')}</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">{t('landing.nav.pricing')}</a>
            <a href="#testimonials" className="hover:text-foreground transition-colors">{t('landing.nav.testimonials')}</a>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === 'th' ? 'en' : 'th')}
              className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 rounded-lg hover:bg-muted"
            >
              <Globe size={14} />
              {language === 'th' ? 'EN' : 'TH'}
            </button>
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="text-sm font-semibold hidden sm:inline-flex">
                {t('landing.nav.login')}
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 text-sm font-bold shadow-sm">
                {t('landing.nav.demo')}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={landingHero} alt="VillaFlow Hero" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/75 to-primary/95" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <motion.div {...fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent-foreground text-xs sm:text-sm font-semibold backdrop-blur-sm border border-accent/30">
                {t('landing.hero.badge')}
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground leading-[1.1] mb-6"
            >
              {t('landing.hero.title1')}<br />
              <span className="text-accent">{t('landing.hero.title2')}</span>
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-base sm:text-lg text-primary-foreground/80 max-w-xl mb-8 leading-relaxed"
            >
              {t('landing.hero.subtitle')}
            </motion.p>

            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col sm:flex-row gap-3">
              <Link to="/dashboard">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base px-8 h-14 shadow-lg w-full sm:w-auto">
                  {t('landing.hero.cta')}
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base px-8 h-14 w-full sm:w-auto shadow-lg">
                  <Play size={16} className="mr-2" />
                  {t('landing.hero.cta2')}
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Stats row */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 max-w-2xl"
          >
            {[
              { value: '1,200+', label: t('landing.hero.stat1') },
              { value: '3,500+', label: t('landing.hero.stat2') },
              { value: '90%', label: t('landing.hero.stat3') },
              { value: '10+', label: t('landing.hero.stat4') },
            ].map((s, i) => (
              <div key={i} className="text-center sm:text-left">
                <div className="font-extrabold text-2xl sm:text-3xl text-accent">{s.value}</div>
                <div className="text-xs sm:text-sm text-primary-foreground/60 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Property Types ─── */}
      <section className="py-12 bg-muted/50 border-b border-border/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center mb-8">
            <h2 className="font-bold text-lg text-foreground">{t('landing.suitable')}</h2>
            <p className="text-sm text-muted-foreground mt-1">{t('landing.suitable.subtitle')}</p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {propertyTypes.map((pt, i) => (
              <motion.div
                key={i}
                {...stagger}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-card border border-border/50 shadow-sm"
              >
                <pt.icon size={20} className="text-accent" />
                <span className="font-semibold text-sm text-foreground">{pt.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="features" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="font-extrabold text-3xl md:text-4xl text-foreground">{t('landing.features.title')}</h2>
            <p className="font-body text-base text-muted-foreground mt-3 max-w-2xl mx-auto">{t('landing.features.subtitle')}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={i}
                {...stagger}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card p-6 group cursor-default"
              >
                <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${f.color}`}>
                  <f.icon size={24} />
                </div>
                <h3 className="font-bold text-base text-foreground mb-2">{f.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* App mockup */}
          <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.2 }} className="mt-16 flex justify-center">
            <div className="relative max-w-md w-full">
              <img
                src={appMockup}
                alt="VillaFlow App"
                className="w-full rounded-2xl shadow-xl border border-border/30"
                loading="lazy"
              />
              <div className="absolute -top-3 -right-3 badge-accent px-3 py-1.5 text-xs font-bold shadow-lg rounded-full">
                Zero-Phone ✨
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section id="pricing" className="py-20 md:py-28 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="font-extrabold text-3xl md:text-4xl text-foreground">{t('landing.pricing.title')}</h2>
            <p className="font-body text-base text-muted-foreground mt-3">{t('landing.pricing.subtitle')}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Free */}
            <motion.div {...stagger} transition={{ duration: 0.5, delay: 0 }} className="glass-card p-6 flex flex-col">
              <h3 className="font-bold text-lg text-foreground">{t('landing.pricing.free')}</h3>
              <div className="mt-3 mb-1">
                <span className="font-extrabold text-4xl text-foreground">{t('landing.pricing.free.price')}</span>
                <span className="text-sm text-muted-foreground">{t('landing.pricing.free.period')}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-6">{t('landing.pricing.free.desc')}</p>
              <ul className="space-y-3 flex-1">
                {['free.f1', 'free.f2', 'free.f3', 'free.f4', 'free.f5'].map(k => (
                  <li key={k} className="flex items-start gap-2 text-sm text-foreground">
                    <Check size={16} className="text-accent mt-0.5 flex-shrink-0" />
                    {t(`landing.pricing.${k}`)}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="mt-6 w-full font-bold">{t('landing.pricing.cta.free')}</Button>
            </motion.div>

            {/* Pro — Popular */}
            <motion.div {...stagger} transition={{ duration: 0.5, delay: 0.1 }} className="glass-card p-6 flex flex-col ring-2 ring-accent relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 badge-accent px-4 py-1 text-xs font-bold shadow-md">
                {t('landing.pricing.popular')}
              </span>
              <h3 className="font-bold text-lg text-foreground">{t('landing.pricing.pro')}</h3>
              <div className="mt-3 mb-1">
                <span className="font-extrabold text-4xl text-accent">{t('landing.pricing.pro.price')}</span>
                <span className="text-sm text-muted-foreground">{t('landing.pricing.free.period')}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-6">{t('landing.pricing.pro.desc')}</p>
              <ul className="space-y-3 flex-1">
                {['pro.f1', 'pro.f2', 'pro.f3', 'pro.f4', 'pro.f5'].map(k => (
                  <li key={k} className="flex items-start gap-2 text-sm text-foreground">
                    <Check size={16} className="text-accent mt-0.5 flex-shrink-0" />
                    {t(`landing.pricing.${k}`)}
                  </li>
                ))}
              </ul>
              <Button className="mt-6 w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-sm">
                {t('landing.pricing.cta.pro')}
              </Button>
            </motion.div>

            {/* Premium */}
            <motion.div {...stagger} transition={{ duration: 0.5, delay: 0.2 }} className="glass-card p-6 flex flex-col">
              <h3 className="font-bold text-lg text-foreground">{t('landing.pricing.premium')}</h3>
              <div className="mt-3 mb-1">
                <span className="font-extrabold text-4xl text-foreground">{t('landing.pricing.premium.price')}</span>
                <span className="text-sm text-muted-foreground">{t('landing.pricing.free.period')}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-6">{t('landing.pricing.premium.desc')}</p>
              <ul className="space-y-3 flex-1">
                {['premium.f1', 'premium.f2', 'premium.f3', 'premium.f4', 'premium.f5'].map(k => (
                  <li key={k} className="flex items-start gap-2 text-sm text-foreground">
                    <Check size={16} className="text-accent mt-0.5 flex-shrink-0" />
                    {t(`landing.pricing.${k}`)}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="mt-6 w-full font-bold">{t('landing.pricing.cta.premium')}</Button>
            </motion.div>
          </div>

          <motion.p {...fadeUp} className="text-center text-sm text-muted-foreground mt-8">
            {t('landing.pricing.guarantee')}
          </motion.p>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section id="testimonials" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="font-extrabold text-3xl md:text-4xl text-foreground">{t('landing.testimonials.title')}</h2>
            <p className="font-body text-base text-muted-foreground mt-3">{t('landing.testimonials.subtitle')}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((tm, i) => (
              <motion.div
                key={i}
                {...stagger}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: tm.stars }).map((_, j) => (
                    <Star key={j} size={16} className="text-villa-gold fill-villa-gold" />
                  ))}
                </div>
                <p className="font-body text-sm text-foreground leading-relaxed mb-6">{tm.quote}</p>
                <div className="flex items-center gap-3">
                  <img src={tm.img} alt={tm.name} className="w-11 h-11 rounded-full object-cover" loading="lazy" />
                  <div>
                    <div className="font-semibold text-sm text-foreground">{tm.name}</div>
                    <div className="text-xs text-muted-foreground">{tm.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent/40" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-extrabold text-3xl md:text-5xl text-primary-foreground leading-tight mb-4">
              {t('landing.cta.title')}
            </h2>
            <p className="font-body text-base sm:text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              {t('landing.cta.subtitle')}
            </p>
            <Link to="/dashboard">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base sm:text-lg px-10 h-14 shadow-xl">
                {t('landing.cta.button')}
                <ChevronRight size={20} className="ml-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="bg-primary text-primary-foreground/70 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-4 gap-8">
            <div className="sm:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                  <Zap size={18} className="text-accent-foreground" />
                </div>
                <span className="font-extrabold text-lg text-primary-foreground">VillaFlow</span>
              </div>
              <p className="text-sm leading-relaxed max-w-sm">{t('landing.footer.tagline')}</p>
            </div>
            <div>
              <h4 className="font-bold text-sm text-primary-foreground mb-3">{t('landing.footer.product')}</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-primary-foreground transition-colors">{t('landing.nav.features')}</a></li>
                <li><a href="#pricing" className="hover:text-primary-foreground transition-colors">{t('landing.nav.pricing')}</a></li>
                <li><Link to="/dashboard" className="hover:text-primary-foreground transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm text-primary-foreground mb-3">{t('landing.footer.support')}</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary-foreground transition-colors">LINE @villaflow</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">support@villaflow.co</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/10 mt-8 pt-6 text-center text-xs text-primary-foreground/40">
            © 2026 VillaFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
