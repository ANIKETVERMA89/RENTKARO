"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sparkles as SparklesComp } from "@/components/ui/sparkles";
import { TimelineContent } from "@/components/ui/timeline-animation";
import {VerticalCutReveal} from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

const plans = [
  {
    name: "Commuter",
    description: "Perfect for quick errands and short city trips. Budget-friendly and reliable.",
    price: 15,
    yearlyPrice: 120, // Discounted hourly rate equivalent or monthly fee
    buttonText: "Rent Now",
    buttonVariant: "outline" as const,
    includes: [
      "Standard Hatchbacks/Scooties",
      "Up to 50km included",
      "Standard Insurance",
      "24/7 Roadside Assistance",
      "Free Helmet (for bikes)",
      "Instant App Unlock",
    ],
  },
  {
    name: "Explorer",
    description: "Ideal for weekend getaways and family trips. More miles, more comfort.",
    price: 45,
    yearlyPrice: 399,
    buttonText: "Join the Club",
    buttonVariant: "default" as const,
    popular: true,
    includes: [
      "Everything in Commuter, plus:",
      "SUVs & Premium Sedans",
      "Up to 200km included",
      "Collision Damage Waiver",
      "Priority Support",
      "Free Delivery & Pickup",
    ],
  },
  {
    name: "Luxury",
    description: "Make a statement with our premium fleet. Top-tier vehicles for special occasions.",
    price: 95,
    yearlyPrice: 899,
    buttonText: "Experience Luxury",
    buttonVariant: "outline" as const,
    includes: [
      "Everything in Explorer, plus:",
      "Convertibles & Luxury SUVs",
      "Unlimited Kilometers",
      "Premium Full Insurance",
      "Dedicated Concierge",
      "Airport VIP Lounge Access",
    ],
  },
];

const PricingSwitch = ({ onSwitch }: { onSwitch: (value: string) => void }) => {
  const [selected, setSelected] = useState("0");

  const handleSwitch = (value: string) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div className="flex justify-center">
      <div className="relative z-10 mx-auto flex w-fit rounded-full bg-neutral-900 border border-white/10 p-1">
        <button
          onClick={() => handleSwitch("0")}
          className={cn(
            "relative z-10 w-fit h-10 rounded-full px-6 py-1 font-medium transition-colors text-sm",
            selected === "0" ? "text-white" : "text-neutral-500",
          )}
        >
          {selected === "0" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 h-10 w-full rounded-full bg-primary"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">Hourly</span>
        </button>

        <button
          onClick={() => handleSwitch("1")}
          className={cn(
            "relative z-10 w-fit h-10 flex-shrink-0 rounded-full px-6 py-1 font-medium transition-colors text-sm",
            selected === "1" ? "text-white" : "text-neutral-500",
          )}
        >
          {selected === "1" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 h-10 w-full rounded-full bg-primary"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">Daily</span>
        </button>
      </div>
    </div>
  );
};

export default function PricingSection6() {
  const [isDaily, setIsDaily] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: 20,
      opacity: 0,
    },
  };

  const togglePricingPeriod = (value: string) =>
    setIsDaily(Number.parseInt(value) === 1);

  return (
    <div
      className="min-h-screen mx-auto relative bg-background overflow-hidden py-32"
      ref={pricingRef}
    >
      <TimelineContent
        animationNum={4}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="absolute top-0 h-96 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] "
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:70px_80px] "></div>
        <SparklesComp
          density={800}
          direction="bottom"
          speed={0.5}
          color="#ffffff"
          className="absolute inset-x-0 bottom-0 h-full w-full opacity-20"
        />
      </TimelineContent>

      <article className="text-center mb-16 max-w-3xl mx-auto space-y-4 relative z-50">
        <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.15}
            staggerFrom="first"
            reverse={true}
            containerClassName="justify-center "
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 40,
              delay: 0, 
            }}
          >
            Pricing for every Journey
          </VerticalCutReveal>
        </h2>

        <TimelineContent
          as="p"
          animationNum={0}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="text-muted-foreground text-lg"
        >
          Competitive rates with no hidden fees. Choose the plan that fits your travel needs.
        </TimelineContent>

        <TimelineContent
          as="div"
          animationNum={1}
          timelineRef={pricingRef}
          customVariants={revealVariants}
        >
          <PricingSwitch onSwitch={togglePricingPeriod} />
        </TimelineContent>
      </article>

      <div className="grid md:grid-cols-3 max-w-6xl gap-6 px-6 mx-auto relative z-50">
        {plans.map((plan, index) => (
          <TimelineContent
            key={plan.name}
            as="div"
            animationNum={2 + index}
            timelineRef={pricingRef}
            customVariants={revealVariants}
          >
            <Card
              className={cn(
                "relative text-white border-white/5 bg-neutral-900/50 backdrop-blur-xl h-full flex flex-col transition-all duration-300 hover:border-primary/50",
                plan.popular && "ring-2 ring-primary shadow-[0_0_50px_rgba(59,130,246,0.1)]"
              )}
            >
              <CardHeader className="text-left space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-black uppercase italic tracking-wider">{plan.name}</h3>
                  {plan.popular && <span className="text-[10px] bg-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">Most Popular</span>}
                </div>
                <div className="flex items-baseline">
                  <span className="text-5xl font-black tracking-tighter">
                    ₹
                    <NumberFlow
                      value={isDaily ? plan.yearlyPrice : plan.price}
                      className="text-5xl font-black tracking-tighter"
                    />
                  </span>
                  <span className="text-muted-foreground ml-1 font-bold text-xs uppercase tracking-widest">
                    /{isDaily ? "day" : "hr"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">{plan.description}</p>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                <button
                  className={cn(
                    "w-full mb-8 py-4 rounded-full font-black uppercase tracking-widest transition-all duration-300",
                    plan.popular
                      ? "bg-primary text-white shadow-lg shadow-primary/20 hover:scale-[1.02]"
                      : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                  )}
                >
                  {plan.buttonText}
                </button>

                <div className="space-y-4 pt-6 border-t border-white/5">
                  <h4 className="text-xs font-black uppercase tracking-widest text-primary italic">
                    What's included:
                  </h4>
                  <ul className="space-y-3">
                    {plan.includes.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-1 h-1.5 w-1.5 bg-primary rounded-full shrink-0" />
                        <span className="text-xs text-neutral-400 font-medium leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TimelineContent>
        ))}
      </div>
    </div>
  );
}
