"use client";

import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type Speaker = {
  id: string;
  firstName: string;
  lastName: string;
  workplace: string;
  profession: string;
  graduateUniversity: string;
  talkTitle: string;
  photo?: string;
  intro: string;
  universityInfo: string;
  jobInfo: string;
  experience: string;
  gallery: string[];
};

const speakers: Speaker[] = [
  {
    id: "speaker-1",
    firstName: "Test",
    lastName: "Tester",
    workplace: "Хаан банк",
    profession: "Програм хангамжийн инженер",
    graduateUniversity: "ОХУ, Томскийн Политехникийн Их Сургууль",
    talkTitle: "Технологийн эрин зуун",
    photo: "/images/cover-1.png",
    intro: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham",
    universityInfo: "Төгссөн сургууль болон мэргэжлийн чиглэлийн мэдээлэл.",
    jobInfo: "Одоогийн ажил, байгууллага, үүрэг хариуцлагын тухай.",
    experience: "Ажлын туршлага, оролцсон төслүүд, .",
    gallery: ["/images/cover-1.png", "/images/cover-2.png", "/images/cover-111.png"],
  },
  {
    id: "speaker-2",
    firstName: "Нэр",
    lastName: "Овог",
    workplace: "Ажлын газар",
    profession: "Мэргэжил",
    graduateUniversity: "Төгссөн сургууль",
    talkTitle: "Ирээдүйн мэргэжил сонголт",
    photo: "/images/cover-2.png",
    intro: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham",
    universityInfo: "Төгссөн сургууль болон мэргэжлийн чиглэлийн мэдээлэл.",
    jobInfo: "Одоогийн ажил, байгууллага, үүрэг хариуцлагын тухай.",
    experience: "Ажлын туршлага, оролцсон төслүүд, .",
    gallery: ["/images/cover-2.png", "/images/cover-1.png", "/images/cover-111.png"],
  },
  {
    id: "speaker-3",
    firstName: "Нэр",
    lastName: "Овог",
    workplace: "Ажлын газар",
    profession: "Мэргэжил",
    graduateUniversity: "Төгссөн сургууль",
    talkTitle: "Өрсөлдөх чадвар ба ур чадвар",
    photo: "/images/cover-111.png",
    intro: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham",
    universityInfo: "Төгссөн сургууль болон мэргэжлийн чиглэлийн мэдээлэл.",
    jobInfo: "Одоогийн ажил, байгууллага, үүрэг хариуцлагын тухай.",
    experience: "Ажлын туршлага, оролцсон төслүүд, .",
    gallery: ["/images/cover-111.png", "/images/cover-1.png", "/images/cover-2.png"],
  },
  {
    id: "speaker-4",
    firstName: "Нэр",
    lastName: "Овог",
    workplace: "Ажлын газар",
    profession: "Мэргэжил",
    graduateUniversity: "Төгссөн сургууль",
    talkTitle: "Карьер төлөвлөлтийн зөвлөмж",
    photo: "/images/cover-1.png",
    intro: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
    universityInfo: "Төгссөн сургууль болон мэргэжлийн чиглэлийн мэдээлэл.",
    jobInfo: "Одоогийн ажил, байгууллага, үүрэг хариуцлагын тухай.",
    experience: "Ажлын туршлага, оролцсон төслүүд, .",
    gallery: ["/images/cover-1.png", "/images/cover-2.png"],
  },
  {
    id: "speaker-5",
    firstName: "Нэр",
    lastName: "Овог",
    workplace: "Ажлын газар",
    profession: "Мэргэжил",
    graduateUniversity: "Төгссөн сургууль",
    talkTitle: "Дижитал эдийн засагт бэлтгэх нь",
    photo: "/images/cover-2.png",
    intro: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
    universityInfo: "Төгссөн сургууль болон мэргэжлийн чиглэлийн мэдээлэл.",
    jobInfo: "Одоогийн ажил, байгууллага, үүрэг хариуцлагын тухай.",
    experience: "Ажлын туршлага, оролцсон төслүүд, .",
    gallery: ["/images/cover-2.png", "/images/cover-1.png"],
  },
  {
    id: "speaker-6",
    firstName: "Нэр",
    lastName: "Овог",
    workplace: "Ажлын газар",
    profession: "Мэргэжил",
    graduateUniversity: "Төгссөн сургууль",
    talkTitle: "Суралцах арга барил ба амжилт",
    photo: "/images/cover-111.png",
    intro: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
    universityInfo: "Төгссөн сургууль болон мэргэжлийн чиглэлийн мэдээлэл.",
    jobInfo: "Одоогийн ажил, байгууллага, үүрэг хариуцлагын тухай.",
    experience: "Ажлын туршлага, оролцсон төслүүд, .",
    gallery: ["/images/cover-111.png", "/images/cover-1.png"],
  },
  {
    id: "speaker-7",
    firstName: "Нэр",
    lastName: "Овог",
    workplace: "Ажлын газар",
    profession: "Мэргэжил",
    graduateUniversity: "Төгссөн сургууль",
    talkTitle: "Ажил мэргэжлийн сорилт",
    photo: "/images/cover-1.png",
    intro: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
    universityInfo: "Төгссөн сургууль болон мэргэжлийн чиглэлийн мэдээлэл.",
    jobInfo: "Одоогийн ажил, байгууллага, үүрэг хариуцлагын тухай.",
    experience: "Ажлын туршлага, оролцсон төслүүд, .",
    gallery: ["/images/cover-1.png", "/images/cover-2.png"],
  },
  {
    id: "speaker-8",
    firstName: "Нэр",
    lastName: "Овог",
    workplace: "Ажлын газар",
    profession: "Мэргэжил",
    graduateUniversity: "Төгссөн сургууль",
    talkTitle: "Шийдвэр гаргалт ба ирээдүй",
    photo: "/images/cover-2.png",
    intro: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
    universityInfo: "Төгссөн сургууль болон мэргэжлийн чиглэлийн мэдээлэл.",
    jobInfo: "Одоогийн ажил, байгууллага, үүрэг хариуцлагын тухай.",
    experience: "Ажлын туршлага, оролцсон төслүүд, .",
    gallery: ["/images/cover-2.png", "/images/cover-111.png"],
  },
  {
    id: "speaker-9",
    firstName: "Нэр",
    lastName: "Овог",
    workplace: "Ажлын газар",
    profession: "Мэргэжил",
    graduateUniversity: "Төгссөн сургууль",
    talkTitle: "Багийн ажил ба манлайлал",
    photo: "/images/cover-111.png",
    intro: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
    universityInfo: "Төгссөн сургууль болон мэргэжлийн чиглэлийн мэдээлэл.",
    jobInfo: "Одоогийн ажил, байгууллага, үүрэг хариуцлагын тухай.",
    experience: "Ажлын туршлага, оролцсон төслүүд, .",
    gallery: ["/images/cover-111.png", "/images/cover-2.png"],
  },
  {
    id: "speaker-10",
    firstName: "Нэр",
    lastName: "Овог",
    workplace: "Ажлын газар",
    profession: "Мэргэжил",
    graduateUniversity: "Төгссөн сургууль",
    talkTitle: "Мэргэжлийн өсөлт ба хөгжил",
    photo: "/images/cover-1.png",
    intro: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
    universityInfo: "Төгссөн сургууль болон мэргэжлийн чиглэлийн мэдээлэл.",
    jobInfo: "Одоогийн ажил, байгууллага, үүрэг хариуцлагын тухай.",
    experience: "Ажлын туршлага, оролцсон төслүүд, .",
    gallery: ["/images/cover-1.png", "/images/cover-111.png"],
  },
];

