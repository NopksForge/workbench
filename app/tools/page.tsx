import type { Metadata } from "next";
import Link from "next/link";
import { EmojiCommitSection } from "@/app/components/Tools/emoji";
import { JsonFormatterSection } from "@/app/components/Tools/json_formatter";
import { UuidGenSection } from "@/app/components/Tools/uuid_gen";

export const metadata: Metadata = {
  title: "Tools · Workbench",
  description: "Small utilities for day-to-day dev work.",
};

export default function ToolsPage() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Dev tools
          </h1>
          <p className="max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
            Quick helpers—more sections can land here over time.
          </p>
        </header>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-8">
          <EmojiCommitSection />
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-8">
          <UuidGenSection />
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-8">
          <JsonFormatterSection />
        </div>
      </main>
    </div>
  );
}
