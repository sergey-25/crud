import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:5050/api/";

const initialState = {
    orders: [],
    addOrderStatus: "",
    addOrderError: "",
    getOrdersStatus: "",
    getOrdersError: "",
    deleteOrderStatus: "",
    deleteOrderError: "",
    updateOrderStatus: "",
    updateOrderError: "",
};

export const ordersAdd = createAsyncThunk(
    "orders/ordersAdd",
    async (order, { rejectWithValue }) => {
        try {
            const response = await axios.post(baseURL + "orders", order);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data);
        }
    }
);

export const getOrders = createAsyncThunk(
    "orders/getOrders",
    async (id = null, { rejectWithValue }) => {
        try {
            const response = await axios.get(baseURL + "orders");
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data);
        }
    }
);

export const deleteOrder = createAsyncThunk(
    "orders/deleteOrder",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(baseURL + "orders/" + id);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data);
        }
    }
);

export const updateOrder = createAsyncThunk(
    "orders/updateOrder",
    async (order, { rejectWithValue }) => {
        try {
            const  [{
                _id,
                fullName,
                color,
                category,
                orderNumber,
                orderDate,
                characteristics,
                term,
                size,
                amount,
                link,
                commentToOrder,
                importance,
                orderRecipient,
                orderStatus,
                commentToStatus,
                address, recipient, comment, isComplete, date
            }] = order;

            const response = await axios.put(baseURL + "orders/" + _id,
                [{
                    fullName,
                    color,
                    category,
                    orderNumber,
                    orderDate,
                    characteristics,
                    term,
                    size,
                    amount,
                    link,
                    commentToOrder,
                    importance,
                    orderRecipient,
                    orderStatus,
                    commentToStatus,
                    address, recipient, comment, isComplete, date
                }]
            );
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data);
        }
    }
);

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: {
        [ordersAdd.pending]: (state, action) => {
            return {
                ...state,
                addOrderStatus: "pending",
                addOrderError: "",
                getOrdersStatus: "",
                getOrdersError: "",
                deleteOrderStatus: "",
                deleteOrderError: "",
                updateOrderStatus: "",
                updateOrderError: "",
            };
        },
        [ordersAdd.fulfilled]: (state, action) => {
            // state.todos.push(action.payload);
            return {
                ...state,
                orders: [action.payload, ...state.orders],
                addOrderStatus: "success",
                addOrderError: "",
                getOrdersStatus: "",
                getOrdersError: "",
                deleteOrderStatus: "",
                deleteOrderError: "",
                updateOrderStatus: "",
                updateOrderError: "",
            };
        },
        [ordersAdd.rejected]: (state, action) => {
            return {
                ...state,
                addOrderStatus: "rejected",
                addOrderError: action.payload,
                getOrdersStatus: "",
                getOrdersError: "",
                deleteOrderStatus: "",
                deleteOrderError: "",
                updateOrderStatus: "",
                updateOrderError: "",
            };
        },
        [getOrders.pending]: (state, action) => {
            return {
                ...state,
                addOrderStatus: "",
                addOrderError: "",
                getOrdersStatus: "pending",
                getOrdersError: "",
                deleteOrderStatus: "",
                deleteOrderError: "",
                updateOrderStatus: "",
                updateOrderError: "",
            };
        },
        [getOrders.fulfilled]: (state, action) => {
            return {
                ...state,
                orders: action.payload,
                addOrderStatus: "",
                addOrderError: "",
                getOrdersStatus: "success",
                getOrdersError: "",
                deleteOrderStatus: "",
                deleteOrderError: "",
                updateOrderStatus: "",
                updateOrderError: "",
            };
        },
        [getOrders.rejected]: (state, action) => {
            return {
                ...state,
                addOrderStatus: "",
                addOrderError: "",
                getOrdersStatus: "rejected",
                getOrdersError: action.payload,
                deleteOrderStatus: "",
                deleteOrderError: "",
                updateOrderStatus: "",
                updateOrderError: "",
            };
        },
        [deleteOrder.pending]: (state, action) => {
            return {
                ...state,
                addOrderStatus: "",
                addOrderError: "",
                getOrdersStatus: "",
                getOrdersError: "",
                deleteOrderStatus: "pending",
                deleteOrderError: "",
                updateOrderStatus: "",
                updateOrderError: "",
            };
        },
        [deleteOrder.fulfilled]: (state, action) => {
            const currentOrders = state.orders.filter(
                (order) => order._id !== action.payload._id
            );
            return {
                ...state,
                orders: currentOrders,
                addOrderStatus: "",
                addOrderError: "",
                getOrdersStatus: "",
                getOrdersError: "",
                deleteOrderStatus: "success",
                deleteOrderError: "",
                updateOrderStatus: "",
                updateOrderError: "",
            };
        },
        [deleteOrder.rejected]: (state, action) => {
            return  {
                ...state,
                addOrderStatus: "",
                addOrderError: "",
                getOrdersStatus: "",
                getOrdersError: "",
                deleteOrderStatus: "rejected",
                deleteOrderError: action.payload,
                updateOrderStatus: "",
                updateOrderError: "",
            };
        },
        [updateOrder.pending]: (state, action) => {
            return {
                ...state,
                addOrderStatus: "",
                addOrderError: "",
                getOrdersStatus: "",
                getOrdersError: "",
                deleteOrderStatus: "",
                deleteOrderError: "",
                updateOrderStatus: "pending",
                updateOrderError: "",
            };
        },
        [updateOrder.fulfilled]: (state, action) => {
            const updatedOrders = state.orders.map((order) =>
                order._id === action.payload._id ? action.payload : order
            );
            return {
                ...state,
                orders: updatedOrders,
                addOrderStatus: "",
                addOrderError: "",
                getOrdersStatus: "",
                getOrdersError: "",
                deleteOrderStatus: "",
                deleteOrderError: "",
                updateOrderStatus: "success",
                updateOrderError: "",
            };
        },
        [updateOrder.rejected]: (state, action) => {
            return {
                ...state,
                addOrderStatus: "",
                addOrderError: "",
                getOrdersStatus: "",
                getOrdersError: "",
                deleteOrderStatus: "",
                deleteOrderError: "",
                updateOrderStatus: "rejected",
                updateOrderError: action.payload,
            };
        },
    },
});

export default ordersSlice.reducer;