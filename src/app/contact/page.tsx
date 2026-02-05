import type { Metadata } from "next";
import Header from "@/components/Header";
import ContactInfoSection from "@/components/ContactInfoSection";

export const metadata: Metadata = {
  title: "Холбоо барих",
  description: "Tarialan cup - 2026 компанитай холбогдох. Утас: 70118585, Имэйл: info@tarialancup.mn. images description, аврах багаж хэрэгсэл захиалга.",
  openGraph: {
    title: "Холбоо барих | Tarialan cup - 2026",
    description: "Tarialan cup - 2026 компанитай холбогдох",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">ХОЛБОО БАРИХ</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Information */}
          <ContactInfoSection />


        </div>
      </div>
    </main>
  );
}

