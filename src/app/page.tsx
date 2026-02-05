import type { Metadata } from "next";
import Header from "@/components/Header";
import MountainScrollScene from "@/components/MountainScrollScene";

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
  const heroSlides = [
    {
      id: "cover-1",
      image: "/images/cover-1.png",
      title: "Tarialan Cup - 2026",
      ctaLabel: "Дэлгэрэнгүй",
      href: "/news",
    },
    {
      id: "cover-2",
      image: "/images/cover-2.png",
      title: "Tarialan Cup 2026",
      ctaLabel: "Дэлгэрэнгүй",
      href: "/news",
    },
    {
      id: "cover-111",
      image: "/images/cover-111.png",
      title: "Tarialan Cup 2026",
      ctaLabel: "Дэлгэрэнгүй",
      href: "/news",
    },
    {
      id: "cover-4",
      image: "/images/cover-4.png",
      title: "Tarialan Cup 2026",
      ctaLabel: "Дэлгэрэнгүй",
      href: "/speakers",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <div className="fixed left-0 top-0 z-50 w-full">
        <Header />
      </div>
      <div className="relative z-0">
        <MountainScrollScene slides={heroSlides} />
      </div>
    </main>
  );
}
