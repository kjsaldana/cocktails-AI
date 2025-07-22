import type { StateCreator } from "zustand"
import AIService from "../services/AIService";

export type AISliceType = {
    recipe: string;
    generateRecipe: (prompt: string) => Promise<void>;
    isGenerating: boolean
}

export const createAISlice: StateCreator<AISliceType> = (set) => ({
    recipe: '',
    isGenerating: false,
    generateRecipe: async (prompt) => {
        const data = await AIService.generateRecipe(prompt)
        set({ isGenerating: true, recipe: ''})
        for await (const textPart of data) {
            set((state => ({
                recipe: state.recipe + textPart
            })))
        }
        set({ isGenerating: false})
    }
})