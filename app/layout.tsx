import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Sans_Condensed } from "next/font/google";
import Script from "next/script";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import "./globals.css";
import Navbar from "./components/nevbar";
import Footer from "./components/footer";
import { BootWrapper } from "./components/boot_wrapper";
import { Analytics } from "@vercel/analytics/next";

/* Runs before first paint: resolves theme + marks first boot.
   is-booting class pairs with the body::before rule in globals.css
   to cover the page until the BootSequence component takes over. */
const pageInitScript = `
(function () {
  try {
    var s = localStorage.getItem("${THEME_STORAGE_KEY}");
    var dark = s === "dark" || (s !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    if (!sessionStorage.getItem("nf_booted")) {
      document.documentElement.classList.add("is-booting");
    }
  } catch (e) {}
})();
`;

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const ibmPlexSansCondensed = IBM_Plex_Sans_Condensed({
  variable: "--font-ibm-plex-sans-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
      data-theme="light"
      suppressHydrationWarning
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} ${ibmPlexSansCondensed.variable} h-full`}
    >
      <head>
        {/* Remove is-booting if JS is disabled so the page isn't permanently hidden */}
        <noscript>
          <style>{`html.is-booting body::before { display: none !important; }`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col">
        <Script
          id="page-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: pageInitScript }}
        />
        <BootWrapper />
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
