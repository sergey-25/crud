import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getOrders, ordersAdd, updateOrder} from "../features/ordersSlice";
import {Button, Alert, CircularProgress, TextField} from "@mui/material";


function OrderForm({order, setOrder, setIsOpen, isOpen}) {
    const dispatch = useDispatch();
    const ordersState = useSelector((state) => state.ordersState);
    const {orders} = ordersState;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (order._id) {
            dispatch(updateOrder(order));
        } else {
            const newOrder = {
                ...order[0],
                date: new Date(),
            };

            dispatch(ordersAdd(newOrder));
        }

        setOrder([{
                address: '',
                recipient: '',
                comment: '',
                fullName: '',
                color: '',
                category: '',
                orderNumber: '',
                // orderDate: '',
                characteristics: '',
                term: '',
                size: '',
                amount: '',
                link: '',
                commentToOrder: '',
                importance: '',
                orderRecipient: '',
                orderStatus: '',
                commentToStatus: '',
                isComplete: false,
            }]);
        setIsOpen(false)
    };
    const resetForm = () => {
        setOrder = []
        console.log("reset")
    }
    const handleInputChange = (e, index) => {
        const {name, value} = e.target
        const item = [...order]
        item[index][name] = value;
        setOrder(item)
    }

    const handleAdd = () => {
        setOrder([...order, {
            address: '',
            recipient: '',
            comment: '',
            fullName: '',
            color: '',
            category: '',
            orderNumber: '',
            // orderDate: '',
            characteristics: '',
            term: '',
            size: '',
            amount: '',
            link: '',
            commentToOrder: '',
            importance: '',
            orderRecipient: '',
            orderStatus: '',
            commentToStatus: '',
            isComplete: false,
        }])
    }
    const handleRemove = (index) => {
        const item = [...order]
        item.splice(index, 1)
        setOrder(item)
        console.log("remove")
    }
    return (
        <>
            <Button onClick={() => console.log(orders)}>orders</Button>
            <form>
                {order.map((o, i) => (
                    <div key={i}>
                        <TextField
                            type="text"
                            variant="standard"
                            name="address"
                            value={o.address}
                            onChange={(e) => handleInputChange(e, i)}
                        />
                        <TextField
                            type="text"
                            variant="standard"
                            name="recipient"
                            value={o.recipient}
                            onChange={(e) => handleInputChange(e, i)}
                        />
                        <TextField
                            type="text"
                            variant="standard"
                            name="comment"
                            value={o.comment}
                            onChange={(e) => handleInputChange(e, i)}
                        />
                        <TextField
                            variant="standard"
                            name="fullName"
                            value={o.fullName}
                            onChange={(e) => handleInputChange(e, i)}/>
                        <div>
                            {order.length - 1 === i && (
                                <Button onClick={handleAdd}>
                                    add
                                </Button>
                            )}
                        </div>
                        <div>
                            {order.length > 1 && (
                                <Button onClick={() => {
                                    handleRemove(i)
                                }}>
                                    remove
                                </Button>
                            )}

                        </div>
                    </div>

                ))}
                <br/>
                <Button onClick={resetForm}>reset</Button>
                <Button
                    onClick={handleSubmit}
                    // type="submit"
                    variant="contained"
                    size="small"
                    sx={{
                        margin: "0.9rem 0rem",
                        fontFamily: "'Abel', 'sansSerif'",
                    }}
                >
                    {ordersState.addOrderStatus === "pending" ||
                    ordersState.updateOrderStatus === "pending" ? (
                        <CircularProgress size={24} color="secondary"/>
                    ) : order._id ? (
                        "Зберегти"
                    ) : (
                        "Подати"
                    )}
                </Button>
                <Button onClick={() => setIsOpen(false)}>Закрити</Button>

            </form>
        </>
    );
}

export default OrderForm;