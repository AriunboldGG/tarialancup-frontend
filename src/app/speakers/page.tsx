"use client";

import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Speaker = {
  id: string;
  firstName: string;
  lastName: string;
  workplace: string;
  profession: string;
  graduateUniversity: string;
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
    firstName: "Нэр",
    lastName: "Овог",
    workplace: "Ажлын газар",
    profession: "Мэргэжил",
    graduateUniversity: "Төгссөн сургууль",
    photo: "/images/cover-1.png",
    intro: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham",
    universityInfo: "Төгссөн сургууль болон мэргэжлийн чиглэлийн мэдээлэл.",
    jobInfo: "Одоогийн ажил, байгууллага, үүрэг хариуцлагын тухай.",
    experience: "Ажлын туршлага, оролцсон төслүүд, амжилтууд.",
    gallery: ["/images/cover-1.png", "/images/cover-2.png", "/images/cover-111.png"],
  },
  {
    id: "speaker-2",
    firstName: "Нэр",
    lastName: "Овог",
    workplace: "Ажлын газар",
    profession: "Мэргэжил",
    graduateUniversity: "Төгссөн сургууль",
    photo: "/images/cover-2.png",
    intro: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham",
    universityInfo: "Төгссөн сургууль болон мэргэжлийн чиглэлийн мэдээлэл.",
    jobInfo: "Одоогийн ажил, байгууллага, үүрэг хариуцлагын тухай.",
    experience: "Ажлын туршлага, оролцсон төслүүд, амжилтууд.",
    gallery: ["/images/cover-2.png", "/images/cover-1.png", "/images/cover-111.png"],
  },
  {
    id: "speaker-3",
    firstName: "Нэр",
    lastName: "Овог",
    workplace: "Ажлын газар",
    profession: "Мэргэжил",
    graduateUniversity: "Төгссөн сургууль",
    photo: "/images/cover-111.png",
    intro: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham",
    universityInfo: "Төгссөн сургууль болон мэргэжлийн чиглэлийн мэдээлэл.",
    jobInfo: "Одоогийн ажил, байгууллага, үүрэг хариуцлагын тухай.",
    experience: "Ажлын туршлага, оролцсон төслүүд, амжилтууд.",
    gallery: ["/images/cover-111.png", "/images/cover-1.png", "/images/cover-2.png"],
  },
];

export default function SpeakersPage() {
  const [activeSpeaker, setActiveSpeaker] = useState<Speaker | null>(null);

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6 flex items-end justify-between gap-3">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">ИЛТГЭГЧИД</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
                <div className="pt-2">
                  <Button
                    type="button"
                    onClick={() => setActiveSpeaker(speaker)}
                    className="bg-[#1f632b] hover:bg-[#16451e] text-white"
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
                className="bg-[#1f632b] hover:bg-[#16451e] text-white"
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
