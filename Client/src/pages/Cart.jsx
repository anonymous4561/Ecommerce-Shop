import { Add, Remove } from '@material-ui/icons';
import {useState,useEffect} from 'react'
import styled from 'styled-components';
import Announcement from '../Components/Announcement';
import { Footer } from '../Components/Footer';
import { Navbar } from '../Components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { publicRequest, userRequest } from '../requestMethod';
import {useNavigate} from 'react-router-dom';
import { deleteProduct } from '../redux/apiCalls';
import { deleteProductSuccess } from '../redux/cartRedux';
import { mobile } from "../responsive";


const Container = styled.div``; 

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
  
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
 ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  `;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor:pointer;
`;
const Delete = styled.div`
margin-bottom:55px;
cursor:pointer;
`


export const Cart = () => {
  const cart = useSelector(state=>state.cart);
  const {products,quantity,total} =cart;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleCheckout =() =>{
    navigate("/checkout",{
      state:{
        products:cart
      }
    });
  }

const handleDelete = (product)=>{
  const {price, quantity,_id} = product;
  console.log('====================================');
  console.log(_id,price);
  console.log('===================================='); 
 // deleteProduct(dispatch,price,_id);
  dispatch(deleteProductSuccess({price,_id,quantity}));
}
 
  const KEY = process.env.STRIPE_KEY;
  return (
    <Container>
    <Navbar/>
    <Announcement/>
   <Wrapper>
    <Title>YOUR BAG</Title>
    <Top>
        <TopButton>
            CONTINUE SHOPPING
        </TopButton>
        <TopTexts>
            <TopText>Shopping Bag (0)</TopText>
            <TopText>Your Wishlist (0)</TopText>

        </TopTexts>
        <TopButton onClick={handleCheckout} type="filled">
            CHECKOUT NOW
        </TopButton>
    </Top>
    <Bottom>
        <Info>{
          products.map((product)=>{
          return(
          <Product key={product._id}>
          <ProductDetail>
            <Image src={product.img}/>
          <Details>
            <ProductName><b>Product:</b>
            {product.title}
            </ProductName>
            <ProductId>
                <b>ID:</b>
               {product._id}
            </ProductId>
            <ProductColor color={product.color}/>
            <ProductSize><b>
                Size:
            </b>
            {product.size}
            </ProductSize>
            </Details>
            </ProductDetail>az
            <PriceDetail>
           <Delete onClick={()=>handleDelete(product)} > <DeleteOutlineIcon/> </Delete>
            <ProductAmountContainer>
            <Add/>
            <ProductAmount>{product.quantity}</ProductAmount>
                 <Remove/>            
            </ProductAmountContainer>
            <ProductPrice>$ {product.price*product.quantity}</ProductPrice>
            </PriceDetail>
         
          
        </Product>)})}
        <Hr />
        </Info>
        
        <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {total} </SummaryItemPrice>
            </SummaryItem>
           
           
              <Button onClick={handleCheckout}>CHECKOUT NOW</Button>
           
            
          </Summary>
    
         
    </Bottom>
   </Wrapper>
<Footer/>
</Container>
  )
}
