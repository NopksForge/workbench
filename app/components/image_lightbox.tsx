"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function ImageLightbox({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [open, setOpen] = useState<number | null>(null);

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

  return (
    <>
      <div className={`grid gap-3 ${images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setOpen(i)}
            className="relative overflow-hidden block"
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
              sizes="(max-width: 768px) 100vw, 50vw"
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

      {open !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "color-mix(in srgb, var(--bg) 88%, transparent)" }}
          onClick={() => setOpen(null)}
        >
          {/* close */}
          <button
            onClick={() => setOpen(null)}
            className="absolute top-6 right-6 te-mono uppercase"
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
            className="relative"
            style={{ maxWidth: "90vw", maxHeight: "85vh", width: "100%", height: "100%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[open]}
              alt={`${alt} preview ${open + 1}`}
              fill
              style={{ objectFit: "contain" }}
              sizes="90vw"
              priority
            />
          </div>

          {/* prev / next */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + images.length) % images.length); }}
                className="absolute left-6 te-mono uppercase"
                style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}
              >
                ← prev
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % images.length); }}
                className="absolute right-6 te-mono uppercase"
                style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}
              >
                next →
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
