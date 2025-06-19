import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    position: "absolute" as const,
  }),
  center: {
    x: 0,
    opacity: 1,
    position: "relative" as const,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    position: "absolute" as const,
  }),
};

export default function SlideShow() {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const project = projects[page];

  const paginate = useCallback(
    (newDirection: number) => {
      setPage(([prevPage]) => {
        let nextPage = prevPage + newDirection;
        if (nextPage < 0) nextPage = 0;
        if (nextPage >= projects.length) nextPage = projects.length - 1;
        return [nextPage, newDirection];
      });
    },
    []
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [paginate]);

  return (
    <div style={{ position: "relative", width: "100%", height: "60vh", overflow: "hidden" }}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#f8fafc",
            borderRadius: 24,
            boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
            padding: 32,
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <h2 style={{ fontSize: 32, marginBottom: 16 }}>{project.name}</h2>
          <p style={{ fontSize: 20, marginBottom: 8 }}>{project.desc}</p>
          <p style={{ color: "#888" }}>
            Lat: {project.lat}, Lng: {project.lng}
          </p>
          <div style={{ position: "absolute", bottom: 16, left: 0, right: 0, textAlign: "center" }}>
            <span style={{ color: "#bbb" }}>
              Slide {page + 1} of {projects.length} (Use ←/→)
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 