import { Heart } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const Favorite = ({ productId }) => {

    const [favorites, setFavorites] = useState(() => {
        return JSON.parse(localStorage.getItem('favorites')) || [];
    });

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }, []);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    // Favoriye ekleme/çıkarma fonksiyonu
    const toggleFavorite = () => {
        setFavorites((prevFavorites) =>
            prevFavorites.includes(productId)
                ? prevFavorites.filter((id) => id !== productId)
                : [...prevFavorites, productId]
        );
    };

    return (
        <button className="absolute dark:top-5 dark:right-5 top-2 right-2 z-10" onClick={toggleFavorite}>
            <Heart
                size={28}
                className='delay-150'
                color={favorites.includes(productId) ? '#ea580c' : 'gray'}
                fill={favorites.includes(productId) ? '#ea580c' : 'none'}
            />
        </button>
    );
};

export default Favorite;
