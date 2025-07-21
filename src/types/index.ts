import type z from "zod";
import type { CategoriesAPIResponseSchema, DrinkAPISchema, DrinksAPISchema, RecipeAPIResponseSchema, SearchFiltersSchema } from "../utils/recipes-schemas";

export type CategoriesType = z.infer<typeof CategoriesAPIResponseSchema>
export type SearchFiltersType = z.infer<typeof SearchFiltersSchema>
export type DrinkAPIType = z.infer<typeof DrinkAPISchema>
export type DrinksAPIType = z.infer<typeof DrinksAPISchema>
export type RecipeType = z.infer<typeof RecipeAPIResponseSchema>