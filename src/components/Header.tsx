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
                    <nav className="flex gap-6 md:gap-8">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `uppercase text-sm tracking-widest font-semibold transition-all duration-300 ${isActive ? 'text-orange-400 underline decoration-2 underline-offset-8' : 'text-white/80 hover:text-white hover:underline decoration-2 underline-offset-8 decoration-white/30'}`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/favorites"
                            className={({ isActive }) =>
                                `uppercase text-sm tracking-widest font-semibold transition-all duration-300 ${isActive ? 'text-orange-400 underline decoration-2 underline-offset-8' : 'text-white/80 hover:text-white hover:underline decoration-2 underline-offset-8 decoration-white/30'}`
                            }
                        >
                            Favorites
                        </NavLink>
                        <NavLink
                            to="/ai"
                            className={({ isActive }) =>
                                `uppercase text-sm tracking-widest font-semibold transition-all duration-300 ${isActive ? 'text-orange-400 underline decoration-2 underline-offset-8' : 'text-white/80 hover:text-white hover:underline decoration-2 underline-offset-8 decoration-white/30'}`
                            }
                        >
                            Cocktail-generator
                        </NavLink>
                    </nav>
                </div>
                {isHome && (
                    <form
                        className="w-full max-w-md lg:max-w-lg bg-linear-to-br can be written as `bg-linear-to-br` from-orange-500 to-orange-600 my-16 md:my-24 p-8 sm:p-10 rounded-3xl shadow-2xl space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="space-y-2">
                            <label htmlFor="ingredient" className="block text-white text-sm font-bold tracking-wider uppercase">
                                Name or Ingredients
                            </label>
                            <input
                                id="ingredient"
                                name="ingredient"
                                type="text"
                                placeholder="E.g. Vodka, Tequila, Coffee..."
                                className="w-full bg-white/95 focus:bg-white text-gray-900 placeholder-gray-400 p-4 rounded-xl outline-none focus:ring-4 focus:ring-orange-300/50 transition-all shadow-inner"
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
