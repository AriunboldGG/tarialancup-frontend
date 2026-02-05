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
  facebookUrl: "",
  wechatUrl: "",
  whatsappUrl: "",
  address: "Улаанбаатар хот, M1 Tower",
  mapEmbedUrl: "",
};

export async function getCompanyInfo(): Promise<CompanyInfo> {
  return defaultCompanyInfo;
}
