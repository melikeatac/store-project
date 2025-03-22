import { Trash } from 'lucide-react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeToBasket } from '../features/productSlice';

export const Basket = () => {
    const { basketList } = useSelector((state) => state.products);
    console.log(basketList)
    const dispatch = useDispatch();

    const handleRemoveFromBasket = (productId) => {
        dispatch(removeToBasket({ id: productId }));
    };

    return (
        <div className='h-screen w-52 shadow-md dark:bg-gray-900 bg-white fixed right-0 top-0 z-20 p-3 overflow-auto'>
            <div className="mt-6 grid grid-cols-1 gap-5">
                {basketList.map((product) => (
                    <div key={product.id} className="group relative flex flex-col items-center border dark:border-gray-600 border-gray-200 p-2">
                        <img
                            alt={product.title}
                            src={product.image}
                            className="aspect-square w-full max-w-16 max-h-16 rounded-md dark:bg-gray-900 bg-gray-200 object-cover lg:aspect-auto lg:h-80"
                        />
                        <div>
                            <h3 className="text-sm dark:text-white text-gray-700 mt-1">
                                {product.title}
                            </h3>
                        </div>
                        <p className="text-sm text-left font-semibold text-orange-600">{product.price} TL</p>
                        <div className='flex gap-2 mt-2 dark:text-white'>
                            <p>
                                ({product.count})
                            </p>
                            <button onClick={() => handleRemoveFromBasket(product.id)} className='dark:text-white'>
                                <Trash size={18} />
                            </button>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    )
}
