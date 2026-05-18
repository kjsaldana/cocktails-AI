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

            <div>
                <h2 className="mt-5 font-bold text-2xl truncate">{drink.strDrink}</h2>
                <button
                    type="button"
                    className="p-2 w-full bg-[#ff910b] hover:brightness-110 uppercase font-extrabold mt-5 cursor-pointer text-white rounded-s"
                    onClick={() => selectRecipe(drink.idDrink)}
                >
                    View Recipe
                </button>
            </div>
        </div>
    )
}
