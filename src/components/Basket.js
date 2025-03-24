import { ChevronRightCircleIcon, Trash } from 'lucide-react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { openBasketModal, removeToBasket } from '../features/productSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Basket = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { basketList, open } = useSelector((state) => state.products);

    const approveToast = () => {
        toast.success("Ürün başarıyla silindi.", {
            position: "top-right",
            autoClose: 3000,
        });
    };
    
    const handleRemoveFromBasket = (productId) => {
        dispatch(removeToBasket({ id: productId }));
        approveToast();
    };

    return (
        open && (
            <div className='h-screen w-52 shadow-md dark:bg-gray-900 bg-white fixed right-0 top-0 z-20 p-3 overflow-auto'>
                <ChevronRightCircleIcon className='cursor-pointer text-orange-600' size={28} onClick={() => dispatch(openBasketModal(false))} />
                {
                    basketList.length > 0 ? (
                        <div className="mt-6 flex flex-col justify-between gap-5 relative">
                            {basketList.map((product) => (
                                <div key={product.id} className="group relative flex flex-col items-center border dark:border-gray-600 border-gray-200 p-2">
                                    <img
                                        alt={product.title}
                                        src={product.image}
                                        className="aspect-square w-full max-w-16 max-h-16 rounded-md dark:bg-gray-900 bg-white object-contain lg:aspect-auto lg:h-80"
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
                            <button className="rounded-md w-full sticky bottom-0 dark:bg-gray-900 bg-white px-3 py-2 z-10 text-sm mt-4 font-semibold dark:text-white text-orange-600 shadow-sm ring-1 ring-inset dark:ring-white ring-orange-600 hover:bg-orange-600 hover:text-white" onClick={() => {
                                navigate('/bill');
                            }}>Ödeme Yap</button>
                        </div>
                    ) :
                        <div className='text-center text-orange-600 h-full flex items-center font-semibold'>Sepetinizde ürün bulunmamaktadır.</div>
                }
            </div>
        )
    );
};
