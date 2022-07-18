import './App.css';
import {forwardRef, useEffect, useState} from "react";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList";
import {AppBar, Button, Container, Dialog, Slide} from "@mui/material";
import {BrowserRouter, BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {useDispatch} from "react-redux";
import Order from "./Order";
import Orders from "./pages/Orders";
import NavBar from "./components/NavBar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login"
import {loadUser} from "./components/slices/authSlice";
import Home from "./components/Home";
import Cart from "./components/Cart";
import NotFound from "./components/NotFound";
import UserProfile from "./UserProfile";
import Users from "./components/admin/Users";
import Dashboard from "./components/admin/Dashboard";
import Summary from "./components/admin/Summary";
import OrdersDetail from "./components/admin/OrdersDetail";
import OrdersDetailList from "./components/admin/list/OrdersDetailList";
import CreateOrderDetail from "./components/admin/CreateOrderDetail";
import OrderDetail from "./OrderDetail";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUser(null));
    }, [dispatch]);

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
            <BrowserRouter>
                <ToastContainer/>
                <NavBar/>
                <div className="content-container">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                        {/*<Route path="/checkout-success" element={<CheckoutSuccess />} />*/}
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/detail/:id" element={<OrderDetail />} />
                        <Route path="/order/:id" element={<Order/>}/>
                        <Route path="/user/:id" element={<UserProfile />} />
                        <Route path="/admin" element={<Dashboard />}>
                        <Route path="summary" element={<Summary />} />
                        <Route path="details" element={<OrdersDetail />}>
                        <Route index element={<OrdersDetailList />} />
                        <Route path="create-detail" element={<CreateOrderDetail />} />
                        </Route>
                        <Route path="users" element={<Users />} />
                        <Route path="orders" element={<Orders/>}/>
                        </Route>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </div>
            </BrowserRouter>


            {/*<h2>Заявки</h2>*/}
            {/*<Button onClick={dialogOpen}>*/}
            {/*    Додати*/}
            {/*</Button>*/}
            {/*<Dialog*/}
            {/*    open={isOpen}*/}
            {/*    fullScreen*/}
            {/*    TransitionComponent={Transition}*/}
            {/*>*/}
            {/*    <OrderForm*/}
            {/*        order={order}*/}
            {/*        setOrder={setOrder}*/}
            {/*        isOpen={isOpen}*/}
            {/*        dialogOpen={dialogOpen}*/}
            {/*        setIsOpen={setIsOpen}*/}
            {/*    />*/}
            {/*</Dialog>*/}

            {/*<OrderList setOrder={setOrder}/>*/}
        </div>
    );
}


export default App;
