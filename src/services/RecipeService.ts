import axios from "axios"
import { CategoriesAPIResponseSchema, DrinksAPISchema, RecipeAPIResponseSchema } from "../utils/recipes-schemas";
import type { DrinkAPIType, SearchFiltersType } from "../types";

export async function getCategories() {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    const {data} = await axios(url)
    const result = CategoriesAPIResponseSchema.safeParse(data)
    if (result.success) {
        return result.data
    }
}

export async function getRecipes(searchFilters: SearchFiltersType) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${searchFilters.category}&i=${searchFilters.category}`
    const {data} = await axios(url)
    const result = DrinksAPISchema.safeParse(data)
    if (result.success) {
        return result.data
    }
}

export async function getDrinkById(id: DrinkAPIType['idDrink']) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    const {data} = await axios(url)
    const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])
    
    if (result.success) {
        return result.data
    }
}