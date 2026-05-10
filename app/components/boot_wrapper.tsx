"use client";

import dynamic from "next/dynamic";

const BootSequence = dynamic(
  () => import("./boot_sequence").then((m) => ({ default: m.BootSequence })),
  { ssr: false },
);

export function BootWrapper() {
  return <BootSequence />;
}
