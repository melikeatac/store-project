import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, fetchProducts, openBasketModal, setView } from '../features/productSlice';
import Favorite from './Favorite';
import { Loader } from './Loader';
import ViewFilter from './ViewFilter';
import { Star } from '@mui/icons-material';
import { Basket } from './Basket';

const ProductList = () => {
    const dispatch = useDispatch();
    const { loading, error, filteredProducts, view } = useSelector((state) => state.products);

    const handleAddBasket = (item) => {
        const newItem = {
            title: item.title,
            price: item.price,
            image: item.image,
            count: 1,
            id: item.id
        };

        dispatch(addToBasket(newItem));
        dispatch(openBasketModal(true))
    };

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(setView(4));
    }, [dispatch]);

  
    return (
        <div>
            <ViewFilter />
            <Basket />
            <div className="dark:bg-gray-900 bg-white pt-5">
                {
                    loading ? <Loader /> :
                        (
                            <div className="mx-auto max-w-7xl overflow-hidden">
                                <h2 className="sr-only">Products</h2>

                                <div className={`-mx-px grid border-l dark:border-gray-600 border-gray-200 sm:mx-0 grid-cols-1 ${view === 3 ? 'sm:grid-cols-3' : view === 4 ? 'sm:grid-cols-4' : 'sm:grid-cols-5'}`}>
                                    {filteredProducts.map((product) => (
                                        <div key={product.id} className="group dark:bg-gray-900 relative border-b border-r dark:border-gray-600 border-gray-200 p-4">
                                            <Favorite productId={product.id} />
                                            <img
                                                alt={product.title}
                                                src={product.image}
                                                className="aspect-square m-auto max-h-52 sm:max-h-80 rounded-lg bg-white object-contain"
                                            />
                                            <div className="pt-10">
                                                <h3 className="text-sm font-medium dark:text-white text-gray-900 line-clamp-2 h-11">
                                                    {product.title}
                                                </h3>

                                                <div className="flex items-center">
                                                    <Star className='text-yellow-400' />
                                                    <p className="text-sm dark:text-white">({product.rating.rate} / 5)</p>
                                                </div>
                                                <p className="mt-4 text-lg font-semibold text-orange-600">{product.price} TL</p>
                                                <button
                                                    onClick={() => { handleAddBasket(product) }}
                                                    type="button"
                                                    className="rounded-md w-full dark:bg-gray-900 bg-white px-3 py-2 z-10 text-sm mt-4 font-semibold dark:text-white text-orange-600 shadow-sm ring-1 ring-inset dark:ring-white ring-orange-600 hover:bg-orange-600 hover:text-white"
                                                >
                                                    Sepete Ekle
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                }
            </div>
        </div>
    );
};

export default ProductList;
