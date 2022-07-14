import './App.css';
import {forwardRef, useState} from "react";
import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList";
import {AppBar, Button, Container, Dialog, Slide} from "@mui/material";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function ToastContainer() {
    return null;
}

function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [order, setOrder] = useState([{
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
        }]
    );


    const dialogOpen = () => {
        setIsOpen(true)
    };
    const dialogClose = () => {
        setIsOpen(false)
    };
    return (
        <div className="App">
            <h2>Заявки</h2>
            <Button onClick={dialogOpen}>
                Додати
            </Button>
            <Dialog
                open={isOpen}
                fullScreen
                TransitionComponent={Transition}
            >
                <OrderForm
                    order={order}
                    setOrder={setOrder}
                    isOpen={isOpen}
                    dialogOpen={dialogOpen}
                    setIsOpen={setIsOpen}
                />
            </Dialog>

            <OrderList setOrder={setOrder}/>
        </div>
    );
}


export default App;
