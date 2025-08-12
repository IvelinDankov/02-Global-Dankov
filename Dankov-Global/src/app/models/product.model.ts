import { User } from "./user.model.js";

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  rating: number;
  weight: number;
  owner: string;
  likes: string[] | undefined;
}
