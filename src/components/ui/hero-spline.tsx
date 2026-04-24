'use client'

import { SplineScene } from "@/components/ui/spline";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
 
export function HeroSpline() {
  return (
    <Card className="w-full h-[500px] bg-black relative overflow-hidden rounded-none border-none">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      <div className="flex h-full max-w-7xl mx-auto items-center">
        {/* Left content */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Drive Your Dreams
          </h1>
          <p className="mt-4 text-neutral-300 max-w-lg text-xl">
            Experience premium vehicle rentals with high-end luxury. 
            Choose your perfect ride and start your journey today.
          </p>
          <div className="mt-8">
            <button className="bg-white text-black px-8 py-3 rounded-md font-medium hover:bg-neutral-200 transition-colors">
              Book Now
            </button>
          </div>
        </div>

        {/* Right content */}
        <div className="flex-1 relative h-full">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  )
}
