import { useDispatch, useSelector } from "react-redux";
import {useEffect, useState} from "react";
// import {useNavigate} from 'react-router-dom';
import { deleteOrder, getOrders} from "../features/ordersSlice";
import moment from "moment";
import "../App.css";
import {CircularProgress, Card, Grid, Alert, Snackbar, IconButton, Box} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ConfirmDialog from "./ConfirmDialog";
import ActionButton from "./ActionButton";
import {DataGrid} from "@mui/x-data-grid";






const OrderList = ({setOrder, order, setIsOpen, isOpen, dialogOpen}) => {

    const [open, setOpen] = useState(false);
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''})

    const dispatch = useDispatch();
    const ordersState = useSelector((state) => state.ordersState);
    const { orders } = ordersState;

    const rows = orders && orders.map((order, index) =>{
        return{
            id: order._id,
            address: order.address,
            recipient: order.recipient,
            comment: order.comment,
            fullName: order.fullName
        }
    })
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'address',
            headerName: 'Адреса',
            width: 150,
            editable: false,
        },
        {
            field: 'recipient',
            headerName: 'Одержувач',
            width: 150,
            editable: false,
        },
        {
            field: 'comment',
            headerName: 'Коментар',
            width: 110,
            editable: false,
        },
        {
            field: 'fullName',
            headerName: 'Назва',
            width: 110,
            editable: false,
        },
        {
            field: 'actions',
            headerName: 'Дії',
            sortable: false,
            width: 160,
            renderCell:(params) =>{
                return(
                    <Grid container justifyContent="space-between">
                        <Grid item>

                            <IconButton>
                                <RemoveRedEyeIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton
                                color="primary"
                                variant="outlined"
                                size="small"
                                onClick={() =>  setOrder({ ...orders})}
                                sx={{
                                    fontFamily: "'Abel', 'sansSerif'",
                                }}
                            >
                                <EditIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <ActionButton
                                variant="contained"
                                color="error"
                                size="small"
                                sx={{
                                    marginLeft: "0.7rem",
                                    fontFamily: "'Abel', 'sansSerif'",
                                }}
                                onClick={() => {
                                    setConfirmDialog({
                                        isOpen: true,
                                        title: 'Справді видалити цей запис?',
                                        subTitle: "Ви не зможете скасувати цю операцію",
                                        onConfirm: ()=>{
                                            handleDelete(orders._id)
                                            handleClick()
                                        }
                                    })

                                }}
                            >
                                <DeleteForeverIcon/>
                            </ActionButton>
                        </Grid>
                    </Grid>
                )
            }
        },
    ];

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    const handleDelete = (_id) => {
        dispatch(deleteOrder(_id));
    };
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
   const handleClickOpen =()=>{
       dialogOpen();
       let selectedProd = orders.filter((item) => item._id === item._id);
       selectedProd = selectedProd[0];
setOrder(selectedProd)
   }
    return (
        <>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[7]}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </Box>

            <h2> Ви маєте {orders && orders.length} заявки </h2>
            {ordersState.getOrdersStatus === "pending" ? <CircularProgress /> : null}
            {orders.map((order, index) => (
                <Card
                    variant="outlined"
                    sx={{

                        padding: "0.7rem",
                        marginBottom: "2rem",
                    }}
                    key={order._id}
                >
                   <Grid container>
                       <Grid item>
                           <h3>{index +1}</h3>
                       </Grid>
                      <Grid item>
                          <h3>{order.address}</h3>
                      </Grid>
                       <Grid item>
                           <h3>{order.recipient}</h3>
                       </Grid>
                       <Grid item>
                           <h3>{order.comment}</h3>
                       </Grid>
                       <Grid item>
                           <h3>{order.fullName}</h3>
                       </Grid>

                   </Grid>
                    <p>Додано: {moment(order.date).fromNow()}</p>
                    <IconButton  color="primary">
                        <RemoveRedEyeIcon/>
                    </IconButton>
                    <IconButton
                        color="primary"
                        variant="outlined"
                        size="small"

                        // onClick={() => setOrder({ ...order}) }
                        sx={{
                            fontFamily: "'Abel', 'sansSerif'",
                        }}
                    >
                        <EditIcon/>
                    </IconButton>
                    <ActionButton
                        variant="contained"
                        color="error"
                        size="small"
                        sx={{
                            marginLeft: "0.7rem",
                            fontFamily: "'Abel', 'sansSerif'",
                        }}
                        onClick={() => {
                            setConfirmDialog({
                                isOpen: true,
                                title: 'Справді видалити цей запис?',
                                subTitle: "Ви не зможете скасувати цю операцію",
                                onConfirm: ()=>{
                                    handleDelete(order._id)
                                    handleClick()
                                }
                            })

                        }}
                    >
                      <DeleteForeverIcon/>
                    </ActionButton>

                </Card>
            ))}
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
          <div>
              {ordersState.addOrderStatus === "rejected" ? (
                  <Alert severity="error">{ordersState.addOrderError}</Alert>
              ) : null}
              {ordersState.addOrderStatus === "success" ? (
                  <Alert severity="success">Заявку подано</Alert>
              ) : null}
              {ordersState.updateOrderStatus === "rejected" ? (
                  <Alert severity="error">{ordersState.updateOrderError}</Alert>
              ) : null}
              {ordersState.updateOrderStatus === "success" ? (
                  <Alert severity="success">Заявка оновлена</Alert>
              ) : null}
              {ordersState.deleteOrderStatus === "rejected" ? (
                 <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                     <Alert severity="error">{ordersState.deleteOrderError}</Alert>
                 </Snackbar>
              ) : null}
              {ordersState.deleteOrderStatus === "success" ? (
                  <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                      <Alert severity="success">Заявку видалено</Alert>
                  </Snackbar>
              ) : null}
          </div>
        </>
    );
};

export default OrderList;