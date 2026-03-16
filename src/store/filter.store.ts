import { create } from 'zustand';

export type Filters = {
  gender?: 'all' | 'men' | 'women';
  brands: string[];
  colors: string[];
  priceRange: [number, number];
};

type FilterState = {
  filters: Filters;
  setGender: (g: Filters['gender']) => void;
  toggleBrand: (brand: string) => void;
  toggleColor: (color: string) => void;
  setPriceRange: (r: [number, number]) => void;
  clear: () => void;
};

export const useFilterStore = create<FilterState>((set, get) => ({
  filters: { gender: 'all', brands: [], colors: [], priceRange: [0, 1000] },
  setGender: (g) => set({ filters: { ...get().filters, gender: g } }),
  toggleBrand: (brand) =>
    set(({ filters }) => {
      const exists = filters.brands.includes(brand);
      return { filters: { ...filters, brands: exists ? filters.brands.filter(b => b !== brand) : [...filters.brands, brand] } };
    }),
  toggleColor: (color) =>
    set(({ filters }) => {
      const exists = filters.colors.includes(color);
      return { filters: { ...filters, colors: exists ? filters.colors.filter(c => c !== color) : [...filters.colors, color] } };
    }),
  setPriceRange: (r) => set({ filters: { ...get().filters, priceRange: r } }),
  clear: () => set({ filters: { gender: 'all', brands: [], colors: [], priceRange: [0, 1000] } }),
}));

export default useFilterStore;
