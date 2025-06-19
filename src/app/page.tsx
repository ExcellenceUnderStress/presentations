"use client";

import React, { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WelcomeSlide from "../../components/slides/WelcomeSlide";
import LegacySlide from "../../components/slides/LegacySlide";
import AboutUsSlide from "../../components/slides/AboutUsSlide";
import OurProcessSlide from "../../components/slides/OurProcessSlide";
import WhyPostTensioningSlide from "../../components/slides/WhyPostTensioningSlide";
import CriticalSlide from "../../components/slides/CriticalSlide";
import CoreSolutionsSlide from "../../components/slides/CoreSolutionsSlide";
import RepairRetrofitSlide from "../../components/slides/RepairRetrofitSlide";
import BarrierCableSlide from "../../components/slides/BarrierCableSlide";
import InnovationsSlide from "../../components/slides/InnovationsSlide";
import SafetySlide from "../../components/slides/SafetySlide";
import CaseStudiesSlide from "../../components/slides/CaseStudiesSlide";
import "./globals.css";

const slides = [
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
    Component: WhyPostTensioningSlide,
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
    props: { solutionType: "repair" },
  },
  {
    Component: BarrierCableSlide,
    props: {},
  },
  {
    Component: CaseStudiesSlide,
    props: { solutionType: "barrier" },
  },
  {
    Component: InnovationsSlide,
    props: {},
  },
  {
    Component: CaseStudiesSlide,
    props: { solutionType: "innovations" },
  },
  {
    Component: SafetySlide,
    props: {},
  },
  {
    Component: CaseStudiesSlide,
    props: { solutionType: "safety" },
  },
];

export default function PresentationPage() {
  const [current, setCurrent] = useState(0);

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
    { onPrev: goPrev, onNext: goNext }, // 4: WhyPostTensioningSlide
    { onPrev: goPrev, onNext: goNext }, // 5: CriticalSlide
    { 
      onPrev: goPrev, 
      onRepairClick: () => goTo(7), 
      onBarrierClick: () => goTo(9), 
      onInnovationsClick: () => goTo(11), 
      onSafetyClick: () => goTo(13), 
      onNext: goNext 
    }, // 6: CoreSolutionsSlide
    { onBack: () => goTo(6), onNext: goNext }, // 7: RepairRetrofitSlide
    { onBack: () => goTo(7), onNext: goNext }, // 8: CaseStudiesSlide (repair)
    { onBack: () => goTo(6), onNext: goNext }, // 9: BarrierCableSlide
    { onBack: () => goTo(9), onNext: goNext }, // 10: CaseStudiesSlide (barrier)
    { onBack: () => goTo(6), onNext: goNext }, // 11: InnovationsSlide
    { onBack: () => goTo(11), onNext: goNext }, // 12: CaseStudiesSlide (innovations)
    { onBack: () => goTo(6), onNext: goNext }, // 13: SafetySlide
    { onBack: () => goTo(13) }, // 14: CaseStudiesSlide (safety)
  ];

  const { Component } = slides[current];
  const slideSpecificProps = slideProps[current];
  const slideProps_combined = { ...slides[current].props, ...slideSpecificProps };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <Component key={current} {...slideProps_combined} />
      </AnimatePresence>
    </div>
  );
}
