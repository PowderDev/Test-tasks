export interface Product {
  title: string;
  description: string;
  price: number;
  imageURL: string;
  id: number;
}

export interface FormError {
  field: "price" | "title" | "imageURL";
  message: string;
}

export type SortType = "min" | "max" | "name";
