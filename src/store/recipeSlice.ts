import type { StateCreator } from "zustand"
import { getCategories, getDrinkById, getRecipes } from "../services/RecipeService";
import type { CategoriesType, DrinkAPIType, DrinksAPIType, RecipeType, SearchFiltersType } from "../types";

export type RecipeSliceType = {
    categories: CategoriesType;
    drinks: DrinksAPIType;
    selectedRecipe: RecipeType;
    modal: boolean;
    fetchCategories: () => Promise<void>;
    searchRecipes: (searchFilters: SearchFiltersType) => Promise<void>;
    selectRecipe: (id: DrinkAPIType['idDrink']) => Promise<void>;
    closeModal: () => void
}

export const createRecipeSlice: StateCreator<RecipeSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    selectedRecipe: {} as RecipeType,
    modal: false,
    fetchCategories: async () => {
        const categories = await getCategories()
        set({
            categories
        })
    },
    searchRecipes: async (searchFilters) => {
        const drinks = await getRecipes(searchFilters)
        set({
            drinks
        })
    },
    selectRecipe: async (id) => {
        const selectedRecipe = await getDrinkById(id)
        set({
            selectedRecipe,
            modal: true
        })
    },
    closeModal: () => {
        set({
            modal: false
        })
        setTimeout(() => {
            set({
                selectedRecipe: {} as RecipeType
            })
        }, 300);
    }
})