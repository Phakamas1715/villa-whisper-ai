import { properties, propertyImages } from '@/data/mockData';
import { Bed, Bath, Star, MapPin, TrendingUp, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const PropertiesView = () => {
  const { t } = useLanguage();

  return (
    <div>
      <h2 className="font-display font-bold text-xl text-foreground mb-1">{t('properties.title')}</h2>
      <p className="font-body text-sm text-muted-foreground mb-5">{properties.length} {t('properties.managed')}</p>

      <div className="space-y-4">
        {properties.map((prop, idx) => {
          const img = propertyImages[prop.name];
          return (
            <motion.div key={prop.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: idx * 0.08 }} className="glass-card overflow-hidden p-0">
              {img && (
                <div className="relative">
                  <img src={img} alt={prop.name} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <div>
                      <h3 className="font-display font-bold text-lg text-primary-foreground">{prop.name}</h3>
                      <div className="flex items-center gap-1 mt-0.5"><MapPin size={12} className="text-primary-foreground/70" /><span className="font-display text-sm text-primary-foreground/70">{prop.location}</span></div>
                    </div>
                    <span className={`text-xs font-display font-semibold px-3 py-1.5 rounded-full backdrop-blur ${prop.status === 'active' ? 'bg-accent/80 text-accent-foreground' : 'bg-muted/80 text-muted-foreground'}`}>{prop.status}</span>
                  </div>
                </div>
              )}
              <div className="p-4">
                <div className="grid grid-cols-5 gap-2 text-center">
                  <div><Bed size={16} className="mx-auto text-muted-foreground mb-1" /><span className="font-display text-base font-bold text-foreground">{prop.bedrooms}</span><span className="font-display text-xs text-muted-foreground block">{t('properties.beds')}</span></div>
                  <div><Bath size={16} className="mx-auto text-muted-foreground mb-1" /><span className="font-display text-base font-bold text-foreground">{prop.bathrooms}</span><span className="font-display text-xs text-muted-foreground block">{t('properties.baths')}</span></div>
                  <div><TrendingUp size={16} className="mx-auto text-accent mb-1" /><span className="font-display text-base font-bold text-accent">{prop.occupancy}%</span><span className="font-display text-xs text-muted-foreground block">{t('properties.occ')}</span></div>
                  <div><Star size={16} className="mx-auto text-villa-gold mb-1" /><span className="font-display text-base font-bold text-foreground">{prop.rating}</span><span className="font-display text-xs text-muted-foreground block">{prop.reviews} {t('properties.rev')}</span></div>
                  <div><Calendar size={16} className="mx-auto text-muted-foreground mb-1" /><span className="font-display text-base font-bold text-foreground">฿{(prop.basePrice / 1000).toFixed(1)}k</span><span className="font-display text-xs text-muted-foreground block">{t('properties.per_night')}</span></div>
                </div>
                <div className="mt-3 pt-3 border-t border-border/30 flex items-center gap-1 text-sm text-muted-foreground font-display"><Calendar size={12} />{t('properties.next_checkin')} {prop.nextCheckIn}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PropertiesView;
