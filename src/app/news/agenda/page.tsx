"use client";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type TabType = "agenda" | "schedule";

export default function AgendaPage() {
  const [activeTab, setActiveTab] = useState<TabType>("agenda");

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
              <BreadcrumbLink href="/news">МЭДЭЭ</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Хөтөлбөр</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Тэмцээний хөтөлбөрийн мэдээлэл
          </h1>

          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab("agenda")}
                className={`pb-3 px-1 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === "agenda"
                    ? "border-[#8DC63F] text-[#8DC63F]"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                Хөтөлбөр
              </button>
              <button
                onClick={() => setActiveTab("schedule")}
                className={`pb-3 px-1 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === "schedule"
                    ? "border-[#8DC63F] text-[#8DC63F]"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                Хуваарь
              </button>
            </div>
          </div>

          {/* Agenda Tab Content */}
          {activeTab === "agenda" && (
            <Card className="p-6 md:p-8">
              <CardContent>
                <div className="flex flex-col items-center justify-center">
                  <div className="relative w-full max-w-2xl aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src="/images/agenda-cup.jpg"
                      alt="Cup agenda content"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                  </div>
                  <p className="mt-4 text-sm text-gray-600 text-center">
                    Хөтөлбөрийн мэдээлэл
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Schedule Tab Content */}
          {activeTab === "schedule" && (
            <div className="space-y-6">
              <Card className="p-6 md:p-8">
                <CardContent>
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative w-full max-w-2xl aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden mb-4">
                      <Image
                        src="/images/schedule-1.jpg"
                        alt="Schedule image 1"
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 800px"
                      />
                    </div>
                    <p className="text-sm text-gray-600 text-center">
                      Хуваарь - Зураг 1
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 md:p-8">
                <CardContent>
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative w-full max-w-2xl aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden mb-4">
                      <Image
                        src="/images/schedule-2.jpg"
                        alt="Schedule image 2"
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 800px"
                      />
                    </div>
                    <p className="text-sm text-gray-600 text-center">
                      Хуваарь - Зураг 2
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
