import { useAppStore } from "../store/useAppStore"
import type { DrinkAPIType } from "../types"

type DrinkCardProps = {
    drink: DrinkAPIType
}

export default function DrinkCard({drink}: DrinkCardProps) {
    const selectRecipe = useAppStore((state) => state.selectRecipe)

    return (
        <div className="shadow-lg p-4 rounded-md">
            <div className="overflow-hidden">
                <img src={drink.strDrinkThumb} alt={`Image of ${drink.strDrink}`} className="hover:scale-125 hover:rotate-2"/>
            </div>

            <div>
                <h2 className="mt-5 font-bold text-2xl truncate">{drink.strDrink}</h2>
                <button
                    type="button"
                    className="p-2 w-full bg-orange-400 hover:bg-orange-500 uppercase font-extrabold mt-5 cursor-pointer text-white"
                    onClick={() => selectRecipe(drink.idDrink)}
                >
                    View Recipe
                </button>
            </div>
        </div>
    )
}
