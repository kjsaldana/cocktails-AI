import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment } from 'react';
import { useAppStore } from '../store/useAppStore';
import type { RecipeType } from '../types';

export default function Modal() {
    const modal = useAppStore((state) => state.modal)
    const closeModal = useAppStore((state) => state.closeModal)
    const selectedRecipe = useAppStore((state) => state.selectedRecipe)
    const handleClickFavorite = useAppStore((state) => state.handleClickFavorite)
    const favoriteExists = useAppStore((state) => state.favoriteExists)

    const renderIngredients = () => {
        const ingredients: React.JSX.Element[] = []

        for (let i = 1; i <= 6; i++) {
            const ingredient = selectedRecipe[`strIngredient${i}` as keyof RecipeType]
            const measure = selectedRecipe[`strMeasure${i}` as keyof RecipeType]

            if (ingredient && measure) {
                ingredients.push(
                    <li key={i} className='text-lg font-normal'>{ingredient} - {measure}</li>
                )
            }
        }
        return ingredients
    }

    return (
        <>
            <Transition appear show={modal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="relative transform overflow-hidden bg-white rounded-3xl p-6 md:p-8 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                                    <DialogTitle as="h3" className="text-gray-900 text-3xl font-bold mb-6 text-center tracking-tight">
                                        {selectedRecipe.strDrink}
                                    </DialogTitle>

                                    <img src={selectedRecipe.strDrinkThumb} alt={`Image of ${selectedRecipe.strDrink}`} className='mx-auto w-full max-w-sm rounded-2xl shadow-md mb-8' />

                                    <div className="space-y-6">
                                        <div>
                                            <DialogTitle as="h3" className="text-gray-800 text-xl font-semibold mb-3">
                                                Ingredients and Measures
                                            </DialogTitle>
                                            <ul className="text-gray-600 space-y-1">{renderIngredients()}</ul>
                                        </div>

                                        <div>
                                            <DialogTitle as="h3" className="text-gray-800 text-xl font-semibold mb-3">
                                                Instructions
                                            </DialogTitle>
                                            <p className='text-gray-600 leading-relaxed'>{selectedRecipe.strInstructions}</p>
                                        </div>
                                    </div>

                                    <div className='flex flex-col sm:flex-row justify-end gap-3 mt-8'>
                                        <button
                                            type='button'
                                            className='w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-colors duration-200 cursor-pointer'
                                            onClick={closeModal}
                                        >
                                            Close
                                        </button>
                                        <button
                                            type='button'
                                            className={`w-full sm:w-auto font-semibold py-3 px-6 rounded-xl transition-colors duration-200 text-white ${favoriteExists(selectedRecipe.idDrink) ? 'bg-red-500 hover:bg-red-600' : 'bg-orange-500 hover:bg-orange-600'} cursor-pointer`}
                                            onClick={() => handleClickFavorite(selectedRecipe)}
                                        >
                                            {favoriteExists(selectedRecipe.idDrink) ? 'Remove Favorite' : 'Add to Favorites'}
                                        </button>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}