import "./OrderList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOrder, GetOrders, UpdateOrder } from "../../Redux/apiCalls";
import { useState } from "react";

export default function OrderList() {
    const [status, setStatus]= useState('pending')
 const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  useEffect(() => {
    GetOrders(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    DeleteOrder(id, dispatch);
  };
  const handleStatusChange=(id)=>{
    dispatch(UpdateOrder( id, status, dispatch))
   
  }

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="orderListItem">
            {params.row.title}
          </div>
        );
      },
    },
     {
      field: "qantity",
      headerName: "Quantity",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="orderListItem">
            {params.row.quantity}
          </div>
        );
      },
    },
    { field: "status", headerName: "Status", width: 200,
    renderCell: (params) => {
        return (
          <div className="orderListItem">
            {params.row.status}
            <label>Update Status</label>
            <select onChange={(e)=>{handleStatusChange(params.row._id, setStatus(e.target.value))}}>
                <option value="pending">Pending</option>
                <option value="fulfilled">Fulfilled</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
            </select>
          </div>
        );
      },
    },
   
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="orderListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={orders}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}