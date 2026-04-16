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
    firstName: "Ариунболд",
    lastName: "Ганбатын",
    workplace: "Хаан банк",
    profession: "Програм хангамжийн инженер",
    graduateUniversity: "ОХУ, Томскийн Политехникийн Их Сургууль",
    talkTitle: "IT мэргэжлийн онцлог, карьерын боломжууд, AI технологийн нөлөө",
    photo: "/images/speakers/speaker11.jpg",
    intro: "Сайн байна уу? Намайг Ариунболд гэдэг. 2016 оны төгсөгч.\nБи Хаан банканд Мэдээлэл Технологи Архитект Өгөдлийн газарт шийдлийн архитект мэргэжлээр ажилладаг.\n\nМТ – н шийдлийн архитект нь тухайн байгууллагат ямар төрлийн технологи, системийг нэвтрүүлэх, шинээр хөгжүүлж буй системүүд дээр технологийн шийдлүүд гаргаж ажиллах үндсэн чиг үүрэгтэй байдаг.\nНэг үгээр миний хувьд Хаан банканд ашиглагдаж буй системүүдийн уялдаа холбоо тасралтгүй үйл ажиллагаа болон технологийн алсын харааг боловсруулж ажилладаг.\n\nЭнэ удаагийн эвэнтээр мэргэжил сонголтоо хийхээр ЭЕШ – дээ бэлтгэж байгаа төгсөгч дүү нартаа IT мэргэжлийн талаар өөрийн туршлагаас хуваалцах болсондоо баяртай байна.",
    universityInfo: "ОХУ, Томскийн Политехникийн Их Сургууль",
    jobInfo: "Хаан банк — Мэдээлэл Технологи Архитект Өгөдлийн газар, Шийдлийн архитект",
    experience: "6+ жил",
    gallery: ["/images/speakers/speaker11.jpg"],
  },
  {
    id: "speaker-2",
    firstName: "Хонгорзул",
    lastName: "Батдоржийн",
    workplace: "Систем Арт Венчурс ХХК",
    profession: "Ахлах шинжээч, Төслийн менежер",
    graduateUniversity: "ШУТИС - Бизнесийн Удирдлага, Хүмүүнлэгийн Сургууль",
    talkTitle: "Бизнесийн удирдлага мэргэжлийн ойлголт болон карьерын боломжууд",
    photo: "/images/speakers/speaker22.jpg",
    intro: "Сайн байна уу? Намайг Батдоржийн Хонгорзул гэдэг. Тариалан ЕБС-ыг 2017 онд төгссөн.\nШинжлэх Ухаан, Технологийн Их Сургууль-Бизнесийн Удирдлага, Хүмүүнлэгийн Сургуулийг Бизнесийн удирдлага, \"Мэдээллийн систем менежмент\" мэргэжлээр 2021 онд төгссөн.\n\nОдоогоор Систем Арт Венчурс ХХК-д байгууллагын менежментийн үнэлгээ, процессын дахин инженерчлэл, стратеги ба үйл ажиллагааны уялдааг сайжруулах, процессын архитектур боловсруулах, судалгаа болон нотолгоонд суурилсан шинжилгээ, мониторинг ба үр нөлөөний үнэлгээ зэрэг чиглэлээр олон улсын болон төрийн байгууллагын төслүүдэд төслийн менежер, ахлах шинжээчээр ажиллаж, байгууллагын үйл ажиллагааг илүү үр ашигтай болгох шийдлүүдийг боловсруулдаг. Энэ чиглэлээр 5 гаруй жилийн ажлын туршлагатай.\n\nЭнэ удаагийн эвэнтээр \"Бизнесийн удирдлага мэргэжлийн ойлголт болон карьерын боломжууд\" сэдвээр өөрийн туршлага, ойлголтоос та бүхэнтэй хуваалцах болсондоо баяртай байна.",
    universityInfo: "Шинжлэх Ухаан, Технологийн Их Сургууль - Бизнесийн Удирдлага, Хүмүүнлэгийн Сургууль",
    jobInfo: "Систем Арт Венчурс ХХК — Ахлах шинжээч, Төслийн менежер",
    experience: "+5 жил",
    gallery: ["/images/speakers/speaker2.jpg"],
  },
  {
    id: "speaker-3",
    firstName: "Лувсанжамба",
    lastName: "Батцэнгэлийн",
    workplace: "Khazaar dance studio, CHANS зураг төслийн компани",
    profession: "Бүжгийн багш, Архитектор",
    graduateUniversity: "Тариалан, Эрдмийн далай, ШУТИС",
    talkTitle: "Бүжгийн спорт",
    photo: "/images/speakers/speaker3.jpg",
    intro: "Сайн байна уу? Намайг Лувсанжамба гэдэг. 2016 оны төгсөгч. Би одоогоор Хазаар бүжгийн студийн захирал, бүжгийн багш, найруулагчаар ажилладаг. Зуны улиралд барилгын салбарын эд ажлын үед Архитектор мэргэжлээр ажилладаг.\n\nУрлагийн арга хэмжээнд найруулагч хийж, бүжгийн спортын багш дасгалжуулагчаар олон шавь нараа улс болон дэлхийн тавцанд бэлтгэдэг. Мөн урлагийн хувцас үйлдвэрлэж, тэмцээн наадмуудад хувцас түрээс ажиллуулдаг. Архитектор мэргэжлээр мөн Улаанбаатар хотод баригдах барилгуудын зураг төслийг инженерүүдийн хамт гаргадаг.\nНэг үгээр Архитекторын туршлага бага тул Бүжгийн багш найруулагч талаар сургалт орвол илүү зохимжтой байх болов уу\n\nЭнэ удаагийн эвэнтээр мэргэжил сонголтоо хийхээр ЭЕШ-дээ бэлтгэж байгаа төгсөгч дүү нартаа Бүжгийн багш бүжиг дэглээч, найруулагч мэргэжлийн талаар өөрийн туршлагаасаа хуваалцах болсондоо баяртай байна.",
    universityInfo: "ШУТИС",
    jobInfo: "Khazaar dance studio — Захирал, Бүжгийн багш, Найруулагч; CHANS зураг төслийн компани — Архитектор",
    experience: "Бүжгийн багш 10 жил, Архитектор 1 жил",
    gallery: ["/images/speakers/speaker3.jpg"],
  },
  {
    id: "speaker-4",
    firstName: "Идэрхангай",
    lastName: "Эрдэнэбатын",
    workplace: "Би Жи Эм дистрибьюшн ХХК",
    profession: "Хүрээлэн буй орчны инженерчлэл",
    graduateUniversity: "МУИС-ИТС",
    talkTitle: "Хүрээлэн буй орчин судлал",
    photo: "/images/speakers/speaker4.jpg",
    intro: "Б.Нямдаваа багштай 2016 оны 12а ангийн төгсөгч. МУИС-ыг 2020, 2024 онуудад суралцаж төгссөн ба байгаль орчны нөлөөллийн үнэлгээ болон уул, уурхайн салбарт 6 дахь жилдээ ажиллаж байна.\n\nМиний мэргэжил нь томоохон төсөл хөтөлбөр буюу уул уурхай, үйлдвэрлэл, дэд бүтэц, аялал жуулчлалын төслийн үйл ажиллагаанаас байгаль орчинд үзүүлж болзошгүй нөлөөллийг ШУ-ны үндэслэлтэйгээр тодорхойлж төсөл хэрэгжүүлэгчид зөвлөх үйлчилгээ үзүүлдэг онцлогтой, улсынхаа 21 аймаг, 365 сумаар хээрийн судалгааны ажлаар тойрон аялах боломжтой мэргэжил билээ.\n\nЭнэ удаагийн эвэнтээр мэргэжил сонголтоо хийхээр ЭЕШ – дээ бэлтгэж байгаа төгсөгч дүү нартаа ХҮРЭЭЛЭН БУЙ ОРЧНЫ ИНЖЕНЕРЧЛЭЛ мэргэжлийн талаар өөрийн туршлагаас хуваалцах болсондоо баяртай байна.",
    universityInfo: "МУИС-ИТС",
    jobInfo: "Би Жи Эм дистрибьюшн ХХК — Хүрээлэн буй орчны инженер",
    experience: "6 жил (байгаль орчны нөлөөллийн үнэлгээ, уул уурхайн салбар)",
    gallery: ["/images/speakers/speaker4.jpg"],
  },
  {
    id: "speaker-5",
    firstName: "Балжинням",
    lastName: "Энэбишийн",
    workplace: "EZNIIT design llc",
    profession: "Интерьер дизайн",
    graduateUniversity: "ШУТИС",
    talkTitle: "Интерьер дизайны онцлог",
    photo: "/images/speakers/speaker5.jpg",
    intro: "Сайн байна уу? Намайг Балжинням гэдэг. 2016 оны төгсөгч.\nБи Ezniit LLC компанид үйлдвэрийн дарга, дизайнер мэргэжлээр ажилладаг.\n\nИнтерьер дизайнер нь тухайн орон зайн зориулалт, хэрэглэгчдийн хэрэгцээ шаардлагад тохируулан дотоод орчныг төлөвлөж, зохион байгуулалт, өнгө материал, гэрэлтүүлэг болон тавилгын шийдлийг боловсруулж ажилладаг мэргэжил юм. Мөн барилгын дотоод орчныг илүү тав тухтай, гоо зүйтэй, ашиглалтын хувьд үр ашигтай байхаар шийдэл гаргах нь интерьер дизайнерын үндсэн үүрэг байдаг.\n\nНэг үгээр хэлбэл миний хувьд тухайн орон зайг хүмүүс ажиллах, амьдрах, амрахад илүү таатай, зохион байгуулалттай орчин болгох дизайны шийдлүүдийг боловсруулж, түүний хэрэгжилтийг удирдан ажилладаг.\n\nЭнэ удаагийн эвэнтээр мэргэжил сонголтоо хийхээр ЭЕШ-д бэлтгэж байгаа төгсөгч дүү нартаа интерьер дизайнер мэргэжлийн талаар өөрийн туршлагаас хуваалцах болсондоо баяртай байна.",
    universityInfo: "ШУТИС",
    jobInfo: "EZNIIT design llc — Үйлдвэрийн дарга, Дизайнер",
    experience: "+6 жил",
    gallery: ["/images/speakers/speaker5.jpg"],
  },
  {
    id: "speaker-6",
    firstName: "Хулан",
    lastName: "Батбилэгийн",
    workplace: "Хувийн бизнес",
    profession: "Орчуулагч, Гадаад харилцаа, Олон улсын харилцаа холбоо",
    graduateUniversity: "Солонгос улсын 동원대학교 Tongwon University",
    talkTitle: "START UP бизнес, Гадаад соёл, карьер, Social media",
    photo: "/images/speakers/speaker6.jpg",
    intro: "",
    universityInfo: "Солонгос улсын 동원대학교 Tongwon University",
    jobInfo: "Хувийн бизнес — Орчуулагч, Гадаад харилцаа, Олон улсын харилцаа холбоо",
    experience: "6+",
    gallery: ["/images/speakers/speaker6.jpg"],
  },
  {
    id: "speaker-7",
    firstName: "Тунгалагмөрөн",
    lastName: "Ганжууржавын",
    workplace: "\"Бумбат Даваа\" ХХК",
    profession: "Авто замын инженер",
    graduateUniversity: "ШУТИС-БАС",
    talkTitle: "Хөгжлийг бүтээгч инженер",
    photo: "/images/speakers/speaker7.jpg",
    intro: "Сайн байна уу? Миний нэрийг Тунгалагмөрөн гэдэг. Тариалан ЕБС-ийн 2015оны төгсөгч.\nБи 2019онд ШУТИС-БАС-ийг авто замын инженер мэргэжлээр төгссөн. 2024онд Техникийн ухааны магистрын зэрэг хамгаалсан.\n\n\"Бумбат Даваа\"ХХК-д авто замын инженерээр ажилладаг.\n\nАвто замын талбайн инженер нь Зам барилгын өдөр тутмын ажлыг төлөвлөх, ажилчид болон техник хэрэгслийн ажлыг зохион байгуулах, зураг төсөл, технологийн дагуу явагдаж байгаа эсэхийг хянах, замын өндөржилт, өргөн зэрэг хэмжилтийг шалгах, талбайд ашиглагдах материалын чанарыг шалгах, өдөр тутмын ажлын тайлан гаргах, гүйцэтгэлийн акт, хэмжилтийн баримт бичиг бүрдүүлэх, барилгын талбайн хөдөлмөрийн аюулгүй байдлыг хянах, ажилчдыг аюулгүй ажиллагааны дүрэм мөрдүүлэх г.м үндсэн чиг үүрэгтэй ажилладаг.\n\nЭнэ удаагийн эвэнтээр \"Хөгжлийг бүтээгч инженер\" сэдвээр өөрийн туршлага, ойлголтоос та бүхэнтэй хуваалцах болсондоо баяртай байна.",
    universityInfo: "ШУТИС-БАС (Техникийн ухааны магистр)",
    jobInfo: "\"Бумбат Даваа\" ХХК — Авто замын инженер",
    experience: "+7 жил",
    gallery: ["/images/speakers/speaker7.jpg"],
  },



];

