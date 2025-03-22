import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        filteredProducts: [],
        loading: false,
        error: null,
        selectedCategory: [],
        sortByPrice: null,
        searchFilter: null,
        setView: null,
        view: 4,
        basketList: []
    },
    reducers: {
        setFilter: (state, action) => {
            state.selectedCategory = action.payload;
            state.filteredProducts = state.products.filter(product =>
                state.selectedCategory.length === 0 || state.selectedCategory.includes(product.category)
            );
        },
        sortByPrice: (state, action) => {
            state.sortByPrice = action.payload;
            if (action.payload === 'asc') {
                state.filteredProducts = [...state.filteredProducts].sort((a, b) => a.price - b.price);
            } else if (action.payload === 'desc') {
                state.filteredProducts = [...state.filteredProducts].sort((a, b) => b.price - a.price);
            }
        },
        searchFilter: (state, action) => {
            state.searchFilter = action.payload;
            let filtered = state.products;
            if (state.selectedCategory.length > 0) {
                filtered = state.products.filter(product =>
                    state.selectedCategory.includes(product.category)
                );
            }
            if (action.payload) {
                filtered = filtered.filter(item =>
                    item.title.toLowerCase().includes(action.payload.toLowerCase())
                );
            }
            state.filteredProducts = filtered;
        },
        setView: (state, action) => {
            state.view = action.payload;
        },
        addToBasket: (state, action) => {
            const existingProductIndex = state.basketList.findIndex(product => product.id === action.payload.id);

            if (existingProductIndex !== -1) {
                state.basketList[existingProductIndex].count += 1;
            } else {
                const newItem = {
                    ...action.payload,
                    count: 1
                };
                state.basketList.push(newItem);
            }
        },
        removeToBasket: (state, action) => {
            const productIndex = state.basketList.findIndex(product => product.id === action.payload.id);

            if (productIndex !== -1) {
                const product = state.basketList[productIndex];
                if (product.count > 1) {
                    product.count -= 1;
                } else {
                    state.basketList.splice(productIndex, 1);
                }
            }
        },


    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                state.filteredProducts = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setFilter, sortByPrice, searchFilter, setView, addToBasket, removeToBasket } = productSlice.actions;

export default productSlice.reducer;
