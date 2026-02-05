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
    title: "Tarialan Cup 2026: Тэмцээний ерөнхий мэдээлэл",
    date: "2026-02-01",
    category: "Мэдээ",
    img: "/images/cover-1.png",
    description:
      "Tarialan Cup 2026 спортын арга хэмжээ 2025.05.16–17-нд зохион байгуулагдана.",
    content:
      "Tarialan Cup 2026 тэмцээн 2025.05.16–17-ны өдрүүдэд зохион байгуулагдана. Тэмцээний нээлтийн орой шоу 2025.05.16-нд болно.\n\nТэмцээн олон төрлийн спортын төрлөөр явагдана. Багууд урьдчилсан бүртгэл хийж, багийн бүрэлдэхүүн, холбоо барих мэдээллээ бүрэн оруулах шаардлагатай.\n\nБүртгэлтэй холбоотой асуулт, тодруулгыг зохион байгуулагчдын холбогдох сувгаар авч ажиллана.",
    author: "Tarialan cup - 2026",
  },
  {
    id: "news-2",
    title: "Tarialan Cup 2026: Спортын төрлүүд ба журам",
    date: "2026-01-25",
    category: "Зар",
    img: "/images/cover-2.png",
    description:
      "Сагсан бөмбөг, дартс, теннис зэрэг спортын төрлүүдийн журам, багийн бүрэлдэхүүн.",
    content:
      "Тэмцээний спортын төрлүүд: Сагсан бөмбөг, Дартс (эрэгтэй 2, эмэгтэй 2 – баг), Теннис (ганцаарчилсан).\n\nТөрөл тус бүрийн дүрэм, оноолт, тоглолтын хугацаа болон шүүлтийн журмыг бүртгэл баталгаажсаны дараа албан ёсоор танилцуулна.\n\n ",
    author: "Tarialan cup - 2026",
  },
  {
    id: "news-3",
    title: "Tarialan Cup 2026: Бооцоо болон шагналын сан",
    date: "2026-01-18",
    category: "Мэдээлэл",
    img: "/images/cover-4.png",
    description:
      "Оролцогчдын бооцооны хэмжээ, шагналын сангийн ерөнхий мэдээлэл.",
    content:
      "Тэмцээний бооцооны хэмжээ: 20,000₮. Багийн бүртгэл баталгаажсаны дараа төлбөрийн мэдээлэлтэй холбоотой заавар илгээгдэнэ.\n\nШагналын санг спортын төрөл тус бүрээр ангилан олгоно. Нэмэлт урамшууллууд, ивээн тэтгэгчдийн бэлэг, онцлох оролцогчдын шагналын тухай мэдээллийг тэмцээний өмнөх өдөр зарлана.\n\nТэмцээний бүх мэдээллийг албан ёсны сувгуудаар тогтмол шинэчилнэ.",
    author: "Tarialan cup - 2026",
  },
];

export async function getAllNews(): Promise<NewsPost[]> {
  return [...LOCAL_NEWS].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getNewsById(id: string): Promise<NewsPost | undefined> {
  return LOCAL_NEWS.find((post) => post.id === id);
}
