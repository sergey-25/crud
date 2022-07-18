import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { Provider } from "react-redux";
import { configureStore} from "@reduxjs/toolkit";
import ordersReducer from "./features/ordersSlice";
import ordersDetailReducer, {ordersDetailFetch} from "./components/slices/ordersDetailSlice";
import {ordersDetailApi} from './components/slices/ordersDetailApi';
import cartReducer, {getTotals} from './components/slices/cartSlice';
import authReducer from './components/slices/authSlice';
import UsersSlice from "./components/slices/UsersSlice";
import ordersSlice from "./components/slices/ordersSlice";

const store = configureStore({
    reducer: {
        ordersState: ordersReducer,
        ordersDetail: ordersDetailReducer,
        users: UsersSlice,
        orders: ordersSlice,
        cart: cartReducer,
        auth: authReducer,
        [ordersDetailApi.reducerPath]: ordersDetailApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ordersDetailApi.middleware),
});


store.dispatch(ordersDetailFetch());
store.dispatch(getTotals());


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);