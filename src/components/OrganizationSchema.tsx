import StructuredData from "./StructuredData";

/**
 * Organization schema for SEO
 * Add this to your root layout or main pages
 */
export default function OrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bayan-undur.mn";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tarialan cup - 2026",
    url: baseUrl,
    logo: `${baseUrl}/images/main-logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+976-70118585",
      contactType: "customer service",
      email: "info@tarialancup.mn",
      areaServed: "MN",
      availableLanguage: ["mn", "en"],
    },
    sameAs: [
      // Add your social media links here when available
      // "https://www.facebook.com/yourpage",
      // "https://www.instagram.com/yourpage",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "MN",
      // Add full address when available
    },
  };

  return <StructuredData data={organizationSchema} />;
}
