export type CompanyInfo = {
  email: string;
  phone: string;
  mobilePhone: string;
  facebookUrl: string;
  wechatUrl: string;
  whatsappUrl: string;
  address: string;
  mapEmbedUrl: string;
};

export const defaultCompanyInfo: CompanyInfo = {
  email: "info@tarialancup.mn",
  phone: "70118585",
  mobilePhone: "",
  facebookUrl: "https://www.facebook.com/profile.php?id=61587326840826",
  wechatUrl: "",
  whatsappUrl: "",
  address: "Хөвсгөл аймаг, Тариалан сум. Спорт зал",
  mapEmbedUrl: "",
};

export async function getCompanyInfo(): Promise<CompanyInfo> {
  return defaultCompanyInfo;
}
