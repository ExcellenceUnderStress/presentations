"use client";

import React, { useState, useCallback, lazy, Suspense, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { optimizeAnimations } from "../../utils/performance";
import "./globals.css";

// Lazy load slide components
const WelcomeSlide = lazy(() => import("../../components/slides/WelcomeSlide"));
const LegacySlide = lazy(() => import("../../components/slides/LegacySlide"));
const AboutUsSlide = lazy(() => import("../../components/slides/AboutUsSlide"));
const OurProcessSlide = lazy(() => import("../../components/slides/OurProcessSlide"));
const WhyPostTensioning1Slide = lazy(() => import("../../components/slides/WhyPostTensioning1Slide"));
const WhyPostTensioning2Slide = lazy(() => import("../../components/slides/WhyPostTensioning2Slide"));
const WhyPostTensioning3Slide = lazy(() => import("../../components/slides/WhyPostTensioning3Slide"));
const CriticalSlide = lazy(() => import("../../components/slides/CriticalSlide"));
const CoreSolutionsSlide = lazy(() => import("../../components/slides/CoreSolutionsSlide"));
const RepairRetrofitSlide = lazy(() => import("../../components/slides/RepairRetrofitSlide"));
const BarrierCableSlide = lazy(() => import("../../components/slides/BarrierCableSlide"));
const InnovationsSlide = lazy(() => import("../../components/slides/InnovationsSlide"));
const SafetySlide = lazy(() => import("../../components/slides/SafetySlide"));
const CaseStudiesSlide = lazy(() => import("../../components/slides/CaseStudiesSlide"));

// Type definitions for slide props
type SlideComponent = React.ComponentType<any>;

interface SlideConfig {
  Component: SlideComponent;
  props: Record<string, any>;
}

const slides: SlideConfig[] = [
  {
    Component: WelcomeSlide,
    props: {},
  },
  {
    Component: LegacySlide,
    props: {},
  },
  {
    Component: AboutUsSlide,
    props: {},
  },
  {
    Component: OurProcessSlide,
    props: {},
  },
  {
    Component: WhyPostTensioning1Slide,
    props: {},
  },
  {
    Component: WhyPostTensioning2Slide,
    props: {},
  },
  {
    Component: WhyPostTensioning3Slide,
    props: {},
  },
  {
    Component: CriticalSlide,
    props: {},
  },
  {
    Component: CoreSolutionsSlide,
    props: {},
  },
  {
    Component: RepairRetrofitSlide,
    props: {},
  },
  {
    Component: CaseStudiesSlide,
    props: { solutionType: "repair" as const },
  },
  {
    Component: BarrierCableSlide,
    props: {},
  },
  {
    Component: CaseStudiesSlide,
    props: { solutionType: "barrier" as const },
  },
  {
    Component: InnovationsSlide,
    props: {},
  },
  {
    Component: CaseStudiesSlide,
    props: { solutionType: "innovations" as const },
  },
  {
    Component: SafetySlide,
    props: {},
  },
  {
    Component: CaseStudiesSlide,
    props: { solutionType: "safety" as const },
  },
];

export default function PresentationPage() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // Apply performance optimizations
    optimizeAnimations();
  }, []);

  const goTo = useCallback((idx: number) => {
    if (idx >= 0 && idx < slides.length) setCurrent(idx);
  }, []);
  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Slide-specific navigation props
  const slideProps = [
    { onNext: goNext }, // 0: WelcomeSlide
    { onPrev: goPrev, onVideoEnd: goNext }, // 1: LegacySlide
    { onPrev: goPrev, onNext: goNext }, // 2: AboutUsSlide
    { onPrev: goPrev, onNext: goNext }, // 3: OurProcessSlide
    { onPrev: goPrev, onNext: goNext }, // 4: WhyPostTensioning1Slide
    { onPrev: goPrev, onNext: goNext }, // 5: WhyPostTensioning2Slide
    { onPrev: goPrev, onNext: goNext }, // 6: WhyPostTensioning3Slide
    { onPrev: goPrev, onNext: goNext }, // 7: CriticalSlide
    { 
      onPrev: goPrev, 
      onRepairClick: () => goTo(9), 
      onBarrierClick: () => goTo(11), 
      onInnovationsClick: () => goTo(13), 
      onSafetyClick: () => goTo(15), 
      onNext: goNext 
    }, // 8: CoreSolutionsSlide
    { onBack: () => goTo(8), onNext: goNext }, // 9: RepairRetrofitSlide
    { solutionType: "repair" as const, onBack: () => goTo(9), onNext: goNext }, // 10: CaseStudiesSlide (repair)
    { onBack: () => goTo(8), onNext: goNext }, // 11: BarrierCableSlide
    { solutionType: "barrier" as const, onBack: () => goTo(11), onNext: goNext }, // 12: CaseStudiesSlide (barrier)
    { onBack: () => goTo(8), onNext: goNext }, // 13: InnovationsSlide
    { solutionType: "innovations" as const, onBack: () => goTo(13), onNext: goNext }, // 14: CaseStudiesSlide (innovations)
    { onBack: () => goTo(8), onNext: goNext }, // 15: SafetySlide
    { solutionType: "safety" as const, onBack: () => goTo(15) }, // 16: CaseStudiesSlide (safety)
  ];

  const { Component } = slides[current];
  const slideSpecificProps = slideProps[current];
  const slideProps_combined = { ...slides[current].props, ...slideSpecificProps };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center bg-gray-900">
          <motion.div
            className="text-white text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Loading...
          </motion.div>
        </div>
      }>
        <Component key={current} {...slideProps_combined as any} />
      </Suspense>
    </div>
  );
}
