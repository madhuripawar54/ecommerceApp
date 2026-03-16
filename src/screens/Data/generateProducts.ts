type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  love: string;
  plusicon: string;
  rating: number;
  reviews: number;
  description: string;
  sizes: (number | string)[];
};

const names = [
  'Watch',
  'Nike Shoes',
  'Airpods',
  'LG TV',
  'Hoodie',
  'Jacket',
  'Tshirt',
];

const images = [
  'watch',
  'nike',
  'airpods',
  'tv',
  'hoodie',
  'jacket',
  'tShirtIcon',
];

const sizeOptions = [
  [38, 40, 42],
  [7, 8, 9, 10],
  [],
  [43, 50, 55],
  ['S', 'M', 'L', 'XL'],
  ['M', 'L', 'XL'],
  ['S', 'M', 'L'],
];

const descriptions = [
  'Premium product with elegant design.',
  'High quality material and modern style.',
  'Best-in-class performance and durability.',
  'Comfortable and stylish for daily use.',
  'Top-rated product with excellent reviews.',
];

const createProduct = (id: number): Product => {
  const index = id % names.length;

  return {
    id,
    name: names[index],
    price: Math.floor(Math.random() * 700) + 40,
    image: images[index],
    love: 'love',
    plusicon: 'plusicon',
    rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
    reviews: Math.floor(Math.random() * 400) + 20,
    description: descriptions[index],
    sizes: sizeOptions[index],
  };
};

const featured: Product[] = [];
const popular: Product[] = [];

for (let i = 1; i <= 500; i++) {
  const product = createProduct(i);

  if (i <= 250) {
    featured.push(product);
  } else {
    popular.push(product);
  }
}

const data = { featured, popular };

export default data;
