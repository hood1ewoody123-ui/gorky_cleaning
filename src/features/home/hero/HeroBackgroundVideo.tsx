"use client";

import { useEffect, useRef } from "react";

const HERO_VIDEO_DESKTOP = "/videos/hero.mp4";
const HERO_VIDEO_MOBILE = "/videos/hero-mobile.mp4";
const HERO_POSTER_DESKTOP = "/videos/hero-poster.jpg";
const HERO_POSTER_MOBILE = "/videos/hero-mobile-poster.jpg";

function useAutoplayVideo() {
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

  return videoRef;
}

type HeroVideoProps = {
  src: string;
  poster: string;
  className: string;
};

function HeroVideo({ src, poster, className }: HeroVideoProps) {
  const videoRef = useAutoplayVideo();

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      disablePictureInPicture
      controls={false}
      controlsList="nodownload noplaybackrate noremoteplayback"
      aria-hidden
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

export function HeroBackgroundVideo() {
  return (
    <>
      <HeroVideo
        src={HERO_VIDEO_MOBILE}
        poster={HERO_POSTER_MOBILE}
        className="hero-background-video absolute inset-0 h-full w-full object-cover md:hidden"
      />
      <HeroVideo
        src={HERO_VIDEO_DESKTOP}
        poster={HERO_POSTER_DESKTOP}
        className="hero-background-video absolute inset-0 hidden h-full w-full object-cover md:block"
      />
    </>
  );
}
