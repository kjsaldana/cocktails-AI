import { useMemo } from "react"
import { useAppStore } from "../store/useAppStore"
import DrinkCard from "../components/DrinkCard"

export default function IndexPage() {
  const drinks = useAppStore((state) => state.drinks)
  const hasDrinks = useMemo(() => drinks.drinks.length , [drinks])

  return (
    <div>
        <h1 className="text-6xl font-extrabold">Home</h1>

        {hasDrinks ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
            {drinks.drinks.map(drink => (
              <DrinkCard key={drink.idDrink} drink={drink} />
            ))}
          </div>
        ) : (
          <p className="text-center my-10 text-2xl">No drink selected yet. Please complete the form.</p>
        )}

    </div>
  )
}
