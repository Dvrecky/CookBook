import { Product } from "./Product";

export interface ProductListProps {
  products: Product[];
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
}