"use client";

import { AnimatedNavFramer } from "@/components/ui/navigation-menu";
import { NoirHeroSearch } from "@/components/sections/noir-hero-search";
import { CategoriesSection } from "@/components/sections/categories-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { StatsSection } from "@/components/sections/stats-section";
import { CtaSection } from "@/components/sections/cta-section";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { Testimonials } from "@/components/ui/unique-testimonial";
import OrbitingFeatures from "@/components/ui/orbiting-skills";
import { TopRightAuth } from "@/components/sections/top-right-auth";

const parallaxImages = [
  {
    src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1280&h=720&fit=crop',
    alt: 'Luxury car on mountain road',
  },
  {
    src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1280&h=720&fit=crop',
    alt: 'Classic sports car',
  },
  {
    src: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=800&fit=crop',
    alt: 'Modern SUV front view',
  },
  {
    src: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&auto=format',
    alt: 'Green car parked on the side of the road',
  },
  {
    src: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=800&fit=crop',
    alt: 'Sleek black luxury sedan',
  },
  {
    src: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&auto=format',
    alt: 'Fast car on city streets',
  },
  {
    src: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1280&h=720&fit=crop',
    alt: 'Off-road vehicle in desert',
  },
];

export default function Home() {
  return (
    <div className="dark">
      {/* 0. Auth — top right buttons */}
      <TopRightAuth />

      {/* Navigation — fixed, always on top */}
      <AnimatedNavFramer />

      <main className="bg-background text-foreground">
        {/* 1. Hero — full viewport with interactive 3D Spline scene and search tabs */}
        <NoirHeroSearch />

        {/* 2. Vehicle Categories — Cars / Bikes / Scooty with animated tabs */}
        <CategoriesSection />

        {/* 3. How It Works — 4-step process */}
        <HowItWorksSection />

        {/* 4. Zoom Parallax — Cinematic scroll effect */}
        <section className="py-32">
          <div className="container mx-auto px-6 mb-12 text-center">
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white italic">
              Experience the <span className="text-primary NOT-italic">Freedom</span>
            </h2>
          </div>
          <ZoomParallax images={parallaxImages} />
        </section>

        {/* 5. Orbiting Features — Interactive tech/feature showcase */}
        <OrbitingFeatures />

        {/* 6. Unique Testimonials — Customer reviews with smooth transitions */}
        <Testimonials />

        {/* 7. Stats — animated counters */}
        <StatsSection />

        {/* 8. CTA Banner — call to action */}
        <CtaSection />
      </main>

      {/* 11. Cinematic Footer — Reveal on scroll */}
      <CinematicFooter />
    </div>
  );
}
