"use client";

import { useEffect, useRef } from "react";

const HERO_VIDEO_SRC = "/videos/hero.mp4";

export function HeroBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    const tryPlay = () => {
      if (document.visibilityState !== "visible") {
        return;
      }

      void video.play().catch(() => {
        // Some mobile browsers defer autoplay until the stream is buffered.
      });
    };

    tryPlay();

    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);
    document.addEventListener("visibilitychange", tryPlay);

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      document.removeEventListener("visibilitychange", tryPlay);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="hero-background-video absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster="/videos/hero-poster.jpg"
      disablePictureInPicture
      controls={false}
      controlsList="nodownload noplaybackrate noremoteplayback"
      aria-hidden
    >
      <source src={HERO_VIDEO_SRC} type="video/mp4" />
    </video>
  );
}
