import type { StateCreator } from "zustand"

export type AISliceType = {
    recipe: string;
    generateRecipe: (prompt: string) => Promise<void>
}

export const createAISlice: StateCreator<AISliceType> = () => ({
    recipe: '',
    generateRecipe: async (prompt) => {
        console.log(prompt); 
    }
})