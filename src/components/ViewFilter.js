import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/react'
import { DarkMode, LightMode } from '@mui/icons-material';
import { ChevronDown, Search, ShoppingBasketIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleTheme, openBasketModal, searchFilter, setFilter, setView, sortByPrice } from '../features/productSlice';

const sortOptions = [
    { name: 'Fiyata göre artan', value: 'asc' },
    { name: 'Fiyata göre azalan', value: 'desc' },
]

const ViewFilter = () => {
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState([]);
    const { products, basketList } = useSelector((state) => state.products);
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    const theme = useSelector(state => state.products.theme);
    let basketCount = 0;

    basketList.forEach(product => {
        basketCount += product.count;
    });

    console.log(basketCount);
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);


    const handleCategoryFilter = (category) => {
        setSelectedCategory((prev) => {
            const newSelection = prev.includes(category)
                ? prev.filter((item) => item !== category)
                : [...prev, category];
            dispatch(setFilter(newSelection));
            return newSelection;
        });
    };

    const handleClick = (item) => {
        dispatch(sortByPrice(item));
    }
    
    const handleChange = (val) => {
        dispatch(searchFilter(val));
    }

    const handleBasketClick = () => {
        dispatch(openBasketModal(true))
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-900 relative z-20">
            <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8 dark:bg-gray-900">
                <section aria-labelledby="filter-heading" className="border-t dark:border-gray-600 border-gray-200 py-6">

                    <div className="flex items-stretch w-full gap-3 sm:gap-0 sm:items-center sm:flex-row flex-col-reverse justify-between">

                        <div className='hidden sm:flex items-center gap-3 flex-1 dark:text-white'>
                            <p>Görünüm:</p>
                            <button onClick={() => dispatch(setView(3))}>3</button> | <button onClick={() => dispatch(setView(4))}>4</button> | <button onClick={() => dispatch(setView(5))}>5</button>
                        </div>
                        <div className="mt-2 flex-1">
                            <div className="flex rounded-md dark:text-gray-900 bg-white outline outline-1 -outline-offset-1 dark:outline-gray-900 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-orange-600">
                                <input
                                    onChange={(e) => {
                                        handleChange(e.target.value)
                                    }}
                                    id="search"
                                    name="search"
                                    type="text"
                                    className="block min-w-0 grow px-3 py-1.5 text-base dark:text-white text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                />
                                <div className="flex py-1.5 pr-1.5">
                                    <kbd className="inline-flex items-center rounded px-1 font-sans text-xs text-gray-400">
                                        <Search />
                                    </kbd>
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center gap-6 flex-1 justify-end'>
                            <PopoverGroup className="flex sm:items-baseline sm:space-x-8">
                                <Popover
                                    id={`desktop-menu-1`}
                                    className="relative inline-block text-left"
                                >
                                    <div>
                                        <PopoverButton className="group inline-flex items-center justify-center text-sm font-medium dark:text-white text-gray-700 hover:text-gray-900">
                                            <span>Kategori</span>
                                            <ChevronDown
                                                aria-hidden="true"
                                                className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                                            />
                                        </PopoverButton>
                                    </div>

                                    <PopoverPanel
                                        transition
                                        className="absolute right-0 z-10 mt-2 origin-top-right rounded-md dark:bg-gray-900 bg-white p-4 shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                    >
                                        <form className="space-y-4">
                                            {uniqueCategories.map((option, optionIdx) => (
                                                <div key={optionIdx} className="flex gap-3">
                                                    <div className="flex h-5 shrink-0 items-center">
                                                        <div className="group grid size-4 grid-cols-1">
                                                            <input
                                                                checked={selectedCategory.includes(option)}
                                                                onChange={() => handleCategoryFilter(option)}
                                                                type="checkbox"
                                                                id={optionIdx}
                                                                className="col-start-1 row-start-1 appearance-none rounded border dark:border-gray-600 border-gray-300 dark:bg-gray-900 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                                            />
                                                            <svg
                                                                fill="none"
                                                                viewBox="0 0 14 14"
                                                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                                            >
                                                                <path
                                                                    d="M3 8L6 11L11 3.5"
                                                                    strokeWidth={2}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="opacity-0 group-has-[:checked]:opacity-100"
                                                                />
                                                                <path
                                                                    d="M3 7H11"
                                                                    strokeWidth={2}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <label
                                                        className="whitespace-nowrap pr-6 text-sm font-medium dark:text-white text-gray-900"
                                                        htmlFor={optionIdx}
                                                    >
                                                        {option}
                                                    </label>
                                                </div>
                                            ))}
                                        </form>
                                    </PopoverPanel>
                                </Popover>
                            </PopoverGroup>
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <MenuButton className="group inline-flex justify-center text-sm font-medium dark:text-white text-gray-700 hover:text-gray-900">
                                        Fiyat
                                        <ChevronDown
                                            aria-hidden="true"
                                            className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                                        />
                                    </MenuButton>
                                </div>

                                <MenuItems
                                    transition
                                    className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md dark:bg-gray-900 bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <div className="py-1">
                                        {sortOptions.map((option) => (
                                            <MenuItem key={option}>
                                                <button className="block px-2 py-2 text-sm font-medium dark:text-white text-gray-900 data-[focus]:bg-gray-100 data-[focus]:outline-none w-full" onClick={() => handleClick(option.value)}>{option.name}</button>
                                            </MenuItem>
                                        ))}
                                    </div>
                                </MenuItems>
                            </Menu>
                            <button onClick={handleBasketClick} className='text-gray-900 dark:text-white flex items-center gap-1'><ShoppingBasketIcon className='text-gray-900 dark:text-white' size={24} />({basketCount})</button>
                        </div>
                        <button
                            className={`cursor-pointer fixed left-4 bottom-12 text-center p-4 flex rounded-full bg-gray-700 text-white dark:bg-yellow-500`}
                            onClick={() => { dispatch(handleTheme()) }}
                        >
                            {theme === "dark" ? <LightMode /> : <DarkMode />}
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}
export default ViewFilter;