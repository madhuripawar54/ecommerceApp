import { appImages } from "../utils/appImages";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: any;
}

export const featuredProducts: Product[] = [
  {
    id: "1",
    name: "Classic Watch",
    price: 40,
    image: appImages.profilePic,
  },
  {
    id: "2",
    name: "Nike Shoes",
    price: 430,
    image: appImages.profilePic,
  },
  {
    id: "3",
    name: "Airpods Pro",
    price: 333,
    image: appImages.profilePic,
  },
  {
    id: "4",
    name: "Leather Jacket",
    price: 120,
    image: appImages.profilePic,
  },
  {
    id: "5",
    name: "Smart Speaker",
    price: 210,
    image: appImages.profilePic,
  },
];
