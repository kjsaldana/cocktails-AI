import { useAppStore } from "../store/useAppStore"
import type { DrinkAPIType } from "../types"

type DrinkCardProps = {
    drink: DrinkAPIType
}

export default function DrinkCard({ drink }: DrinkCardProps) {
    const selectRecipe = useAppStore((state) => state.selectRecipe)

    return (
        <div className="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <div className="overflow-hidden aspect-square">
                <img
                    src={drink.strDrinkThumb}
                    alt={`Image of ${drink.strDrink}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
            </div>

            <div className="p-5 flex flex-col grow justify-between gap-4">
                <h2 className="font-bold text-xl text-gray-800 truncate">{drink.strDrink}</h2>
                <button
                    type="button"
                    className="w-full bg-orange-500 hover:bg-orange-600 transition-colors duration-200 font-semibold py-3 px-4 text-white rounded-xl cursor-pointer"
                    onClick={() => selectRecipe(drink.idDrink)}
                >
                    View Recipe
                </button>
            </div>
        </div>
    )
}
