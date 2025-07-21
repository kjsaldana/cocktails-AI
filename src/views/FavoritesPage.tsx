import { useMemo } from "react"
import { useAppStore } from "../store/useAppStore"
import DrinkCard from "../components/DrinkCard"

export default function FavoritesPage() {
  const favorites = useAppStore((state) => state.favorites)
  const hasFavorites = useMemo(() => favorites.length , [favorites])

  return (
    <>
      <h1 className="text-6xl font-extrabold">Favorites</h1>
      {hasFavorites ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 my-10">
          {favorites.map(drink => (
            <DrinkCard
              key={drink.idDrink}
              drink={drink}
            />
          ))}

        </div>
      ) : (
        <p className="text-center text-2xl my-10">No favorites yet — Add some to see them here!</p>
      )}
    </>
  )
}