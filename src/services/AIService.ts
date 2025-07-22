import { streamText } from 'ai'
import { openrouter } from '../lib/ai'

export default {
    async generateRecipe(prompt: string) {
        const result = streamText({
            model: openrouter('meta-llama/llama-3.3-70b-instruct:free'),
            // model: openrouter('google/gemma-3-4b-it:free'), <- cambiar modelo
            prompt,
            // system: 'You are a bartender with 50 years of experience', <- Su comportamiento
            // temperature: 1 <- 0 es busqueda especifica, 1 es busqueda mas creativa
        })
        return result.textStream
    }
}