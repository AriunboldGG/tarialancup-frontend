"use client";

import Header from "@/components/Header";
import Image from "next/image";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const sponsors = [
  {
    id: "sponsor-1",
    name: "Г. Тунгалагмөрөн",
    info: "2015 оны 12в ангийн төгсөгч",
    amount: "500,000₮",
    image: "/images/sponsors/sponsor1.jpg",
  },
  {
    id: "sponsor-2",
    name: "Ц. Энхболд",
    info: "2014 оны төгсөгч Шинэхэн аймгийн алдарт уяач",
    amount: "Унаган хурдан удмын даага",
    image: "/images/sponsors/sponsor2.jpg",
  },
  {
    id: "sponsor-3",
    name: "Б. Хулан",
    info: "2017 оны 12а ангийн төгсөгч",
    amount: "Шилдэг тоглогчдын шагнал, мөн зохион байгууулалтын хувцас хэрэглэл",
    image: "/images/sponsors/sponsor3.jpg",
  },
  {
    id: "sponsor-4",
    name: "Цэрэнбадамын Гансүх",
    info: "1996 оны төгсөгч",
    amount: "6,000,000₮ үнэ бүхий тайзны тоног төхөөрөмж",
    image: "/images/sponsors/sponsor4.jpg",
  },
  {
    id: "sponsor-5",
    name: "Д. Оюун-Эрдэнэ",
    info: "2016 оны 12б ангийн төгсөгч",
    amount: "2,500,000₮ Эсээ бичлэгийн уралдааны 12-р ангийн шагналыг ивээн тэтгэж байна",
    image: "/images/sponsors/sponsor5.jpg",
  },
];

export default function SponsorsPage() {
  const [zoomedImage, setZoomedImage] = useState<{ src: string; alt: string } | null>(null);

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <Header />

      {/* Lightbox */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute -top-4 -right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black shadow-lg hover:bg-gray-200"
              onClick={() => setZoomedImage(null)}
            >
              ✕
            </button>
            <img
              src={zoomedImage.src}
              alt={zoomedImage.alt}
              className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
            />
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-10">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">НҮҮР</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Ивээн тэтгэгчид</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-gray-900">Ивээн тэтгэгчид</h1>
          <p className="mt-3 text-sm text-gray-600">
            Тэмцээнийг дэмжиж буй ивээн тэтгэгчдийн мэдээлэл.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sponsors.map((sponsor) => (
            <Card key={sponsor.id} className="overflow-hidden">
              <div
                className="relative h-64 w-full cursor-zoom-in bg-gray-100"
                onClick={() => setZoomedImage({ src: sponsor.image, alt: sponsor.name })}
              >
                <Image
                  src={sponsor.image}
                  alt={sponsor.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{sponsor.name}</CardTitle>
                {sponsor.info && (
                  <div className="text-sm text-gray-700 mt-1">{sponsor.info}</div>
                )}
                {sponsor.amount && (
                  <div className="text-xl font-bold text-[#b8860b] mt-2">Хандив: {sponsor.amount}</div>
                )}
                {sponsor.gift && (
                  <div className="text-xl font-bold text-[#2e7d32] mt-2">Хандив: {sponsor.gift}</div>
                )}
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
