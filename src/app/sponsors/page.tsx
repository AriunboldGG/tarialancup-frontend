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
    name: "Ивээн тэтгэгч 1",
    role: "Албан ёсны ивээн тэтгэгч",
    description: "Тэмцээний зохион байгуулалтад дэмжлэг үзүүлж буй байгууллага.",
    image: "/images/cover-1.png",
  },
  {
    id: "sponsor-2",
    name: "Ивээн тэтгэгч 2",
    role: "Мөнгөн ивээн тэтгэгч",
    description: "Оролцогчдын үйл ажиллагааг дэмжиж буй хамтрагч.",
    image: "/images/cover-2.png",
  },
  {
    id: "sponsor-3",
    name: "Ивээн тэтгэгч 3",
    role: "Хүрэл ивээн тэтгэгч",
    description: "Тэмцээний урамшуулал, шагналын санг дэмжигч байгууллага.",
    image: "/images/cover-4.png",
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
                <CardDescription>{sponsor.role}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-gray-600">
                {sponsor.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
