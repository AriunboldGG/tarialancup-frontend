import { CartItem } from "@/context/CartContext";

export type QuoteData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  note: string;
  company: string;
  items: CartItem[];
  createdAt?: any;
  status?: "pending" | "processed" | "completed";
};

const QUOTES_STORAGE_KEY = "localQuotes";

const writeToStorage = (key: string, value: unknown) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors in non-browser or restricted contexts.
  }
};

const readFromStorage = (key: string): any[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const buildQuoteItems = (items: CartItem[]) => {
  const itemsArray = Array.isArray(items) ? items : [];
  return itemsArray.map((item) => {
    const quantity = typeof item.qty === "number" && item.qty > 0 ? item.qty : 1;
    const statusType = item.stock !== undefined && item.stock > 0 ? "Бэлэн байгаа" : "Захиалгаар";

    return {
      id: item.id,
      name: item.name,
      priceNum: item.priceNum,
      price: item.price,
      img: item.img,
      modelNumber: item.modelNumber,
      product_code: item.product_code || null,
      color: item.color || null,
      size: item.size || null,
      brand: item.brand || null,
      theme: item.theme || null,
      qty: quantity,
      status_type: statusType,
    };
  });
};

/**
 * Save a quote request locally (Firebase removed)
 */
export async function saveQuoteToFirestore(data: QuoteData): Promise<string> {
  const id = `quote-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const quoteData = {
    id,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    note: data.note,
    company: data.company,
    items: buildQuoteItems(data.items),
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  const existing = readFromStorage(QUOTES_STORAGE_KEY);
  existing.push(quoteData);
  writeToStorage(QUOTES_STORAGE_KEY, existing);

  return id;
}

export type SpecialOrderData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  productName: string;
  productDescription: string;
  quantity: string;
  specifications: string;
  deliveryDate: string;
  additionalInfo: string;
  createdAt?: any;
  status?: "pending" | "processed" | "completed";
};

const SPECIAL_ORDERS_STORAGE_KEY = "localSpecialOrders";

/**
 * Save a special order request locally (Firebase removed)
 */
export async function saveSpecialOrderToFirestore(data: SpecialOrderData): Promise<string> {
  const id = `special-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const specialOrderData = {
    id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    company: data.company || "",
    productName: data.productName,
    productDescription: data.productDescription,
    quantity: data.quantity,
    specifications: data.specifications || "",
    deliveryDate: data.deliveryDate || "",
    additionalInfo: data.additionalInfo || "",
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  const existing = readFromStorage(SPECIAL_ORDERS_STORAGE_KEY);
  existing.push(specialOrderData);
  writeToStorage(SPECIAL_ORDERS_STORAGE_KEY, existing);

  return id;
}
