import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0
}


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        deleteCart(state, action) {
state.initialState = {};
console.log(initialState.cartItems)
        },
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id)
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1
                toast.info(`Додано  до переліку`, {
                    position: 'bottom-left'
                });
            } else {
                const tempOrderDetail = {...action.payload, cartQuantity: 1}
                state.cartItems.push(tempOrderDetail)
                toast.success(`Заявку ${action.payload.name} подано`, {
                    position: 'bottom-left'
                })
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        removeFromCart(state, action) {
            const nextCartItems = state.cartItems.filter(
                cartItem => cartItem.id !== action.payload.id
            )
            state.cartItems = nextCartItems;

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))


            toast.error(`Заявку ${action.payload.name} видалено`, {
                position: 'bottom-left'
            })
        },
        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                cartItem => cartItem.id = action.payload.id
            )
            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1
                toast.info(`Додано ${action.payload.name} `, {
                    position: 'bottom-left'
                })
            } else if (
                state.cartItems[itemIndex].cartQuantity === 1
            ) {
                const nextCartItems = state.cartItems.filter(
                    cartItem => cartItem.id !== action.payload.id
                );
                state.cartItems = nextCartItems;

                toast.error(`Зменшено ${action.payload.name} `, {
                    position: 'bottom-left'
                });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        clearCart(state, action) {
            state.cartItems = []
            toast.error('Очищено', {
                position: 'bottom-left'
            });
        },
        getTotals(state, action) {
            let {total, quantity} = state.cartItems.reduce((cartTotal, cartItem) => {
                    const {price, cartQuantity} = cartItem
                    const itemTotal = price * cartQuantity

                    cartTotal.total += itemTotal
                    cartTotal.quantity += cartQuantity

                    return cartTotal;
                },
                {
                    total: 0,
                    quantity: 0
                });
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        }
    }
})
export const {addToCart, removeFromCart, decreaseCart, clearCart, getTotals, deleteCart} = cartSlice.actions;

export default cartSlice.reducer;