export default function SpeakersPage() {
  const [activeSpeaker, setActiveSpeaker] = useState<Speaker | null>(null);

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">НҮҮР</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Мэргэжил сонголтын талаар</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mb-6 w-full">
          <div className="space-y-2 w-full">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Мэргэжил сонголтын талаар
            </h1>
            <p className="text-sm md:text-base text-gray-600 w-full">
              &quot;Мэргэжил сонголт&quot; арга хэмжээнд 2014–2017 оны өөрсдийн мэргэжлээрээ салбар салбартаа манлайлж яваа 
              төгсөгчид өөрсдийн түүх,
              ажлын туршлага, ажлын байрны өрсөлдөөн, өөрсдийн мэргэжлийн давуу болон сул тал, ажлын байран дээрх цалингийн мэдээлэл гэх мэт сонирхолтой мэргэжлүүдийн талаар, ирээдүйд мэргэжлээ сонгохоор бэлтгэж байгаа сурагч дүү нартаа өөрсдийн туршлагаас хуваалцах болно.
              Мөн хүрэлцэн ирж сонсохыг хүссэн хүн бүрт нээлттэй.<br />Уулзалтын үеэр онцлох үйл явдал нь 12-р ангийн сурагчдаас <strong>&quot;Миний хүссэн мэргэжил&quot;</strong> сэдвээр Эссэ бичлэгийн уралдаан зарлаж шалгарсан нэг сурагчид ирэх жилийн сургалтын төлбөрт тус болох үүднээс 5 сая төгрөгийн шагнал тэмцээний хаалтын үеэр гардуулах болно.
            </p>
            
          </div>
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Илтгэгчид
          </h1>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          
          {speakers.map((speaker) => (
            <Card
              key={speaker.id}
              className="overflow-hidden hover:border-[#8DC63F] transition-colors"
            >
              {speaker.photo ? (
                <div className="relative h-56 w-full bg-gray-100">
                  <Image
                    src={speaker.photo}
                    alt={`${speaker.lastName} ${speaker.firstName}`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
              ) : (
                <div className="relative h-56 w-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Зураг байхгүй</span>
                </div>
              )}
              <CardContent className="p-4 space-y-2">
                <div className="text-base font-semibold text-gray-900">
                  {speaker.lastName} {speaker.firstName}
                </div>
                <div className="text-sm text-gray-600">
                  Ажлын газар:{" "}
                  <span className="font-semibold text-gray-800">
                    {speaker.workplace}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Мэргэжил:{" "}
                  <span className="font-semibold text-gray-800">
                    {speaker.profession}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Төгссөн сургууль:{" "}
                  <span className="font-semibold text-gray-800">
                    {speaker.graduateUniversity}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Илтгэлийн сэдэв:{" "}
                  <span className="font-semibold text-gray-800">
                    {speaker.talkTitle}
                  </span>
                </div>
                <div className="pt-2">
                  <Button
                    type="button"
                    onClick={() => setActiveSpeaker(speaker)}
                    className="bg-[#1f632b] hover:bg-[#16451e] text-white cursor-pointer"
                  >
                    Дэлгэрэнгүй
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {activeSpeaker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 md:p-8">
          <div className="w-full h-full max-w-none rounded-2xl bg-white p-6 shadow-xl overflow-y-auto">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {activeSpeaker.lastName} {activeSpeaker.firstName}
                </h2>
                <p className="text-sm text-gray-600">
                  Ажлын газар:{" "}
                  <span className="font-semibold text-gray-800">
                    {activeSpeaker.workplace}
                  </span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveSpeaker(null)}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <div>
                Танилцуулга:{" "}
                <span className="font-semibold text-gray-800">
                  {activeSpeaker.intro}
                </span>
              </div>
              <div>
                Мэргэжил:{" "}
                <span className="font-semibold text-gray-800">
                  Мэргэжил сонголтын талаарх мэдээлэл
                </span>
              </div>
              
              <div>
                Их сургууль:{" "}
                <span className="font-semibold text-gray-800">
                  {activeSpeaker.universityInfo}
                </span>
              </div>
              <div>
                Ажлын мэдээлэл:{" "}
                <span className="font-semibold text-gray-800">
                  {activeSpeaker.jobInfo}
                </span>
              </div>
              <div>
                Туршлага:{" "}
                <span className="font-semibold text-gray-800">
                  {activeSpeaker.experience}
                </span>
              </div>
            </div>
            {activeSpeaker.gallery.length > 0 ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {activeSpeaker.gallery.map((src, idx) => (
                  <div
                    key={`${activeSpeaker.id}-photo-${idx}`}
                    className="overflow-hidden rounded-xl bg-gray-100"
                  >
                    <Image
                      src={src}
                      alt={`${activeSpeaker.lastName} ${activeSpeaker.firstName} зураг ${idx + 1}`}
                      width={600}
                      height={450}
                      className="h-32 w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : null}
            <div className="mt-6 flex justify-end">
              <Button
                type="button"
                onClick={() => setActiveSpeaker(null)}
                className="bg-[#1f632b] hover:bg-[#16451e] text-white cursor-pointer"
              >
                Хаах
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
