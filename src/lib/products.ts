export type Product = {
  id: number;
  firestoreId: string;
  name: string;
  price: string;
  img: string;
  images?: string[];
  modelNumber: string;
  category: "ppe" | "rescue" | "workplace" | "other";
  mainCategory?: string;
  subcategory: string;
  subleaf: string;
  color: string;
  brand: string;
  brandImage?: string;
  size: string;
  priceNum: number;
  product_code?: string;
  product_sector?: string;
  stock: number;
  theme: string;
  material?: string;
  description?: string;
  feature?: string;
  productTypes?: string[];
};

export type MainCategory = {
  id: string;
  name: string;
  label?: string;
  slug?: string;
  order?: number;
  icon?: string;
  children?: string[];
  subchildren?: Record<string, string[]>;
};

export type Subcategory = {
  id: string;
  name: string;
  category: Product["category"];
  order?: number;
};

export type Sector = {
  id: string;
  name: string;
  slug?: string;
  order?: number;
  icon?: string;
};

export type Category = {
  id: string;
  name: string;
  mainCategoryId?: string;
  mainCategory?: string;
  order?: number;
  slug?: string;
  children?: string[];
};

export type SubSubcategory = {
  id: string;
  name: string;
  categoryId?: string;
  category?: string;
  mainCategoryId?: string;
  order?: number;
  slug?: string;
};

export type CategoryTreeNode = {
  name: string;
  slug: string;
  icon?: string;
  children?: CategoryTreeNode[];
};

const formatPrice = (value: number): string => {
  if (!value || value <= 0) return "0₮";
  return `${value.toLocaleString()} ₮`;
};

const LOCAL_PRODUCTS: Product[] = [
  {
    id: 1,
    firestoreId: "local-1",
    name: "Safety Helmet",
    priceNum: 85000,
    price: formatPrice(85000),
    img: "/images/product1.jpg",
    images: ["/images/product1.jpg"],
    modelNumber: "SH-100",
    category: "ppe",
    mainCategory: "ХАБ хувцас хэрэгсэл",
    subcategory: "Толгойн хамгаалалт",
    subleaf: "Дуулга",
    color: "Шар",
    brand: "Bayan",
    size: "M, L",
    product_code: "PPE-001",
    product_sector: "Уул уурхай",
    stock: 12,
    theme: "Стандарт",
    material: "ABS",
    description: "Хамгаалалтын дуулга",
    feature: "Тохируулгатай оосор",
    productTypes: ["Хамгаалалтын хэрэгсэл"],
  },
  {
    id: 2,
    firestoreId: "local-2",
    name: "Safety Gloves",
    priceNum: 32000,
    price: formatPrice(32000),
    img: "/images/product2.jpg",
    images: ["/images/product2.jpg"],
    modelNumber: "GL-220",
    category: "ppe",
    mainCategory: "ХАБ хувцас хэрэгсэл",
    subcategory: "Гар хамгаалалт",
    subleaf: "Бээлий",
    color: "Хар",
    brand: "Bayan",
    size: "S, M, L",
    product_code: "PPE-002",
    product_sector: "Барилга",
    stock: 0,
    theme: "Аюулгүй ажиллагаа",
    material: "Арьс",
    description: "Ажлын хамгаалалтын бээлий",
    feature: "Элэгдэлд тэсвэртэй",
    productTypes: ["Хамгаалалтын хэрэгсэл"],
  },
  {
    id: 3,
    firestoreId: "local-3",
    name: "Rescue Rope",
    priceNum: 125000,
    price: formatPrice(125000),
    img: "/images/product3.jpg",
    images: ["/images/product3.jpg"],
    modelNumber: "RR-450",
    category: "rescue",
    mainCategory: "Аврах хамгаалах",
    subcategory: "Аврах тоног төхөөрөмж",
    subleaf: "Оосор",
    color: "Улаан",
    brand: "RescuePro",
    size: "50m",
    product_code: "RES-010",
    product_sector: "Аврах ажиллагаа",
    stock: 5,
    theme: "Аврах",
    material: "Нейлон",
    description: "Өндөр чанарын аврах олс",
    feature: "Усны хамгаалалттай",
    productTypes: ["Аврах хэрэгсэл"],
  },
  {
    id: 4,
    firestoreId: "local-4",
    name: "Work Jacket",
    priceNum: 98000,
    price: formatPrice(98000),
    img: "/images/product4.jpg",
    images: ["/images/product4.jpg"],
    modelNumber: "WJ-310",
    category: "workplace",
    mainCategory: "Ажлын байр",
    subcategory: "Ажлын хувцас",
    subleaf: "Хүрэм",
    color: "Цэнхэр",
    brand: "WorkSafe",
    size: "M, L, XL",
    product_code: "WRK-101",
    product_sector: "Үйлдвэр",
    stock: 8,
    theme: "Ажлын хувцас",
    material: "Полиэстр",
    description: "Өдрийн хэрэглээнд тохиромжтой хүрэм",
    feature: "Усны хамгаалалттай",
    productTypes: ["Ажлын хувцас"],
  },
];

