
import type { StateCreator } from "zustand"
import type { RecipeType } from "../types"
import { getState } from "./useAppStore";

export type FavoritesSliceType = {
    favorites: RecipeType[];
    handleClickFavorite: (recipe: RecipeType) => void;
    favoriteExists: (id: RecipeType['idDrink']) => boolean;
    getLocalStorage: () => void
}

export const createFavoritesSlice: StateCreator<FavoritesSliceType> = (set, get) => ({
    favorites: [],
    handleClickFavorite: (recipe) => {
        if (get().favoriteExists(recipe.idDrink)) {
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            }))
            getState().showNotification({text: 'Removed from favorites', error: false})
        } else{
            set((state) => ({
                favorites: [...state.favorites, recipe],
            }))
            getState().showNotification({text: 'Added to favorites', error: false})
        }
        getState().closeModal()
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    favoriteExists: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    getLocalStorage: () => {
        const favoritesStorage = localStorage.getItem('favorites')
        if (favoritesStorage) {
            set({
                favorites: JSON.parse(favoritesStorage)
            })
        }
    }
})