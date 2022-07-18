import {IconButton} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import {addToCart, deleteCart, removeFromCart} from "./slices/cartSlice";
import {useGetAllOrdersDetailQuery} from "./slices/ordersDetailApi";

const Home = () => {
    const {items, status} = useSelector((state) => state.ordersDetail);
    const dispatch = useDispatch();
    // const history = useHistory();
    const navigate = useNavigate();

    const {data, error, isLoading} = useGetAllOrdersDetailQuery();

    const handleAddToCart = (detail) => {
        dispatch(addToCart(detail));
        console.log("addet")
        navigate("/cart");
    };
    const handleRemove = () => {
        dispatch(deleteCart());
    };

    return (
        <div className="home-container">
            {status === "success" ? (
                <>
                    <h2>Заявки</h2>
                    <div className="order-details">
                        {data &&
                            data?.map((detail, index) => (
                                <div key={index} className="product">
                                    <h3>{detail.name}</h3>
                                    <Link to={"/details/" + detail._id}>
                                        <img src={detail.image?.url} alt={detail.name}/>
                                    </Link>

                                    <div className="details">
                                        <span>{detail.desc}</span>
                                        {/*<span className="price">${detail.price}</span>*/}
                                    </div>
                                    <div>

                                        <IconButton color="primary">
                                            <RemoveRedEyeIcon/>
                                        </IconButton>
                                        <IconButton color="primary" onClick={() => handleAddToCart(detail)}>
                                            <EditIcon/>
                                        </IconButton>
                                        <IconButton color="error" onClick={()=>handleRemove(detail)}>
                                            <DeleteForeverIcon/>
                                        </IconButton>
                                    </div>
                                </div>
                            ))}
                    </div>
                </>
            ) : status === "pending" ? (
                <p>Loading...</p>
            ) : (
                <p>Unexpected error occured...</p>
            )}
        </div>
    );
};

export default Home;
