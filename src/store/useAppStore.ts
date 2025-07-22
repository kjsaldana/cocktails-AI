import { create } from "zustand";
import { createRecipeSlice, type RecipeSliceType } from "./recipeSlice";
import { devtools } from "zustand/middleware";
import { createFavoritesSlice, type FavoritesSliceType } from "./favoritesSlice";
import { createNotificationSlice, type NotificationSliceType } from "./notificationSlice";
import { createAISlice, type AISliceType } from "./aiSlice";

export const useAppStore = create<RecipeSliceType & FavoritesSliceType & NotificationSliceType & AISliceType>()(devtools((...a) => ({
    ...createRecipeSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a),
    ...createAISlice(...a),
})))

export const { getState } = useAppStore