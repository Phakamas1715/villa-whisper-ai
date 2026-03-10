import { properties } from '@/data/mockData';
import { Building2, Bed, Bath, TrendingUp, MapPin, Calendar } from 'lucide-react';

const PropertiesView = () => {
  return (
    <div>
      <h2 className="font-display font-bold text-lg text-foreground mb-1">Properties</h2>
      <p className="font-display text-xs text-muted-foreground mb-4">{properties.length} properties</p>

      <div className="space-y-3">
        {properties.map((prop) => (
          <div key={prop.id} className="timeline-card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-display font-semibold text-sm text-foreground">{prop.name}</h3>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin size={10} className="text-muted-foreground" />
                  <span className="font-display text-[11px] text-muted-foreground">{prop.location}</span>
                </div>
              </div>
              <span
                className={`font-display text-[10px] px-2 py-0.5 rounded-full ${
                  prop.status === 'active'
                    ? 'bg-accent/10 text-accent'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {prop.status}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <div className="text-center">
                <Bed size={14} className="mx-auto text-muted-foreground mb-0.5" />
                <span className="font-display text-xs font-medium text-foreground">{prop.bedrooms}</span>
                <span className="font-display text-[9px] text-muted-foreground block">Beds</span>
              </div>
              <div className="text-center">
                <Bath size={14} className="mx-auto text-muted-foreground mb-0.5" />
                <span className="font-display text-xs font-medium text-foreground">{prop.bathrooms}</span>
                <span className="font-display text-[9px] text-muted-foreground block">Baths</span>
              </div>
              <div className="text-center">
                <TrendingUp size={14} className="mx-auto text-accent mb-0.5" />
                <span className="font-display text-xs font-medium text-accent">{prop.occupancy}%</span>
                <span className="font-display text-[9px] text-muted-foreground block">Occ.</span>
              </div>
              <div className="text-center">
                <Building2 size={14} className="mx-auto text-muted-foreground mb-0.5" />
                <span className="font-display text-xs font-medium text-foreground">฿{(prop.basePrice / 1000).toFixed(0)}k</span>
                <span className="font-display text-[9px] text-muted-foreground block">/night</span>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-1 text-[10px] text-muted-foreground font-display">
              <Calendar size={10} />
              Next check-in: {prop.nextCheckIn}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertiesView;