export default function SpeakersPage() {
  const [activeSpeaker, setActiveSpeaker] = useState<Speaker | null>(null);
  const [zoomedPhoto, setZoomedPhoto] = useState<string | null>(null);

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
              &quot;Мэргэжил сонголт&quot; арга хэмжээнд 2014–2017 оны өөрсдийн мэргэжлээрээ салбар салбартаа манлайлж яваа төгсөгчид өөрсдийн түүх, ажлын туршлага, ажлын байрны өрсөлдөөн, өөрсдийн мэргэжлийн давуу болон сул тал, ажлын байран дээрх цалингийн мэдээлэл гэх мэт сонирхолтой мэргэжлүүдийн талаар, ирээдүйд мэргэжлээ сонгохоор бэлтгэж байгаа сурагч дүү нартаа өөрсдийн туршлагаас хуваалцах болно. Мөн хүрэлцэн ирж сонсохыг хүссэн хүн бүрд нээлттэй.<br />Уулзалтын үеэр онцлох үйл явдал нь 10-12-р ангийн сурагчдаас <strong>&quot;Миний сонгосон ирээдүйн мэргэжил&quot;</strong> сэдвээр Эсээ бичлэгийн уралдаан зарлаж Зохион байгуулагчдын зүгээс шагналт байруудыг шалгаруулж урамшуулах болно.
            </p>
            <div className="pt-3">
              <a
                href="/files/udirdamj.pdf"
                download="Удирдамж.pdf"
                className="inline-flex items-center gap-2 rounded-md bg-[#1f632b] px-4 py-2 text-sm font-medium text-white hover:bg-[#16451e] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                </svg>
                Удирдамж татах
              </a>
            </div>
          </div>
        </div>

        {/* Prizes section */}
        <div className="mb-8 w-full">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Тэмцээний шагнал</h2>
          <p className="text-sm md:text-base text-gray-600 mb-6">
            Уралдааны шилдэг бүтээлд дараах шагналыг олгоно. Шагналыг 12-р анги, 10-11-р анги гэсэн хоёр төрөлд тус бүр эхний гурван байрыг шалгаруулж 2025 оны 05 сарын 15-нд эвэнтийн төгсгөлд гардуулна.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 12th grade */}
            <div>
              <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3">12-р анги</h3>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-sm text-left">
                  <thead className="bg-[#1f632b] text-white">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Байр</th>
                      <th className="px-4 py-3 font-semibold">Мөнгөн шагнал</th>
                      <th className="px-4 py-3 font-semibold">Нэмэлт урамшуулал</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { place: "I байр", money: "1,300,000₮", bonus: "Медаль, өргөмжлөл" },
                      { place: "II байр", money: "800,000₮", bonus: "Медаль, өргөмжлөл" },
                      { place: "III байр", money: "400,000₮", bonus: "Медаль, өргөмжлөл" },
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-semibold text-[#1f632b]">{row.place}</td>
                        <td className="px-4 py-3 font-bold text-[#b8860b]">{row.money}</td>
                        <td className="px-4 py-3 text-gray-700">{row.bonus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* 10-11th grade */}
            <div>
              <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3">10-11-р анги</h3>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-sm text-left">
                  <thead className="bg-[#1f632b] text-white">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Байр</th>
                      <th className="px-4 py-3 font-semibold">Мөнгөн шагнал</th>
                      <th className="px-4 py-3 font-semibold">Нэмэлт урамшуулал</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { place: "I байр", money: "500,000₮", bonus: "Медаль, өргөмжлөл" },
                      { place: "II байр", money: "300,000₮", bonus: "Медаль, өргөмжлөл" },
                      { place: "III байр", money: "200,000₮", bonus: "Медаль, өргөмжлөл" },
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-semibold text-[#1f632b]">{row.place}</td>
                        <td className="px-4 py-3 font-bold text-[#b8860b]">{row.money}</td>
                        <td className="px-4 py-3 text-gray-700">{row.bonus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Event Location section */}
        <div className="mb-8 w-full">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Эвэнт болох байршил</h2>
          <p className="text-sm md:text-base text-gray-600">
            Тариалан сумын Соёлын төвд 2026 оны 05-р сарын 15-нд 15:00 -17:00 цагийн хооронд болно
          </p>
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
                <div className="relative w-full bg-gray-100 cursor-zoom-in" style={{ height: '400px' }} onClick={() => setZoomedPhoto(speaker.photo!)}>
                  <Image
                    src={speaker.photo}
                    alt={`${speaker.lastName} ${speaker.firstName}`}
                    fill
                    className="object-contain"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
              ) : (
                <div className="relative w-full bg-gray-100 flex items-center justify-center" style={{ height: '400px' }}>
                  <span className="text-gray-400 text-sm">Зураг байхгүй</span>
                </div>
              )}
              <CardContent className="p-4 space-y-2">
                <div className="text-base font-semibold text-gray-900">
                  {speaker.lastName} {speaker.firstName}
                </div>
                <div className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-800">Ажлын газар:</span>{" "}
                  {speaker.workplace}
                </div>
                <div className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-800">Мэргэжил:</span>{" "}
                  {speaker.profession}
                </div>
                <div className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-800">Төгссөн сургууль:</span>{" "}
                  {speaker.graduateUniversity}
                </div>
                <div className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-800">Илтгэлийн сэдэв:</span>{" "}
                  {speaker.talkTitle}
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
          <div className="w-full h-full max-w-none rounded-2xl bg-white p-6 md:p-8 shadow-xl overflow-y-auto">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                  {activeSpeaker.lastName} {activeSpeaker.firstName}
                </h2>
                <p className="text-base text-gray-700">
                  <span className="font-semibold text-gray-800">Ажлын газар:</span>{" "}
                  {activeSpeaker.workplace}
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
            <div className="mt-4 space-y-3 text-base md:text-lg text-gray-700 leading-relaxed">
              <div>
                <span className="font-semibold text-gray-800">Танилцуулга:</span> {" "}
                <span className="whitespace-pre-line">{activeSpeaker.intro}</span>
              </div>
              {/* <div>
                <span className="font-semibold text-gray-800">Мэргэжил:</span> {" "}
                <span>Мэргэжил сонголтын талаарх мэдээлэл</span>
              </div> */}
              <div>
                <span className="font-semibold text-gray-800">Их сургууль:</span> {" "}
                <span>{activeSpeaker.universityInfo}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-800">Ажлын мэдээлэл:</span> {" "}
                <span>{activeSpeaker.jobInfo}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-800">Туршлага:</span> {" "}
                <span>{activeSpeaker.experience}</span>
              </div>
            </div>
            
          </div>
        </div>
      )}

      {zoomedPhoto && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 p-4 cursor-zoom-out"
          onClick={() => setZoomedPhoto(null)}
        >
          <div className="relative w-full max-w-2xl max-h-[90vh]">
            <img
              src={zoomedPhoto}
              alt="Зураг томруулах"
              className="w-full h-full object-contain rounded-xl"
              style={{ maxHeight: '90vh' }}
            />
          </div>
        </div>
      )}
    </main>
  );
}
