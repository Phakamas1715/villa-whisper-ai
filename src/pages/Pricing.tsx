import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Zap, Globe, ArrowRight, Crown, Building2, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

const Pricing = () => {
  const { t, language, setLanguage } = useLanguage();

  const plans = [
    {
      name: t('pricing.free.name'),
      price: '฿0',
      period: t('pricing.period'),
      desc: t('pricing.free.desc'),
      icon: Zap,
      popular: false,
      features: [
        t('pricing.free.f1'),
        t('pricing.free.f2'),
        t('pricing.free.f3'),
        t('pricing.free.f4'),
        t('pricing.free.f5'),
      ],
      cta: t('pricing.cta_free'),
      variant: 'outline' as const,
    },
    {
      name: t('pricing.starter.name'),
      price: '฿399',
      period: t('pricing.period'),
      desc: t('pricing.starter.desc'),
      icon: Rocket,
      popular: false,
      features: [
        t('pricing.starter.f1'),
        t('pricing.starter.f2'),
        t('pricing.starter.f3'),
        t('pricing.starter.f4'),
        t('pricing.starter.f5'),
      ],
      cta: t('pricing.cta_trial'),
      variant: 'outline' as const,
    },
    {
      name: t('pricing.pro.name'),
      price: '฿990',
      period: t('pricing.period'),
      desc: t('pricing.pro.desc'),
      icon: Crown,
      popular: true,
      features: [
        t('pricing.pro.f1'),
        t('pricing.pro.f2'),
        t('pricing.pro.f3'),
        t('pricing.pro.f4'),
        t('pricing.pro.f5'),
        t('pricing.pro.f6'),
      ],
      cta: t('pricing.cta_trial'),
      variant: 'default' as const,
    },
    {
      name: t('pricing.business.name'),
      price: '฿2,490',
      period: t('pricing.period'),
      desc: t('pricing.business.desc'),
      icon: Building2,
      popular: false,
      features: [
        t('pricing.business.f1'),
        t('pricing.business.f2'),
        t('pricing.business.f3'),
        t('pricing.business.f4'),
        t('pricing.business.f5'),
        t('pricing.business.f6'),
      ],
      cta: t('pricing.cta_trial'),
      variant: 'outline' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background font-display">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Zap size={18} className="text-accent-foreground" />
            </div>
            <span className="font-extrabold text-lg text-foreground">VillaFlow</span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === 'th' ? 'en' : 'th')}
              className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 rounded-lg hover:bg-muted"
            >
              <Globe size={14} />
              {language === 'th' ? 'EN' : 'TH'}
            </button>
            <Link to="/dashboard">
              <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 text-sm font-bold shadow-sm">
                {t('landing.nav.demo')}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <motion.div {...fadeUp}>
            <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
              {t('pricing.title')}
            </h1>
            <p className="font-body text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('pricing.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                {...stagger}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`glass-card p-6 flex flex-col relative ${plan.popular ? 'ring-2 ring-accent' : ''}`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 badge-accent px-4 py-1 text-xs font-bold shadow-md">
                    {t('pricing.popular')}
                  </span>
                )}
                <plan.icon size={24} className={plan.popular ? 'text-accent mb-3' : 'text-muted-foreground mb-3'} />
                <h3 className="font-bold text-lg text-foreground">{plan.name}</h3>
                <div className="mt-3 mb-1">
                  <span className={`font-extrabold text-4xl ${plan.popular ? 'text-accent' : 'text-foreground'}`}>{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-6">{plan.desc}</p>
                <ul className="space-y-3 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-foreground">
                      <Check size={16} className="text-accent mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/dashboard">
                  <Button
                    variant={plan.popular ? 'default' : 'outline'}
                    className={`mt-6 w-full font-bold ${plan.popular ? 'bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm' : ''}`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Enterprise */}
          <motion.div {...fadeUp} transition={{ delay: 0.4 }} className="mt-8 glass-card p-8 text-center">
            <h3 className="font-bold text-xl text-foreground mb-2">{t('pricing.enterprise.name')}</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-lg mx-auto">{t('pricing.enterprise.desc')}</p>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {[t('pricing.enterprise.f1'), t('pricing.enterprise.f2'), t('pricing.enterprise.f3'), t('pricing.enterprise.f4')].map((f, i) => (
                <span key={i} className="flex items-center gap-1.5 text-sm text-foreground px-3 py-1.5 rounded-full bg-muted">
                  <Check size={14} className="text-accent" />
                  {f}
                </span>
              ))}
            </div>
            <Button variant="outline" size="lg" className="font-bold h-12 px-8">
              {t('pricing.enterprise.cta')}
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </motion.div>

          <motion.p {...fadeUp} className="text-center text-sm text-muted-foreground mt-8">
            {t('pricing.guarantee')}
          </motion.p>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
