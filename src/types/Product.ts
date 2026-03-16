export interface Product {
    id: number| string;
    name?: string;
    price?: number;
    image?: string;
    title?: string;
    description?: string;
    rating?: number;
    category?: string;
    love: string;
    plusicon: string;
    reviews: number;
    sizes: (number | string)[];
    }
