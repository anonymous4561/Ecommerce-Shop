import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteProduct, product } from "../../redux/apiCalls";
import {useDispatch, useSelector} from 'react-redux';

export default function ProductList() {
  const dispatch = useDispatch();
 // product(dispatch);
  const products = useSelector(state=>state.product.products);
// console.log(products);

 

useEffect(()=>{
product(dispatch);
},[dispatch])

  const handleDelete = (id) => {
    
    deleteProduct(dispatch,id);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
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
      getRowId={(row) => row._id}
        rows={products}
        disableSelectionOnClick
        columns={columns}
        pageSize={100}
        checkboxSelection
      />
    </div>
  );
}
