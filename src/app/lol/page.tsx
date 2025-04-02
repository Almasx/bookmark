"use client";

import { Input } from "~/components/input";
import { useEffect, useRef } from "react";

export default function Lol() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const visibleHeight =
          window.visualViewport?.height || window.innerHeight;
        containerRef.current.style.height = `${visibleHeight}px`;
      }
    };

    // Set initial height
    handleResize();
    document.body.classList.add("overflow-y-hidden");

    // Listen to visual viewport changes
    window.visualViewport?.addEventListener("resize", handleResize);

    // Fallback for browsers that don't support visualViewport
    window.addEventListener("resize", handleResize);

    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ transform: "translate3d(0,0,0)" }}
      className="flex fixed inset-0 flex-col p-5 items-center justify-center bg-red-100"
      // Initial height that will be overridden by JS
    >
      <div className="w-full flex-grow bg-white rounded-2xl flex flex-col justify-between">
        <Input />
      </div>
    </div>
  );
}
