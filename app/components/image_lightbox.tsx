"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

const LG_MEDIA = "(min-width: 1024px)";

function useMinWidthLg(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(LG_MEDIA);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(LG_MEDIA).matches,
    () => false,
  );
}

export function ImageLightbox({
  images,
  alt,
  previewIsPortrait = false,
  previewScale = 1,
  previewForceCarousel = false,
  previewCarouselIntervalMs = 0,
}: {
  images: string[];
  alt: string;
  /** Portrait-oriented previews: taller tile, contain (no crop), extra lightbox height on small screens. */
  previewIsPortrait?: boolean;
  /** Preview block width as fraction of parent; clamped 0.4–1. */
  previewScale?: number;
  /** Snap carousel at every breakpoint. */
  previewForceCarousel?: boolean;
  /** Auto-advance carousel (ms); 0 = off. Pauses on hover / while lightbox open. */
  previewCarouselIntervalMs?: number;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const [lightboxSize, setLightboxSize] = useState<{ w: number; h: number } | null>(null);
  const [mobilePreviewPage, setMobilePreviewPage] = useState(0);
  const naturalRef = useRef({ w: 0, h: 0 });
  const previewScrollRef = useRef<HTMLDivElement>(null);
  const pauseCarouselRef = useRef(false);
  const isLg = useMinWidthLg();

  const carouselMode = images.length > 1 && (!isLg || previewForceCarousel);
  const widthPct = Math.min(100, Math.max(40, previewScale * 100));

  const fitLightboxToImage = useCallback(() => {
    const nw = naturalRef.current.w;
    const nh = naturalRef.current.h;
    if (!nw || !nh) return;
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    const maxW = window.innerWidth * (desktop ? 0.94 : 0.9);
    const maxHFrac = previewIsPortrait
      ? desktop
        ? 0.88
        : 0.78
      : desktop
        ? 0.85
        : 0.5;
    const maxH = window.innerHeight * maxHFrac;
    const scale = Math.min(maxW / nw, maxH / nh, 1);
    setLightboxSize({
      w: Math.max(1, Math.round(nw * scale)),
      h: Math.max(1, Math.round(nh * scale)),
    });
  }, [previewIsPortrait]);

  useEffect(() => {
    naturalRef.current = { w: 0, h: 0 };
    setLightboxSize(null);
  }, [open]);

  useEffect(() => {
    if (open === null) return;
    const onResize = () => fitLightboxToImage();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open, fitLightboxToImage]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? null : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? null : (i - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length]);

  const onPreviewScroll = useCallback(() => {
    const el = previewScrollRef.current;
    if (!el) return;
    const slideW = el.clientWidth;
    if (slideW <= 0) return;
    const page = Math.round(el.scrollLeft / slideW);
    setMobilePreviewPage(Math.min(images.length - 1, Math.max(0, page)));
  }, [images.length]);

  useEffect(() => {
    const el = previewScrollRef.current;
    if (!el || !carouselMode) return;
    onPreviewScroll();
    el.addEventListener("scroll", onPreviewScroll, { passive: true });
    return () => el.removeEventListener("scroll", onPreviewScroll);
  }, [carouselMode, images.length, onPreviewScroll]);

  useEffect(() => {
    if (!carouselMode) return;
    const onResize = () => onPreviewScroll();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [carouselMode, onPreviewScroll]);

  useEffect(() => {
    if (
      !carouselMode ||
      !previewCarouselIntervalMs ||
      previewCarouselIntervalMs <= 0 ||
      open !== null
    ) {
      return;
    }
    const id = window.setInterval(() => {
      if (pauseCarouselRef.current) return;
      const el = previewScrollRef.current;
      if (!el) return;
      const w = el.clientWidth;
      if (w <= 0) return;
      const cur = Math.round(el.scrollLeft / w);
      const next = (cur + 1) % images.length;
      el.scrollTo({ left: next * w, behavior: "smooth" });
    }, previewCarouselIntervalMs);
    return () => window.clearInterval(id);
  }, [carouselMode, previewCarouselIntervalMs, images.length, open]);

  const previewGridClass =
    images.length <= 1
      ? "grid grid-cols-1 gap-3"
      : carouselMode
        ? "flex snap-x snap-mandatory gap-0 overflow-x-auto [-webkit-overflow-scrolling:touch]"
        : "flex snap-x snap-mandatory gap-0 overflow-x-auto [-webkit-overflow-scrolling:touch] lg:grid lg:grid-cols-2 lg:gap-3 lg:overflow-visible lg:snap-none";

  const previewTileClass =
    images.length > 1
      ? carouselMode
        ? "w-full min-w-full shrink-0 snap-center"
        : "w-full min-w-full shrink-0 snap-center lg:min-w-0"
      : "";

  return (
    <>
      <div
        className="mx-auto space-y-2 lg:space-y-0"
        style={{ width: `${widthPct}%`, maxWidth: "100%" }}
      >
        <div
          ref={carouselMode ? previewScrollRef : undefined}
          role={carouselMode ? "region" : undefined}
          aria-label={carouselMode ? `${alt} preview images` : undefined}
          className={previewGridClass}
          onPointerEnter={() => {
            pauseCarouselRef.current = true;
          }}
          onPointerLeave={() => {
            pauseCarouselRef.current = false;
          }}
        >
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setOpen(i)}
              className={`relative block overflow-hidden ${previewTileClass}`}
              style={{
                border: "0px solid var(--ink)",
                aspectRatio: previewIsPortrait ? "9 / 16" : "16 / 10",
                cursor: "zoom-in",
                background: "none",
                padding: 0,
              }}
            >
              <Image
                src={src}
                alt={`${alt} preview ${i + 1}`}
                fill
                style={{
                  objectFit: previewIsPortrait ? "contain" : "cover",
                  transition: "opacity .15s",
                }}
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <span
                className="absolute inset-0 flex items-center justify-center te-mono uppercase opacity-0 hover:opacity-100"
                style={{
                  fontSize: 10,
                  letterSpacing: ".25em",
                  color: "var(--rule)",
                  background: "color-mix(in srgb, var(--bg) 60%, transparent)",
                  transition: "opacity .15s",
                }}
              >
                enlarge →
              </span>
            </button>
          ))}
        </div>

        {carouselMode && (
          <p
            className="te-mono text-center"
            style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}
            aria-live="polite"
          >
            {mobilePreviewPage + 1} / {images.length}
          </p>
        )}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-50"
          style={{ background: "color-mix(in srgb, var(--bg) 88%, transparent)" }}
        >
          {/* Full-bleed hit target so clicks outside the image (and non-interactive chrome) always close */}
          <button
            type="button"
            tabIndex={-1}
            aria-label="Close enlarged image"
            className="absolute inset-0 block cursor-default border-0 p-0"
            style={{ background: "transparent" }}
            onClick={() => setOpen(null)}
          />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            {/* close */}
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="pointer-events-auto absolute top-6 right-6 te-mono uppercase z-20"
              style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}
            >
              close ×
            </button>

            {/* counter */}
            {images.length > 1 && (
              <div
                className="absolute top-6 left-1/2 -translate-x-1/2 te-mono"
                style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}
              >
                {open + 1} / {images.length}
              </div>
            )}

            {/* image */}
            <div
              className={`pointer-events-auto relative overflow-hidden max-w-[90vw] lg:max-w-[94vw] ${previewIsPortrait ? "max-h-[78vh] lg:max-h-[88vh]" : "max-h-[50vh] lg:max-h-[85vh]"} ${lightboxSize ? "" : previewIsPortrait ? "h-[78vh] w-[90vw] lg:h-[88vh] lg:w-[94vw]" : "h-[50vh] w-[90vw] lg:h-[85vh] lg:w-[94vw]"}`}
              style={{
                width: lightboxSize ? `${lightboxSize.w}px` : undefined,
                height: lightboxSize ? `${lightboxSize.h}px` : undefined,
                border: "1px solid color-mix(in srgb, var(--ink) 100%, transparent 95%)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[open]}
                alt={`${alt} preview ${open + 1}`}
                fill
                style={{ objectFit: "contain" }}
                sizes="(min-width: 1024px) 94vw, 90vw"
                priority
                onLoadingComplete={(img) => {
                  naturalRef.current = {
                    w: img.naturalWidth,
                    h: img.naturalHeight,
                  };
                  fitLightboxToImage();
                }}
              />
            </div>

            {/* prev / next — tall hit strips; hover: brighter, glow, slightly larger */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen((open - 1 + images.length) % images.length);
                  }}
                  className="pointer-events-auto absolute top-0 bottom-0 left-0 z-10 flex w-[min(28vw,7.5rem)] cursor-pointer items-center justify-center te-mono uppercase transition-[color,font-size,text-shadow,transform] duration-200 ease-out [font-size:10px] [letter-spacing:0.25em] text-[var(--silk-muted)] hover:text-[color-mix(in_srgb,var(--ink)_88%,white)] hover:[font-size:12px] hover:[text-shadow:0_0_14px_color-mix(in_srgb,var(--ink)_45%,transparent),0_0_28px_color-mix(in_srgb,white_22%,transparent)] hover:scale-[1.04] [transform-origin:center_left] active:scale-[1.01] sm:w-32"
                >
                  ← prev
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen((open + 1) % images.length);
                  }}
                  className="pointer-events-auto absolute top-0 bottom-0 right-0 z-10 flex w-[min(28vw,7.5rem)] cursor-pointer items-center justify-center te-mono uppercase transition-[color,font-size,text-shadow,transform] duration-200 ease-out [font-size:10px] [letter-spacing:0.25em] text-[var(--silk-muted)] hover:text-[color-mix(in_srgb,var(--ink)_88%,white)] hover:[font-size:12px] hover:[text-shadow:0_0_14px_color-mix(in_srgb,var(--ink)_45%,transparent),0_0_28px_color-mix(in_srgb,white_22%,transparent)] hover:scale-[1.04] [transform-origin:center_right] active:scale-[1.01] sm:w-32"
                >
                  next →
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
