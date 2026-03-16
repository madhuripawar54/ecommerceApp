import { create } from 'zustand';

type FavoritesState = {
	favorites: Set<number | string>;
	toggleFavorite: (id: number | string) => void;
	isFavorite: (id: number | string) => boolean;
	clearFavorites: () => void;
};

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
	favorites: new Set<number | string>(),

	toggleFavorite: (id) => {
		const favorites = new Set(get().favorites);
		if (favorites.has(id)) {
			favorites.delete(id);
		} else {
			favorites.add(id);
		}
		set({ favorites });
	},

	isFavorite: (id) => get().favorites.has(id),

	clearFavorites: () => set({ favorites: new Set() }),
}));

export default useFavoritesStore;

