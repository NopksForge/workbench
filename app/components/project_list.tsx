"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PROJECTS } from "@/lib/projects";
import type { Project } from "@/lib/projects";

export { PROJECTS };

function StatusDot({ status }: { status: "live" | "wip" }) {
  const live = status === "live";
  return (
    <span
      className="inline-flex items-center gap-2 te-mono uppercase"
      style={{ fontSize: 10, letterSpacing: ".22em", color: "var(--silk-muted)" }}
    >
      <span
        className={live ? "" : "te-led-blink"}
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: live ? "var(--led-green)" : "var(--led-amber)",
          boxShadow: live
            ? "0 0 6px var(--led-green)"
            : "0 0 6px var(--led-amber)",
        }}
      />
      {status}
    </span>
  );
}

function isExternal(href: string) {
  return href.startsWith("http");
}

function ProjectRow({ p }: { p: Project }) {
  const [hov, setHov] = useState(false);
  const router = useRouter();
  const external = isExternal(p.primaryHref);

  return (
    <div
      role="link"
      tabIndex={0}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => router.push(`/projects/${p.id}`)}
      onKeyDown={(e) => e.key === "Enter" && router.push(`/projects/${p.id}`)}
      className="grid grid-cols-12 gap-8 py-10"
      style={{
        borderTop: "1px solid var(--rule)",
        background: hov ? "var(--hover)" : "transparent",
        marginInline: hov ? -16 : 0,
        paddingInline: hov ? 16 : 0,
        transition: "background .15s, margin .15s, padding .15s",
        cursor: "pointer",
      }}
    >
      {/* Number + status */}
      <div className="col-span-12 md:col-span-2">
        <div
          className="te-mono"
          style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}
        >
          № {p.code}
        </div>
        <div className="mt-3">
          <StatusDot status={p.status} />
        </div>
      </div>

      {/* Name + description + tags */}
      <div className="col-span-12 md:col-span-7">
        <h3
          className="te-sans font-medium leading-[1] inline-flex items-center gap-3"
          style={{
            fontSize: "clamp(28px, 3.4vw, 44px)",
            letterSpacing: "-.02em",
            color: "var(--ink)",
          }}
        >
          {p.name}
          <span
            style={{
              color: "var(--accent)",
              fontSize: ".5em",
              transform: hov ? "translateX(6px)" : "translateX(0)",
              transition: "transform .15s",
              display: "inline-block",
            }}
          >
            →
          </span>
        </h3>
        <p
          className="mt-3"
          style={{ fontSize: 15, lineHeight: 1.6, color: "var(--silk)", maxWidth: "52ch" }}
        >
          {p.desc}
        </p>
        <div
          className="mt-5 flex flex-wrap gap-x-4 gap-y-1 te-mono uppercase"
          style={{ fontSize: 10, letterSpacing: ".22em", color: "var(--silk-muted)" }}
        >
          {p.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="col-span-12 md:col-span-3 flex flex-col items-start md:items-end gap-2 md:justify-start">
        {/* view details — always present */}
        <Link
          href={`/projects/${p.id}`}
          onClick={(e) => e.stopPropagation()}
          className="te-mono uppercase inline-flex items-center gap-2"
          style={{
            fontSize: 11,
            letterSpacing: ".22em",
            color: "var(--accent)",
            paddingBottom: 4,
            borderBottom: "1px solid var(--accent)",
            textDecoration: "none",
          }}
        >
          view details <span>→</span>
        </Link>

        {external ? (
          <a
            href={p.primaryHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="te-mono uppercase inline-flex items-center gap-2"
            style={{
              fontSize: 11,
              letterSpacing: ".22em",
              color: "var(--ink)",
              paddingBottom: 4,
              borderBottom: "1px solid var(--ink)",
              textDecoration: "none",
            }}
          >
            {p.primaryLabel}
            <span style={{ color: "var(--accent)" }}>→</span>
          </a>
        ) : (
          <Link
            href={p.primaryHref}
            onClick={(e) => e.stopPropagation()}
            className="te-mono uppercase inline-flex items-center gap-2"
            style={{
              fontSize: 11,
              letterSpacing: ".22em",
              color: "var(--ink)",
              paddingBottom: 4,
              borderBottom: "1px solid var(--ink)",
              textDecoration: "none",
            }}
          >
            {p.primaryLabel}
            <span style={{ color: "var(--accent)" }}>→</span>
          </Link>
        )}

        {p.secondaryLabel && p.secondaryHref &&
          (isExternal(p.secondaryHref) ? (
            <a
              href={p.secondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="te-mono uppercase mt-2"
              style={{
                fontSize: 11,
                letterSpacing: ".22em",
                color: "var(--silk-muted)",
                textDecoration: "none",
              }}
            >
              {p.secondaryLabel}
            </a>
          ) : (
            <Link
              href={p.secondaryHref}
              onClick={(e) => e.stopPropagation()}
              className="te-mono uppercase mt-2"
              style={{
                fontSize: 11,
                letterSpacing: ".22em",
                color: "var(--silk-muted)",
                textDecoration: "none",
              }}
            >
              {p.secondaryLabel}
            </Link>
          ))}
      </div>
    </div>
  );
}

export function ProjectList() {
  return (
    <section className="pb-24">
      <div
        className="flex items-end justify-between mb-2 te-mono uppercase"
        style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}
      >
        <span>featured projects</span>
        <span>live & in-progress</span>
      </div>
      {PROJECTS.map((p) => (
        <ProjectRow key={p.id} p={p} />
      ))}
      <div style={{ borderTop: "1px solid var(--rule)" }} />
    </section>
  );
}
