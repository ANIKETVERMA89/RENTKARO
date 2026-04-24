"use client"
import React, { useEffect, useState, memo } from 'react';
import { Car, Bike, ShieldCheck, Zap, Clock, MapPin } from 'lucide-react';

// --- Type Definitions ---
type FeatureType = 'car' | 'bike' | 'safety' | 'speed' | 'time' | 'location';

interface FeatureIconProps {
  type: FeatureType;
}

interface FeatureConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  featureType: FeatureType;
  phaseShift: number;
  glowColor: 'cyan' | 'purple';
  label: string;
}

interface OrbitingFeatureProps {
  config: FeatureConfig;
  angle: number;
}

interface GlowingOrbitPathProps {
  radius: number;
  glowColor?: 'cyan' | 'purple';
  animationDelay?: number;
}

// --- Icon Mapping ---
const iconComponents: Record<FeatureType, { component: React.ElementType; color: string }> = {
  car: { component: Car, color: '#3b82f6' },
  bike: { component: Bike, color: '#f59e0b' },
  safety: { component: ShieldCheck, color: '#10b981' },
  speed: { component: Zap, color: '#ef4444' },
  time: { component: Clock, color: '#8b5cf6' },
  location: { component: MapPin, color: '#ec4899' },
};

const FeatureIcon = memo(({ type }: FeatureIconProps) => {
  const Icon = iconComponents[type]?.component;
  const color = iconComponents[type]?.color;
  return Icon ? <Icon size={24} style={{ color }} /> : null;
});
FeatureIcon.displayName = 'FeatureIcon';

// --- Configuration ---
const featuresConfig: FeatureConfig[] = [
  { id: 'car', orbitRadius: 100, size: 45, speed: 1, featureType: 'car', phaseShift: 0, glowColor: 'cyan', label: 'Premium Cars' },
  { id: 'bike', orbitRadius: 100, size: 45, speed: 1, featureType: 'bike', phaseShift: (2 * Math.PI) / 3, glowColor: 'cyan', label: 'Sport Bikes' },
  { id: 'safety', orbitRadius: 100, size: 45, speed: 1, featureType: 'safety', phaseShift: (4 * Math.PI) / 3, glowColor: 'cyan', label: 'Safety First' },
  { id: 'speed', orbitRadius: 180, size: 50, speed: -0.6, featureType: 'speed', phaseShift: 0, glowColor: 'purple', label: 'Instant Booking' },
  { id: 'time', orbitRadius: 180, size: 50, speed: -0.6, featureType: 'time', phaseShift: (2 * Math.PI) / 3, glowColor: 'purple', label: '24/7 Support' },
  { id: 'location', orbitRadius: 180, size: 50, speed: -0.6, featureType: 'location', phaseShift: (4 * Math.PI) / 3, glowColor: 'purple', label: 'Near You' },
];

const OrbitingFeature = memo(({ config, angle }: OrbitingFeatureProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { orbitRadius, size, featureType, label } = config;

  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 20 : 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative w-full h-full p-2 bg-neutral-900/90 backdrop-blur-sm
          rounded-full flex items-center justify-center
          transition-all duration-300 cursor-pointer border border-white/5
          ${isHovered ? 'scale-125 shadow-2xl' : 'shadow-lg hover:shadow-xl'}
        `}
        style={{
          boxShadow: isHovered
            ? `0 0 30px ${iconComponents[featureType]?.color}40, 0 0 60px ${iconComponents[featureType]?.color}20`
            : undefined
        }}
      >
        <FeatureIcon type={featureType} />
        {isHovered && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-900/95 backdrop-blur-sm rounded text-[10px] text-white whitespace-nowrap pointer-events-none border border-white/10 uppercase tracking-tighter">
            {label}
          </div>
        )}
      </div>
    </div>
  );
});
OrbitingFeature.displayName = 'OrbitingFeature';

const GlowingOrbitPath = memo(({ radius, glowColor = 'cyan', animationDelay = 0 }: GlowingOrbitPathProps) => {
  const colors = {
    cyan: { primary: 'rgba(59, 130, 246, 0.2)', secondary: 'rgba(59, 130, 246, 0.05)', border: 'rgba(59, 130, 246, 0.1)' },
    purple: { primary: 'rgba(139, 92, 246, 0.2)', secondary: 'rgba(139, 92, 246, 0.05)', border: 'rgba(139, 92, 246, 0.1)' }
  }[glowColor];

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none" style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}>
      <div className="absolute inset-0 rounded-full animate-pulse" style={{ background: `radial-gradient(circle, transparent 30%, ${colors.secondary} 70%, ${colors.primary} 100%)`, boxShadow: `0 0 60px ${colors.primary}, inset 0 0 60px ${colors.secondary}`, animation: 'pulse 4s ease-in-out infinite', animationDelay: `${animationDelay}s` }} />
      <div className="absolute inset-0 rounded-full" style={{ border: `1px solid ${colors.border}`, boxShadow: `inset 0 0 20px ${colors.secondary}` }} />
    </div>
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

export default function OrbitingFeatures() {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    let frameId: number;
    let last = performance.now();
    const animate = (now: number) => {
      setTime(t => t + (now - last) / 1000);
      last = now;
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isPaused]);

  return (
    <section className="py-32 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase">
            Driven by <span className="text-primary italic">Innovation</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
            Our platform combines cutting-edge technology with premium vehicle services to provide the most seamless rental experience in the market.
          </p>
          <div className="flex gap-4 pt-4">
             <div className="flex flex-col">
                <span className="text-3xl font-black text-white">500+</span>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Certified Fleet</span>
             </div>
             <div className="w-[1px] h-12 bg-white/10" />
             <div className="flex flex-col">
                <span className="text-3xl font-black text-white">24/7</span>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Support Ready</span>
             </div>
          </div>
        </div>

        <div 
          className="relative aspect-square max-w-[500px] mx-auto flex items-center justify-center scale-90 md:scale-100"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-neutral-800 to-black rounded-full flex items-center justify-center z-10 relative shadow-2xl border border-white/10">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse"></div>
            <div className="relative z-10 text-primary">
              <Car size={40} />
            </div>
          </div>

          <GlowingOrbitPath radius={100} glowColor="cyan" delay={0} />
          <GlowingOrbitPath radius={180} glowColor="purple" delay={1.5} />

          {featuresConfig.map((config) => (
            <OrbitingFeature key={config.id} config={config} angle={time * config.speed + config.phaseShift} />
          ))}
        </div>
      </div>
    </section>
  );
}
