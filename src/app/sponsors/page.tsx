"use client";

import Header from "@/components/Header";
import Image from "next/image";
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
    name: "Ивээн тэтгэгч 2",
    image: "/images/sponsors/cover-2.png",
  },
  {
    id: "sponsor-3",
    name: "Ивээн тэтгэгч 3",
    image: "/images/sponsors/cover-4.png",
  },
];

export default function SponsorsPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <Header />
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
              <div className="relative h-64 w-full bg-gray-100">
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
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
