"use client";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function DonationPage() {
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
              <BreadcrumbPage>Хандив</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="max-w-2xl mx-auto">
          <Card className="p-6 md:p-8">
            <CardContent className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Хандив өгөх
                </h1>
                <p className="text-gray-700 leading-relaxed">
                  Таны илгээх хандив цаашдын Тарилан кап тэмцээний зохион байгуулалтанд
                  дэм болох болно. Баярлалаа.
                </p>
              </div>

              <div className="flex flex-col items-center justify-center pt-6 border-t border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  QR кодоор хандив илгээх
                </h2>
                <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                  <div className="w-64 h-64 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-gray-400 text-sm">QR код зураг</span>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-600 text-center max-w-md">
                  QR кодыг утасныхаа Банкны аппликейшны камераар уншуулж төлбөр хийх боломжтой.
                </p>
                <p className="mt-4 text-sm text-gray-600 text-center max-w-md">
                  Эсвэл дансаар шилжүүлэх бол. Доорх дансаар шилжүүлэх боломжтой.
                </p>
                <p className="mt-4 text-sm text-gray-600 text-center max-w-md">
                  Хүлээн авах банк: Хаан банк
                </p>
                <p className="mt-4 text-sm text-gray-600 text-center max-w-md">
                  Дансны нэр: Тунгалагмөрөн
                </p>
                <p className="mt-4 text-sm text-gray-600 text-center max-w-md">
                  Дансны дугаар: 5900179624
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
