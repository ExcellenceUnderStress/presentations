"use client";

import React, { useState, useCallback, useMemo, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { optimizeAnimations } from "../../utils/performance";
import { BadgeGroup } from "../../components/BadgeGroup";
import "./globals.css";

// Lazy load slide components
const WelcomeSlide = lazy(() => import("../../components/slides/WelcomeSlide"));
const IntroductionHubSlide = lazy(() => import("../../components/slides/IntroductionHubSlide"));
const LegacySlide = lazy(() => import("../../components/slides/LegacySlide"));
const AboutUsSlide = lazy(() => import("../../components/slides/AboutUsSlide"));
const OurProcessSlide = lazy(() => import("../../components/slides/OurProcessSlide"));
const WhyPostTensioning1Slide = lazy(() => import("../../components/slides/WhyPostTensioning1Slide"));
const WhyPostTensioning2Slide = lazy(() => import("../../components/slides/WhyPostTensioning2Slide"));
const WhyPostTensioning3Slide = lazy(() => import("../../components/slides/WhyPostTensioning3Slide"));
const CriticalSlide = lazy(() => import("../../components/slides/CriticalSlide"));
const FailuresSlide = lazy(() => import("../../components/slides/FailuresSlide"));
const CoreSolutionsSlide = lazy(() => import("../../components/slides/CoreSolutionsSlide"));
const RepairRetrofitSlide = lazy(() => import("../../components/slides/RepairRetrofitSlide"));
const BarrierCableSlide = lazy(() => import("../../components/slides/BarrierCableSlide"));
const InnovationsSlide = lazy(() => import("../../components/slides/InnovationsSlide"));
const SafetySlide = lazy(() => import("../../components/slides/SafetySlide"));
const CaseStudiesSlide = lazy(() => import("../../components/slides/CaseStudiesSlide"));

// Type definitions
type SolutionType = "overview" | "company" | "repair" | "innovations" | "barrier" | "safety";

interface CommonSlideProps {
  onNext?: () => void;
  onPrev?: () => void;
  onBack?: () => void;
  onVideoEnd?: () => void;
  onOverviewClick?: () => void;
  onAboutUsClick?: () => void;
  onInnovationClick?: () => void;
  onJumpToSolutions?: () => void;
  onSilentRisksClick?: () => void;
  onHiddenDamageClick?: () => void;
  onRepairClick?: () => void;
  onBarrierClick?: () => void;
  onInnovationsClick?: () => void;
  onSafetyClick?: () => void;
}

interface CaseStudiesSlideProp extends CommonSlideProps {
  solutionType: SolutionType;
}

interface SlideProps extends CommonSlideProps {
  solutionType?: SolutionType;
}

interface SlideConfig {
  Component: React.ComponentType<any>;
  props?: Record<string, any>;
}

// Slide configurations
const slides: SlideConfig[] = [
  { Component: WelcomeSlide },
  { Component: LegacySlide },
  { Component: IntroductionHubSlide },
  { Component: WhyPostTensioning1Slide },
  { Component: WhyPostTensioning2Slide },
  { Component: WhyPostTensioning3Slide },
  { Component: CriticalSlide },
  { Component: FailuresSlide },
  { Component: CaseStudiesSlide, props: { solutionType: "overview" } },
  { Component: OurProcessSlide },
  { Component: CoreSolutionsSlide },
  { Component: AboutUsSlide },
  { Component: LegacySlide },
  { Component: CaseStudiesSlide, props: { solutionType: "company" } },
  { Component: InnovationsSlide },
  { Component: BarrierCableSlide },
  { Component: RepairRetrofitSlide },
  { Component: SafetySlide },
  { Component: CaseStudiesSlide, props: { solutionType: "repair" } },
  { Component: CaseStudiesSlide, props: { solutionType: "innovations" } },
];

export default function PresentationPage() {
  const [current, setCurrent] = useState(0);
  const [lastVisited, setLastVisited] = useState<number | undefined>(undefined);

  React.useEffect(() => {
    optimizeAnimations();
  }, []);

  // Track last visited slide (simplified)
  const prevCurrentRef = React.useRef(current);
  React.useEffect(() => {
    const prevSlide = prevCurrentRef.current;
    if (prevSlide !== current) {
      setLastVisited(prevSlide);
    }
    prevCurrentRef.current = current;
  }, [current]);

  const goTo = useCallback((idx: number) => {
    if (idx >= 0 && idx < slides.length) setCurrent(idx);
  }, [slides.length]);

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);
  
  // Simplified goBack - just go to lastVisited or goPrev
  const goBack = useCallback(() => {
    if (lastVisited !== undefined && lastVisited !== current) {
      setCurrent(lastVisited);
    } else {
      goPrev();
    }
  }, [lastVisited, current, goPrev]);

  const slideProps = useMemo<Record<string, any>[]>(
    () => [
      { onNext: goNext }, // 0: WelcomeSlide
      { onPrev: goPrev, onNext: goNext, onVideoEnd: goNext }, // 1: LegacySlide
      {
        onPrev: goPrev,
        onOverviewClick: () => goTo(3),
        onAboutUsClick: () => goTo(8),
        onInnovationClick: () => goTo(14),
      }, // 2: IntroductionHubSlide
      { onPrev: () => goTo(2), onNext: goNext, onJumpToSolutions: () => goTo(9) }, // 3: WhyPostTensioning1Slide
      { onPrev: goPrev, onNext: goNext, onJumpToSolutions: () => goTo(9) }, // 4: WhyPostTensioning2Slide
      { onPrev: goPrev, onNext: goNext, onJumpToSolutions: () => goTo(9) }, // 5: WhyPostTensioning3Slide
      {
        onPrev: goPrev,
        onNext: () => goTo(7), // Keyboard navigation goes to FailuresSlide
        onSilentRisksClick: () => goTo(10),
        onHiddenDamageClick: () => goTo(10),
        onJumpToSolutions: () => goTo(10),
        onNavigateToRepair: () => goTo(16), // Click navigation goes directly to RepairRetrofitSlide
        onNavigateToFailures: () => goTo(7), // Click navigation goes to FailuresSlide
      }, // 6: CriticalSlide
      {
        onPrev: goPrev,
        onNext: () => goTo(10), // Go to CoreSolutionsSlide after viewing all failures
      }, // 7: FailuresSlide
      { onBack: goBack, onNext: () => goTo(9) }, // 8: CaseStudiesSlide (overview)
      { onPrev: goPrev, onNext: goNext }, // 9: OurProcessSlide
      {
        onPrev: goPrev,
        onRepairClick: () => goTo(16),
        onBarrierClick: () => goTo(15),
        onInnovationsClick: () => goTo(14),
        onSafetyClick: () => goTo(17),
        onNext: goNext,
      }, // 10: CoreSolutionsSlide
      { onPrev: goPrev, onNext: goNext }, // 11: AboutUsSlide
              { onPrev: goPrev, onNext: goNext, onVideoEnd: goNext }, // 12: LegacySlide (duplicate)
      { onBack: goBack, onNext: () => goTo(14) }, // 13: CaseStudiesSlide (company)
      { onBack: goBack, onNext: goNext }, // 14: InnovationsSlide
      { onBack: goBack, onNext: goNext }, // 15: BarrierCableSlide
      { onBack: goBack, onNext: goNext }, // 16: RepairRetrofitSlide
      { onBack: goBack, onNext: goNext }, // 17: SafetySlide
      { onBack: goBack, onNext: goNext }, // 18: CaseStudiesSlide (repair)
      { onBack: goBack, onNext: () => goTo(2) }, // 19: CaseStudiesSlide (innovations) - final slide, return to hub
    ],
    [goNext, goPrev, goTo, goBack]
  );

  const { Component, props: baseProps = {} } = slides[current];
  const combinedProps = useMemo(
    () => ({ ...baseProps, ...slideProps[current] }),
    [baseProps, slideProps, current]
  );

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden">
      {current > 0 && (
        <BadgeGroup currentSlide={current} lastVisitedSlide={lastVisited} onBadgeClick={goTo} />
      )}
      <Suspense
        fallback={
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
        }
      >
        <Component key={current} {...combinedProps} />
      </Suspense>
    </div>
  );
}