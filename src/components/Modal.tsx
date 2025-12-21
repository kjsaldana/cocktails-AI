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
                    <div className="fixed inset-0 bg-black/80" />
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
                            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                            <DialogTitle as="h3" className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                                {selectedRecipe.strDrink}
                            </DialogTitle>
                            <img src={selectedRecipe.strDrinkThumb} alt={`Image of ${selectedRecipe.strDrink}`} className='mx-auto w-96' />
                            <DialogTitle as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                                Ingredients and Measures
                            </DialogTitle>
                            <ul>{renderIngredients()}</ul>
                            <DialogTitle as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                                Instructions
                            </DialogTitle>
                            <p className='text-lg'>{selectedRecipe.strInstructions}</p>
                            <div className='flex justify-between gap-4 mt-5'>
                                <button
                                    type='button'
                                    className='bg-gray-600 hover:bg-gray-500 w-full uppercase text-white font-bold p-2 cursor-pointer rounded-3xl'
                                    onClick={closeModal}
                                >
                                    Close    
                                </button>
                                <button
                                    type='button'
                                    className={`${favoriteExists(selectedRecipe.idDrink) ? 'bg-red-500 hover:bg-red-400' : 'bg-orange-500 hover:bg-orange-400'} w-full rounded-3xl uppercase text-white font-bold p-2 cursor-pointer `}
                                    onClick={() => handleClickFavorite(selectedRecipe)}
                                >
                                    {favoriteExists(selectedRecipe.idDrink) ? 'Remove Favorite' : 'Add to Favorites '}   
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