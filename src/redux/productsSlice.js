import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
    products: [],
    load: true
}

export const getProducts = createAsyncThunk('products', async () => {
    const {data} = await axios.get('https://fakerapi.it/api/v1/products?_quantity=8')
    return data.data
})


const productsSlice = createSlice({
    name: 'productsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state, action) => {
                state.load = true
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.load = false
                state.products = action.payload
            })
            .addCase(getProducts.rejected, (state, action) => {
                Swal.fire(
                    'Попробуйте снова!',
                    'Запрос не был отправлен!',
                    'error'
                )
            })
    }
})

export default productsSlice.reducer;
export const productsSelect = state => state.productsSlice;
