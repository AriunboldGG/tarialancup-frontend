import type { Metadata } from "next";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import MountainScrollScene from "@/components/MountainScrollScene";

export const metadata: Metadata = {
  title: "Нүүр хуудас",
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
      title: "Tarialan Cup 2026",
    },
    {
      id: "cover-2",
      image: "/images/cover-2.png",
      title: "Tarialan Cup 2026",
    },
    {
      id: "cover-111",
      image: "/images/cover-111.png",
      title: "Tarialan Cup 2026",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <div className="relative z-20">
        <Header />
        <section className="container mx-auto px-4 mt-10 md:mt-14">
          <HeroSlider slides={heroSlides} />
        </section>
      </div>
      <div className="relative z-0">
        <MountainScrollScene />
      </div>
    </main>
  );
}
