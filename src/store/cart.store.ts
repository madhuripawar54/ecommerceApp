import { create } from 'zustand';

export type CartProduct = {
	id: number | string;
	name: string;
	price: number;
	image?: string;
	brand?: string;
	qty: number;
	size?: string | number;
};

type CartState = {
	items: CartProduct[];
	addToCart: (product: any, qty?: number, size?: string | number) => void;
	removeFromCart: (id: number | string) => void;
	updateQty: (id: number | string, qty: number) => void;
	clearCart: () => void;
	subtotal: () => number;
	totalItems: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
	items: [],

	addToCart: (product, qty = 1, size) => {
		const items = get().items;
		const id = product.id;

		const existing = items.find(i => i.id === id && (size ? i.size === size : true));

		if (existing) {
			set({
				items: items.map(i =>
					i.id === id && (size ? i.size === size : true) ? { ...i, qty: i.qty + qty } : i
				),
			} as any);
		} else {
			const newItem: CartProduct = {
				id: product.id,
				name: product.name,
				price: product.price,
				image: product.image || product.imageUrl || product.photo || '',
				brand: product.brand || product.subtitle || '',
				qty,
				size,
			};

			set({ items: [...items, newItem] });
		}
	},

	removeFromCart: id => set({ items: get().items.filter(i => i.id !== id) }),

	updateQty: (id, qty) =>
		set({ items: get().items.map(i => (i.id === id ? { ...i, qty } : i)) }),

	clearCart: () => set({ items: [] }),

	subtotal: () => get().items.reduce((acc, it) => acc + it.price * it.qty, 0),

	totalItems: () => get().items.reduce((acc, it) => acc + it.qty, 0),
}));

export default useCartStore;
    