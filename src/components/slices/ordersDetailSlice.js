import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { url, setHeaders } from "./api";
import axios from "axios";


const initialState = {
    items: [],
    status: null,
    error:null,
    // createStatus: null,
    // editStatus: null,
    // deleteStatus: null,
}

export const ordersDetailFetch = createAsyncThunk(
    "details/ordersDetailFetch",
    async () => {
        try{
            const response = await axios.get("http://localhost:5051/details");
            return response?.data
        }catch (error){
            console.log(error);
        }

    }
)

const ordersDetailSlice = createSlice({
    name: 'ordersDetail',
    initialState,
    reducers: {},
    extraReducers: {
        [ordersDetailFetch.pending]: (state, action) => {
            state.status = "pending"
        },
        [ordersDetailFetch.fulfilled]: (state, action) => {
            state.status = "success";
                state.items = action.payload
        },
        [ordersDetailFetch.rejected]: (state, action) => {
            state.status = "rejected";
                state.error = action.payload

        }
    }
});

export default ordersDetailSlice.reducer;