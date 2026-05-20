import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";

export default function Header() {
    const { pathname } = useLocation()
    const isHome = useMemo(() => pathname === '/', [pathname])

    const fetchCategories = useAppStore((state) => state.fetchCategories)
    const categories = useAppStore((state) => state.categories)
    const searchRecipes = useAppStore((state) => state.searchRecipes)
    const showNotification = useAppStore((state) => state.showNotification)

    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (Object.values(searchFilters).includes('')) {
            showNotification({ text: 'Complete all the Form', error: true })
            return
        }
        searchRecipes(searchFilters)
        showNotification({ text: 'Search Complete', error: false })
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    return (
        <header className={`relative ${isHome ? "bg-[url(/bg.webp)] bg-center bg-cover bg-no-repeat min-h-150" : "bg-slate-900"}`}>
            { }
            {isHome && <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>}

            <div className="mx-auto container px-5 py-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <Link to={'/'}>
                            <img className="w-32 transition-transform hover:scale-105 duration-300" src="/logo.svg" alt="Logo cocktail" />
                        </Link>
                    </div>
                    <nav className="flex gap-4">
                        <NavLink to="/" className={({ isActive }) => isActive ? 'uppercase text-orange-400 font-bold text-shadow-lg text-lg border-b-4' : 'uppercase text-white font-bold text-shadow-lg text-lg'}>Home</NavLink>
                        <NavLink to="/favorites" className={({ isActive }) => isActive ? 'uppercase text-orange-400 font-bold text-shadow-lg text-lg border-b-4' : 'uppercase text-white font-bold text-shadow-lg text-lg'}>Favorites</NavLink>
                        <NavLink to="/ai" className={({ isActive }) => isActive ? 'uppercase text-orange-400 font-bold text-shadow-lg text-lg border-b-4' : 'uppercase text-white font-bold text-shadow-lg text-lg'}>Cocktail-generator</NavLink>
                    </nav>
                </div>
                {isHome && (
                    <form className="md:w-130 2xl:w-150 bg-linear-to-r from-[#ff910b] to-[#ff710b] my-20 p-10 rounded-lg shadow space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <label htmlFor="ingredient" className="block text-white uppercase font-extrabold">Name or Ingredients</label>
                            <input
                                id="ingredient"
                                name="ingredient"
                                type="text"
                                placeholder="E.g. Vodka, Tequila, Coffee."
                                className="bg-white p-2 w-full outline-none rounded-lg"
                                onChange={handleChange}
                                value={searchFilters.ingredient}
                            />
                        </div>

                        <div className="space-y-4">
                            <label htmlFor="category" className="block text-white uppercase font-extrabold">Categories</label>
                            <select name="category" id="category" className="bg-white p-2 w-full outline-none rounded-lg" onChange={handleChange} value={searchFilters.category}>
                                <option value="">-- Select a Category --</option>
                                {categories.drinks.map(category => (
                                    <option value={category.strCategory} key={category.strCategory}>{category.strCategory}</option>
                                ))}
                            </select>
                        </div>

                        <input
                            type="submit"
                            value="Search Recipes"
                            className="cursor-pointer bg-[#1a1a1a] hover:brightness-150 text-white font-extrabold p-2 w-full rounded-lg uppercase"
                        />
                    </form>
                )}
            </div>
        </header>
    )
}
