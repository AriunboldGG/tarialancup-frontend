"use client";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getNewsById, type NewsPost } from "@/lib/newsData";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function NewsDetailPage() {
  const params = useParams();
  const newsId = typeof params.id === 'string' ? params.id : '';
  const [news, setNews] = useState<NewsPost | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      if (!newsId) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        const newsData = await getNewsById(newsId);
        setNews(newsData);
      } catch (error) {
        setNews(undefined);
      } finally {
        setIsLoading(false);
      }
    }

    fetchNews();
  }, [newsId]);

  if (isLoading) {
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
                <BreadcrumbPage>Дэлгэрэнгүй</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="text-center py-8">
            <div className="text-gray-500">Ачаалж байна...</div>
          </div>
        </div>
      </main>
    );
  }

  if (!news) {
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
                <BreadcrumbPage>Дэлгэрэнгүй</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="text-center py-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Мэдээ олдсонгүй</h1>
            <Link href="/news" className="text-[#8DC63F] hover:underline inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Мэдээний жагсаалт руу буцах
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Lightbox */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 cursor-zoom-out"
          onClick={() => setZoomedImage(null)}
        >
          <button
            className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-black shadow-lg hover:bg-gray-200 text-lg"
            onClick={() => setZoomedImage(null)}
          >
            ✕
          </button>
          <img
            src={zoomedImage}
            alt="Томруулсан зураг"
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div className="container mx-auto px-4 py-8 md:py-12">
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
              <BreadcrumbPage>{news.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-6">
            <div className="text-sm text-gray-500 mb-2">
              {news.date} • {news.category}
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {news.title}
            </h1>
           
          </header>

          {/* Featured Image */}
          {news.img && news.img.trim() !== '' && (
            <div
              className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden bg-gray-100 cursor-zoom-in"
              onClick={() => setZoomedImage(news.img)}
            >
              <Image
                src={news.img}
                alt={news.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
              />
            </div>
          )}

          {/* Description */}
          {news.description && (
            <div className="mb-6 text-lg text-gray-700 font-medium leading-relaxed">
              {news.description}
            </div>
          )}

          {/* Content */}
          {news.content && (
            <div className="mb-8">
              <div 
                className="text-gray-700 leading-relaxed whitespace-pre-wrap"
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {news.content}
              </div>
            </div>
          )}

          {!news.content && !news.description && (
            <div className="text-gray-500 italic mb-8">
              Контент оруулаагүй байна.
            </div>
          )}

          {/* Gallery */}
          {news.gallery && news.gallery.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {news.gallery.map((src, i) => (
                <div
                  key={i}
                  className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100 cursor-zoom-in"
                  onClick={() => setZoomedImage(src)}
                >
                  <Image
                    src={src}
                    alt={`${news.title} - зураг ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          )}

        </article>
      </div>
    </main>
  );
}
