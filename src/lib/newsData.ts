export type NewsPost = {
  id: string;
  title: string;
  date: string;
  category: string;
  img: string;
  description?: string;
  content?: string;
  author?: string;
};

const LOCAL_NEWS: NewsPost[] = [
  {
    id: "news-1",
    title: "Шинэ хамгаалалтын тоног төхөөрөмж ирлээ",
    date: "2026-02-01",
    category: "Мэдээ",
    img: "/images/hero1.jpg",
    description: "Ажлын байрны аюулгүй ажиллагаанд зориулсан шинэ бүтээгдэхүүнүүд худалдаанд гарлаа.",
    content: "Ажлын байрны аюулгүй ажиллагаанд зориулсан шинэ бүтээгдэхүүнүүд худалдаанд гарлаа.",
    author: "Tarialan cup - 2026",
  },
  {
    id: "news-2",
    title: "Аврах хэрэгслийн шинэ багц",
    date: "2026-01-25",
    category: "Зар",
    img: "/images/hero2.png",
    description: "Аврах ажиллагаанд зориулагдсан багц бүтээгдэхүүн шинэчлэгдлээ.",
    content: "Аврах ажиллагаанд зориулагдсан багц бүтээгдэхүүн шинэчлэгдлээ.",
    author: "Tarialan cup - 2026",
  },
  {
    id: "news-3",
    title: "ХАБЭА сургалтын хөтөлбөр",
    date: "2026-01-18",
    category: "Сургалт",
    img: "/images/hero3.jpg",
    description: "ХАБЭА чиглэлээрх шинэ сургалтын хөтөлбөр эхэллээ.",
    content: "ХАБЭА чиглэлээрх шинэ сургалтын хөтөлбөр эхэллээ.",
    author: "Tarialan cup - 2026",
  },
];

export async function getAllNews(): Promise<NewsPost[]> {
  return [...LOCAL_NEWS].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getNewsById(id: string): Promise<NewsPost | undefined> {
  return LOCAL_NEWS.find((post) => post.id === id);
}
