import { streamText } from 'ai'
import { openrouter } from '../lib/ai'

export default {
    async generateRecipe(prompt: string) {
        const result = streamText({
            model: openrouter('google/gemma-4-31b-it:free'),
            // Otros modelos
            // model: openrouter('qwen/qwen3-coder:free'),
            prompt,
            // system: 'You are a bartender with 50 years of experience',// <- Su comportamiento
            // temperature: 1 <- 0 es busqueda especifica,// 1 es busqueda mas creativa
        })
        return result.textStream
    }
}