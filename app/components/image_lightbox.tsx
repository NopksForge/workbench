"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export function ImageLightbox({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const [lightboxSize, setLightboxSize] = useState<{ w: number; h: number } | null>(null);
  const [mobilePreviewPage, setMobilePreviewPage] = useState(0);
  const naturalRef = useRef({ w: 0, h: 0 });
  const previewScrollRef = useRef<HTMLDivElement>(null);

  const fitLightboxToImage = useCallback(() => {
    const nw = naturalRef.current.w;
    const nh = naturalRef.current.h;
    if (!nw || !nh) return;
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    const maxW = window.innerWidth * (desktop ? 0.94 : 0.9);
    const maxH = window.innerHeight * (desktop ? 0.85 : 0.5);
    const scale = Math.min(maxW / nw, maxH / nh, 1);
    setLightboxSize({
      w: Math.max(1, Math.round(nw * scale)),
      h: Math.max(1, Math.round(nh * scale)),
    });
  }, []);

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
    if (!el || images.length <= 1) return;
    onPreviewScroll();
    el.addEventListener("scroll", onPreviewScroll, { passive: true });
    return () => el.removeEventListener("scroll", onPreviewScroll);
  }, [images.length, onPreviewScroll]);

  useEffect(() => {
    if (images.length <= 1) return;
    const onResize = () => onPreviewScroll();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [images.length, onPreviewScroll]);

  const previewGridClass =
    images.length > 1
      ? "flex snap-x snap-mandatory gap-0 overflow-x-auto [-webkit-overflow-scrolling:touch] lg:grid lg:grid-cols-2 lg:gap-3 lg:overflow-visible lg:snap-none"
      : "grid grid-cols-1 gap-3";

  const previewTileClass =
    images.length > 1 ? "w-full min-w-full shrink-0 snap-center lg:min-w-0" : "";

  return (
    <>
      <div className="space-y-2 lg:space-y-0">
        <div
          ref={images.length > 1 ? previewScrollRef : undefined}
          role={images.length > 1 ? "region" : undefined}
          aria-label={images.length > 1 ? `${alt} preview images` : undefined}
          className={previewGridClass}
        >
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setOpen(i)}
              className={`relative block overflow-hidden ${previewTileClass}`}
              style={{
                border: "1px solid var(--ink)",
                aspectRatio: "16/10",
                cursor: "zoom-in",
                background: "none",
                padding: 0,
              }}
            >
              <Image
                src={src}
                alt={`${alt} preview ${i + 1}`}
                fill
                style={{ objectFit: "cover", transition: "opacity .15s" }}
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

        {images.length > 1 && (
          <p
            className="te-mono text-center lg:hidden"
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
              className="pointer-events-auto absolute top-6 right-6 te-mono uppercase"
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
              className={`pointer-events-auto relative overflow-hidden max-w-[90vw] max-h-[50vh] lg:max-w-[94vw] lg:max-h-[85vh] ${lightboxSize ? "" : "w-[90vw] h-[50vh] lg:w-[94vw] lg:h-[85vh]"}`}
              style={{
                width: lightboxSize ? `${lightboxSize.w}px` : undefined,
                height: lightboxSize ? `${lightboxSize.h}px` : undefined,
                border: "1px solid var(--ink)",
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
