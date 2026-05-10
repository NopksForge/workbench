import type { Metadata } from "next";
import { EmojiCommitSection } from "@/app/components/Tools/emoji";
import { JsonFormatterSection } from "@/app/components/Tools/json_formatter";
import { UuidGenSection } from "@/app/components/Tools/uuid_gen";

export const metadata: Metadata = {
  title: "NopksForge · Workbench",
  description: "Small utilities for day-to-day dev work.",
};

function ToolSection({
  code,
  name,
  desc,
  children,
}: {
  code: string;
  name: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-12" style={{ borderTop: "1px solid var(--rule)" }}>
      <div className="grid grid-cols-12 gap-6 items-baseline mb-6">
        <div
          className="col-span-12 md:col-span-2 te-mono uppercase"
          style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}
        >
          № {code}
        </div>
        <div className="col-span-12 md:col-span-10">
          <h3
            className="te-sans font-medium leading-[1]"
            style={{ fontSize: 28, letterSpacing: "-.02em", color: "var(--ink)" }}
          >
            {name}
          </h3>
          <p
            className="te-mono mt-2"
            style={{ fontSize: 12, color: "var(--silk-muted)", letterSpacing: ".04em" }}
          >
            {desc}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-2" />
        <div className="col-span-12 md:col-span-10">{children}</div>
      </div>
    </section>
  );
}

export default function ToolsPage() {
  return (
    <div className="max-w-[1080px] mx-auto px-6">
      {/* Hero */}
      <section className="pt-24 pb-12">
        <div
          className="te-mono uppercase mb-8"
          style={{ fontSize: 10, letterSpacing: ".25em", color: "var(--silk-muted)" }}
        >
          nopksforge — workbench
        </div>
        <h1
          className="te-sans font-medium leading-[.95]"
          style={{
            fontSize: "clamp(48px, 7vw, 96px)",
            letterSpacing: "-.03em",
            color: "var(--ink)",
          }}
        >
          dev tools<span style={{ color: "var(--accent)" }}>.</span>
        </h1>
        <p
          className="mt-6 max-w-[58ch]"
          style={{ fontSize: 16, lineHeight: 1.6, color: "var(--silk)" }}
        >
          Quick helpers — more sections can land here over time.
        </p>
      </section>

      <ToolSection
        code="01"
        name="Emoji commits"
        desc="Tap to copy a git commit -m prefix."
      >
        <EmojiCommitSection />
      </ToolSection>

      <ToolSection
        code="02"
        name="UUID generator"
        desc="Random v4 — copy into Bruno or Postman."
      >
        <UuidGenSection />
      </ToolSection>

      <ToolSection
        code="03"
        name="JSON formatter"
        desc="Parse, beautify, minify."
      >
        <JsonFormatterSection />
      </ToolSection>
    </div>
  );
}