const MAIN_CATEGORY_LABELS: Record<Product["category"], { name: string; icon: string; order: number }> = {
  ppe: { name: "ХАБ хувцас хэрэгсэл", icon: "Shield", order: 1 },
  rescue: { name: "Аврах хамгаалах", icon: "LifeBuoy", order: 2 },
  workplace: { name: "Ажлын байр", icon: "Wrench", order: 3 },
  other: { name: "Бусад", icon: "Package", order: 4 },
};

const buildMainCategories = (): MainCategory[] => {
  const byCategory = new Map<Product["category"], Set<string>>();

  LOCAL_PRODUCTS.forEach((product) => {
    if (!byCategory.has(product.category)) {
      byCategory.set(product.category, new Set<string>());
    }
    if (product.subcategory) {
      byCategory.get(product.category)!.add(product.subcategory);
    }
  });

  return (Object.keys(MAIN_CATEGORY_LABELS) as Product["category"][]).map((key) => {
    const meta = MAIN_CATEGORY_LABELS[key];
    return {
      id: key,
      name: meta.name,
      label: meta.name,
      slug: meta.name.toLowerCase().replace(/\s+/g, "-"),
      order: meta.order,
      icon: meta.icon,
      children: Array.from(byCategory.get(key) ?? []).sort((a, b) => a.localeCompare(b, "mn", { sensitivity: "base" })),
    };
  });
};

const LOCAL_MAIN_CATEGORIES = buildMainCategories();

const buildSubcategories = (): Subcategory[] => {
  const rows = new Map<string, Subcategory>();

  LOCAL_PRODUCTS.forEach((product) => {
    if (!product.subcategory) return;
    const id = `${product.category}-${product.subcategory}`;
    if (!rows.has(id)) {
      rows.set(id, {
        id,
        name: product.subcategory,
        category: product.category,
        order: rows.size,
      });
    }
  });

  return Array.from(rows.values()).sort((a, b) => a.name.localeCompare(b.name, "mn", { sensitivity: "base" }));
};

const LOCAL_SUBCATEGORIES = buildSubcategories();

const buildSectors = (): Sector[] => {
  const sectors = new Map<string, Sector>();
  LOCAL_PRODUCTS.forEach((product) => {
    const sector = product.product_sector?.trim();
    if (!sector) return;
    if (!sectors.has(sector)) {
      sectors.set(sector, {
        id: sector.toLowerCase().replace(/\s+/g, "-"),
        name: sector,
        slug: sector.toLowerCase().replace(/\s+/g, "-"),
        order: sectors.size,
      });
    }
  });
  return Array.from(sectors.values()).sort((a, b) => a.name.localeCompare(b.name, "mn", { sensitivity: "base" }));
};

const LOCAL_SECTORS = buildSectors();

export async function getImageUrl(imagePath: string): Promise<string> {
  if (!imagePath) return "";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  if (imagePath.startsWith("/")) {
    return imagePath;
  }
  return `/images/${imagePath}`;
}

export async function getImageUrls(imagePaths: string[]): Promise<string[]> {
  return Promise.all(imagePaths.map((path) => getImageUrl(path)));
}

export async function getAllProducts(): Promise<Product[]> {
  return [...LOCAL_PRODUCTS];
}

export async function getProductById(productId: string | number): Promise<Product | null> {
  const idString = String(productId);
  const numericId = Number(productId);

  return (
    LOCAL_PRODUCTS.find((product) => product.firestoreId === idString) ||
    LOCAL_PRODUCTS.find((product) => product.id === numericId) ||
    null
  );
}

export async function getProductsByCategory(category: Product["category"]): Promise<Product[]> {
  return LOCAL_PRODUCTS.filter((product) => product.category === category);
}

export async function getMainCategories(): Promise<MainCategory[]> {
  return [...LOCAL_MAIN_CATEGORIES];
}

export async function getSubcategories(category?: Product["category"]): Promise<Subcategory[]> {
  if (!category) {
    return [...LOCAL_SUBCATEGORIES];
  }
  return LOCAL_SUBCATEGORIES.filter((sub) => sub.category === category);
}

export async function getSectors(): Promise<Sector[]> {
  return [...LOCAL_SECTORS];
}

export async function getCategories(mainCategory?: string): Promise<Category[]> {
  const categories = LOCAL_MAIN_CATEGORIES.map((cat, index) => ({
    id: cat.id,
    name: cat.name,
    mainCategoryId: cat.id,
    mainCategory: cat.name,
    order: cat.order ?? index,
    slug: cat.slug,
    children: cat.children,
  }));

  if (!mainCategory) {
    return categories;
  }

  return categories.filter((cat) => cat.name === mainCategory || cat.id === mainCategory);
}

export async function getSubSubcategories(categoryId?: string): Promise<SubSubcategory[]> {
  if (!categoryId) return [];
  return [];
}

export async function getCategoryTree(): Promise<CategoryTreeNode[]> {
  return LOCAL_MAIN_CATEGORIES.map((mainCat) => {
    const children = (mainCat.children ?? []).map((childName) => ({
      name: childName,
      slug: childName.toLowerCase().replace(/\s+/g, "-"),
    }));

    return {
      name: mainCat.name,
      slug: mainCat.slug || mainCat.name.toLowerCase().replace(/\s+/g, "-"),
      icon: mainCat.icon,
      children,
    };
  });
}
