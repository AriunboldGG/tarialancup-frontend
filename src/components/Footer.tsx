"use client";

import Image from "next/image";
import Link from "next/link";
import { useCompanyInfo } from "@/hooks/useCompanyInfo";

export default function Footer() {
  const { companyInfo } = useCompanyInfo();
  const mapSrc =
    companyInfo.mapEmbedUrl ||
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d913.9508061231882!2d101.9909059403952!3d49.61578926937764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d0adb80bd0e3047%3A0x7e062189f1722b8!2sTarialan%20sports%20center!5e0!3m2!1sen!2smn!4v1770320781263!5m2!1sen!2smn";
  return (
    <footer className="w-full border-t mt-8 md:mt-12 bg-[#F5F5F5]">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-4">ХОЛБОО БАРИХ</h4>
            <a
              href={`tel:99999999`}
              className="text-2xl font-bold text-[#1D75B7] mb-4 inline-block hover:underline"
            >
              99999999
            </a>
          
            <div className="text-xs font-semibold text-gray-800 mb-1">Имэйл хаяг</div>
            <a
              href={`mailto:${companyInfo.email}`}
              className="text-sm text-gray-700 hover:underline mb-4 inline-block"
            >
              {companyInfo.email}
            </a>
            <div className="text-xs font-semibold text-gray-800 mb-1">Сошиал хаяг</div>
            <div className="mt-4 flex items-center gap-3">
              <a
                href={companyInfo.facebookUrl || "#"}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100"
                target={companyInfo.facebookUrl ? "_blank" : undefined}
                rel={companyInfo.facebookUrl ? "noopener noreferrer" : undefined}
              >
                <Image src="/svg/fb-footer.svg" alt="Facebook" width={9} height={14} />
              </a>
            </div>
          </div>

          {/* Address with Map */}
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-4">ХАЯГ</h4>
            <div className="text-xs text-gray-500 mb-4">{companyInfo.address}</div>
            {mapSrc ? (
              <div className="w-full overflow-hidden rounded-lg">
                <iframe
                  src={mapSrc}
                title="Company location map"
                width="400"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-auto min-h-[250px] md:min-h-[300px]"
                />
              </div>
            ) : null}
          </div>

          {/* News */}
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-4">Тэмцээний тухай</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/news" className="hover:underline">Мэдээ мэдээлэл</Link></li>
            </ul>
          </div>

          {/* Customer */}
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-4">Тэмцээнд оролцогчдод зориулсан</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/speakers">Мэргэжил сонголтын талаар</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 flex flex-col gap-2 text-xs text-gray-500 md:flex-row md:items-center md:justify-between">
          <div>© 2026 Tarialan cup - 2026 . Бүх эрх хуулиар хамгаалагдсан</div>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
            <a
              href="https://ariunbold-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 hover:underline"
            >
              Developed by: Ariunbold Ganbat
            </a>
            <div className="flex items-center gap-4">
              {/* <Image src="/svg/mastercard.svg" alt="Mastercard" width={36} height={22} />
              <Image src="/svg/visa.svg" alt="Visa" width={36} height={22} /> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


