import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";

export default function Header() {
    const {pathname} = useLocation()
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
            showNotification({text: 'Complete all the Form', error: true})
            return
        }
        searchRecipes(searchFilters)
        showNotification({text: 'Search Complete', error: false})
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    return (
        <header className={isHome ? "bg-[url(/bg.jpg)] bg-center bg-cover" : "bg-slate-800"}>
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <Link to={'/'}>
                            <img className="w-32" src="/logo.svg" alt="Logo cocktail" />
                        </Link>
                    </div>
                    <nav className="flex gap-4">
                        <NavLink to="/" className={({isActive}) => isActive ? 'uppercase text-orange-500 font-bold text-shadow-lg text-xl' : 'uppercase text-white font-bold text-shadow-lg text-xl'}>Home</NavLink>
                        <NavLink to="/favorites" className={({isActive}) => isActive ? 'uppercase text-orange-500 font-bold text-shadow-lg text-xl' : 'uppercase text-white font-bold text-shadow-lg text-xl'}>Favorites</NavLink>
                    </nav>
                </div>
                {isHome && (
                    <form className="md:w-1/2 2xl:w-1/3 bg-gradient-to-r from-orange-400 to-orange-300 my-32 p-10 rounded-lg shadow space-y-6" onSubmit={handleSubmit}>
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
                            className="cursor-pointer bg-orange-700 hover:bg-orange-800 text-white font-extrabold p-2 w-full rounded-lg uppercase"
                        />
                    </form>
                )}
            </div>
        </header>
    )
}
