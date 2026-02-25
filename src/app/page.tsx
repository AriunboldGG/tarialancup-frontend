import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Tarialan Cup - 2026",
  description: "Tarialan cup - 2026",
  openGraph: {
    title: "Tarialan cup - 2026 ",
    description: "Tarialan cup - 2026",
    url: "/",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="fixed left-0 top-0 z-50 w-full">
        <Header />
      </div>
      <div className="relative z-0 h-screen w-full">
        <iframe
          id="panorama-frame"
          src="/app-files/index.html"
          title="Tarialan Cup Panorama"
          className="h-full w-full border-0"
          allow="fullscreen"
        />
      </div>
    </main>
  );
}
