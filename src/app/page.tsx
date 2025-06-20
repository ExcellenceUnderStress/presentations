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
const DustManagementSlide = lazy(() => import("../../components/slides/DustManagementSlide"));
const CaseStudiesSlide = lazy(() => import("../../components/slides/CaseStudiesSlide"));

// Type definitions
type SolutionType = "main" | "overview" | "company" | "repair" | "innovations" | "barrier" | "safety";

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
  { Component: OurProcessSlide },
  { Component: CaseStudiesSlide, props: { solutionType: "main" } },
  { Component: CoreSolutionsSlide },
  { Component: AboutUsSlide },
  { Component: InnovationsSlide },
  { Component: BarrierCableSlide },
  { Component: RepairRetrofitSlide },
  { Component: SafetySlide },
  { Component: DustManagementSlide },
  { Component: CaseStudiesSlide, props: { solutionType: "company" } }, // 17: Company case studies
];

export default function PresentationPage() {
  const [current, setCurrent] = useState(0);
  const [navigationHistory, setNavigationHistory] = useState<number[]>([0]);

  React.useEffect(() => {
    optimizeAnimations();
  }, []);

  const goTo = useCallback((idx: number) => {
    if (idx >= 0 && idx < slides.length) {
      setCurrent(idx);
      // Add to navigation history if it's not a back navigation
      setNavigationHistory(prev => {
        const newHistory = [...prev];
        // If we're not going back to the previous item in history
        if (newHistory[newHistory.length - 1] !== idx) {
          newHistory.push(idx);
        }
        return newHistory;
      });
    }
  }, [slides.length]);

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);
  
  // Enhanced goBack - use navigation history
  const goBack = useCallback(() => {
    setNavigationHistory(prev => {
      if (prev.length > 1) {
        const newHistory = [...prev];
        newHistory.pop(); // Remove current
        const previousSlide = newHistory[newHistory.length - 1];
        setCurrent(previousSlide);
        return newHistory;
      }
      return prev;
    });
  }, []);

  const slideProps = useMemo<Record<string, any>[]>(
    () => [
      { onNext: goNext }, // 0: WelcomeSlide
      { onPrev: goPrev, onNext: goNext, onVideoEnd: goNext }, // 1: LegacySlide
      {
        onPrev: goPrev,
        onOverviewClick: () => goTo(3),
        onAboutUsClick: () => goTo(11),
        onInnovationClick: () => goTo(12),
      }, // 2: IntroductionHubSlide
      { onPrev: () => goTo(2), onNext: goNext, onJumpToSolutions: () => goTo(10) }, // 3: WhyPostTensioning1Slide
      { onPrev: goPrev, onNext: goNext, onJumpToSolutions: () => goTo(10) }, // 4: WhyPostTensioning2Slide
      { onPrev: goPrev, onNext: goNext, onJumpToSolutions: () => goTo(10) }, // 5: WhyPostTensioning3Slide
      {
        onPrev: goPrev,
        onNext: () => goTo(7), // Keyboard navigation goes to FailuresSlide
        onSilentRisksClick: () => goTo(10),
        onHiddenDamageClick: () => goTo(10),
        onJumpToSolutions: () => goTo(10),
        onNavigateToRepair: () => goTo(14), // Click navigation goes directly to RepairRetrofitSlide
        onNavigateToFailures: () => goTo(7), // Click navigation goes to FailuresSlide
      }, // 6: CriticalSlide
      {
        onPrev: goPrev,
        onNext: () => goTo(8), // Go to OurProcessSlide after viewing all failures
        onSolutionsClick: () => goTo(10), // CoreSolutionsSlide
        onAboutUsClick: () => goTo(11), // AboutUsSlide
        onCaseStudiesClick: () => goTo(9), // CaseStudiesSlide (main)
        onFinishClick: () => goTo(0), // WelcomeSlide
        onRestartClick: () => goTo(2), // IntroductionHubSlide
      }, // 7: FailuresSlide
      { onPrev: goPrev, onNext: () => goTo(9) }, // 8: OurProcessSlide
      { 
        onBack: () => goTo(8), 
        onNext: () => goTo(10),
        onSolutionsClick: () => goTo(10), 
        onFinishClick: () => goTo(0), 
        onRestartClick: () => goTo(2) 
      }, // 9: CaseStudiesSlide (main)
      {
        onPrev: goPrev,
        onRepairClick: () => goTo(14),
        onBarrierClick: () => goTo(13),
        onInnovationsClick: () => goTo(12),
        onSafetyClick: () => goTo(15),
        onNext: () => goTo(14), // Go to RepairRetrofitSlide
      }, // 10: CoreSolutionsSlide
      { onPrev: goBack, onNext: () => goTo(8), onCaseStudiesClick: () => goTo(17) }, // 11: AboutUsSlide
      { 
        onBack: goBack, 
        onNext: () => goTo(15), // Go to SafetySlide
        onRestartClick: () => goTo(2), // IntroductionHubSlide
        onFailuresClick: () => goTo(7), // FailuresSlide
        onCaseStudiesClick: () => goTo(9), // CaseStudiesSlide (main)
        onFinishClick: () => goTo(0), // WelcomeSlide
      }, // 12: InnovationsSlide
      { 
        onBack: goBack, 
        onNext: () => goTo(12), // Go to InnovationsSlide
        onRestartClick: () => goTo(2), // IntroductionHubSlide
        onFailuresClick: () => goTo(7), // FailuresSlide
        onCaseStudiesClick: () => goTo(9), // CaseStudiesSlide (main)
        onFinishClick: () => goTo(0), // WelcomeSlide
      }, // 13: BarrierCableSlide
      { 
        onBack: goBack, 
        onNext: () => goTo(13), // Go to BarrierCableSlide
        onRestartClick: () => goTo(2), // IntroductionHubSlide
        onCaseStudiesClick: () => goTo(9), // CaseStudiesSlide (main)
        onFinishClick: () => goTo(0), // WelcomeSlide
      }, // 14: RepairRetrofitSlide
      { 
        onBack: goBack, 
        onNext: () => goTo(16), // Go to DustManagementSlide
        onRestartClick: () => goTo(2), // IntroductionHubSlide
        onFailuresClick: () => goTo(7), // FailuresSlide
        onCaseStudiesClick: () => goTo(9), // CaseStudiesSlide (main)
        onFinishClick: () => goTo(0), // WelcomeSlide
      }, // 15: SafetySlide
      { 
        onBack: goBack, 
        onNext: () => goTo(0), // Finish - go to WelcomeSlide
        onRestartClick: () => goTo(2), // IntroductionHubSlide
        onFailuresClick: () => goTo(7), // FailuresSlide
        onCaseStudiesClick: () => goTo(9), // CaseStudiesSlide (main)
        onFinishClick: () => goTo(0), // WelcomeSlide
      }, // 16: DustManagementSlide
      { 
        onBack: goBack,
        onSolutionsClick: () => goTo(10), // CoreSolutionsSlide
        onFinishClick: () => goTo(0), // WelcomeSlide
        onRestartClick: () => goTo(2), // IntroductionHubSlide
      }, // 17: CaseStudiesSlide (company)
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
        <BadgeGroup currentSlide={current} lastVisitedSlide={navigationHistory[navigationHistory.length - 2]} onBadgeClick={goTo} />
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