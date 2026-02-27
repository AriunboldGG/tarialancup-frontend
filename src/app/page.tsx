"use client";

import Header from "@/components/Header";
import IntroSplash from "@/components/IntroSplash";
import { useEffect, useState } from "react";

export default function Home() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile (phones only, not tablets)
    const checkMobile = () => {
      // Only hide on phones (below 640px), not tablets
      setIsMobile(window.innerWidth < 640); // sm breakpoint - phones only
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'panorama:modalVisibility') {
        setIsModalVisible(event.data.visible);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Only hide header on mobile devices when modal is visible
  const shouldHideHeader = isModalVisible && isMobile;

  return (
    <main className="min-h-screen bg-white">
      <IntroSplash />
      <div 
        className={`fixed left-0 top-0 z-50 w-full transition-opacity duration-200 ${
          shouldHideHeader 
            ? 'opacity-0 pointer-events-none' 
            : 'opacity-100'
        }`}
      >
        <Header />
      </div>
      <div className="relative z-0 h-screen w-full">
        <iframe
          id="panorama-frame"
          src="/app-files/index.html"
          title="Tarialan Cup Panorama"
          className="h-full w-full border-0"
          allow="fullscreen"
        />
      </div>
    </main>
  );
}
