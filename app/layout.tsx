import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import "./globals.css";
import Navbar from "./components/nevbar";
import Footer from "./components/footer";
import { Analytics } from "@vercel/analytics/next"

/** Runs before paint so `dark` on <html> matches localStorage / system (see Navbar toggle). */
const themeInitScript = `
(function () {
  try {
    var s = localStorage.getItem("${THEME_STORAGE_KEY}");
    var dark =
      s === "dark" ||
      (s !== "light" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", dark);
  } catch (e) {}
})();
`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NopksForge",
  description: "welcome to noppasan's experimental zone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <Navbar />
        {children}
        <Footer />
        <Analytics/>
      </body>
    </html>
  );
}
