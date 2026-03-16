import { create } from 'zustand';
import { CartProduct } from './cart.store';

export type OrderStatus = 'active' | 'completed' | 'cancelled';

export type Order = {
  id: number;
  items: CartProduct[];
  total: number;
  status: OrderStatus;
  createdAt: number;
  title?: string;
  image?: string;
};

type OrdersState = {
  orders: Order[];
  addOrder: (payload: { items: CartProduct[]; total: number; status?: OrderStatus }) => number;
  updateStatus: (id: number, status: OrderStatus) => void;
  getByStatus: (status: OrderStatus) => Order[];
  clear: () => void;
};

let idCounter = Date.now();

export const useOrdersStore = create<OrdersState>((set, get) => ({
  orders: [
    {
      id: ++idCounter,
      items: [
        { id: 'p1', name: 'Watch', price: 40, qty: 1, image: '', brand: 'Rolex' },
      ],
    total: 40,
      status: 'active',
      createdAt: Date.now() - 1000 * 60 * 60 * 24,
      title: 'Watch',
      image: 'Watch',
    },
    {
      id: ++idCounter,
      items: [
        { id: 'p2', name: 'Airpods', price: 333, qty: 1, image: '', brand: 'Apple' },
      ],
      total: 333,
      status: 'active',
      createdAt: Date.now() - 1000 * 60 * 60 * 48,
      title: 'Airpods',
      image: 'Watch',
    },
    {
      id: ++idCounter,
      items: [
        { id: 'p3', name: 'Hoodie', price: 50, qty: 1, image: '', brand: 'Puma' },
      ],
      total: 50,
      status: 'completed',
      createdAt: Date.now() - 1000 * 60 * 60 * 72,
      title: 'Hoodie',
      image: 'Watch',
    },
  ],

  addOrder: ({ items, total, status = 'active' }) => {
    const id = ++idCounter;
    const order = {
      id,
      items,
      total,
      status,
      createdAt: Date.now(),
      title: items && items.length ? items[0].name : 'Order',
      image: items && items.length ? (items[0].image || '') : '',
    } as Order;
    set(state => ({ orders: [order, ...state.orders] }));
    return id;
  },

  updateStatus: (id, status) => set(state => ({ orders: state.orders.map(o => (o.id === id ? { ...o, status } : o)) })),

  getByStatus: status => get().orders.filter(o => o.status === status),

  clear: () => set({ orders: [] }),
}));

export default useOrdersStore;
