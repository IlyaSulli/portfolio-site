import { Head } from "./head";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import dynamic from "next/dynamic";

import { AppNavbar } from "@/components/navbar";

// Load Vercel components on client to avoid hydration issues

const ClientAnalytics = dynamic(
  () => import("@vercel/analytics/next").then((mod) => mod.Analytics),
  { ssr: false }
);

const ClientSpeedInsights = dynamic(
  () => import("@vercel/speed-insights/next").then((mod) => mod.SpeedInsights),
  { ssr: false }
);

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <ClientAnalytics />
      <ClientSpeedInsights />
      <Head />
      <AppNavbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16 relative z-10">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3 flex-col relative z-10">
        <span className="text-default-600 px-8">Designed and made with 💖 || This site uses annonymous usage statistics</span>
      </footer>
    </div>
  );
}
