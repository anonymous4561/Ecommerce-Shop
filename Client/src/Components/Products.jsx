import { useEffect, useState } from "react";
import styled from "styled-components"
import { Product } from "./Product"
import axios from 'axios';

const Container = styled.div`
 padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Products = ({filters,cat,sort}) => {
  const [products,setProducts] =useState([]);
  const [filteredProducts,setFilteredProducts] = useState([]);
  useEffect(()=>{
   const getProducts = async()=>{
    const res = await axios.get( cat ? `http://localhost:5000/api/products?category=${cat}`: 
    "http://localhost:5000/api/products" );
    setProducts(res.data);
   }
   getProducts();
  },[cat]);

  useEffect(()=>{
 cat  &&  setFilteredProducts(
  products.filter((item) =>
    Object.entries(filters).every(([key, value]) =>
      item[key].includes(value)
    )
  )
);
  },[cat,products,filters]);
 
  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);
  return (
    <Container>
         {cat
        ? filteredProducts.map((item) => <Product item={item} key={item._id} />)
        : products
            
            .map((item) => <Product item={item} key={item._id} />)}
       
    </Container>
  )
}
