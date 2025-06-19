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
    Component: BarrierCableSlide,
    props: {},
  },
  {
    Component: InnovationsSlide,
    props: {},
  },
  {
    Component: SafetySlide,
    props: {},
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
    { onNext: goNext }, // WelcomeSlide
    { onPrev: goPrev, onVideoEnd: goNext }, // LegacySlide
    { onPrev: goPrev, onNext: goNext }, // AboutUsSlide
    { onPrev: goPrev, onNext: goNext }, // OurProcessSlide
    { onPrev: goPrev, onNext: goNext }, // WhyPostTensioningSlide
    { onPrev: goPrev, onNext: goNext }, // CriticalSlide (gallery mode handled internally)
    { 
      onPrev: goPrev, 
      onRepairClick: () => goTo(7), 
      onBarrierClick: () => goTo(8), 
      onInnovationsClick: () => goTo(9), 
      onSafetyClick: () => goTo(10), 
      onNext: goNext 
    }, // CoreSolutionsSlide
    { onBack: () => goTo(6), onNext: goNext }, // RepairRetrofitSlide
    { onBack: () => goTo(6), onNext: goNext }, // BarrierCableSlide
    { onBack: () => goTo(6), onNext: goNext }, // InnovationsSlide
    { onBack: () => goTo(6) }, // SafetySlide
  ];

  const { Component } = slides[current];
  const props = slideProps[current];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <Component key={current} {...props} />
      </AnimatePresence>
    </div>
  );
}
