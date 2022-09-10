import React, { useEffect, useState } from 'react'
import { useSelector} from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import StripeCheckout from 'react-stripe-checkout'
import styled from 'styled-components'
import Announcement from '../Components/Announcement'
import { Navbar } from '../Components/Navbar'
import { userRequest } from '../requestMethod'

const KEY = process.env.REACT_APP_STRIPE_KEY;


const Wrapper =styled.div`
 width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  
  margin-bottom:100px;
`
const Container = styled.div`
 width: 40%;
  padding: 20px;
  background-color: white;
  margin-bottom:200px;
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  margin-bottom:20px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-left:25px;
`;
const Card = styled.button`
 width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-left:25px;
  margin-top:50px;
`;


const CashOnDelivary = () => {
  console.log('====================================');
  console.log(KEY);
  console.log('====================================');
  const location = useLocation();
  const navigate = useNavigate();
  const cart = useSelector(state=>state.cart);
  const [stripeToken,setStripeToken] =useState(null);
  const currentUser = useSelector((state)=>state.user.currentUser);
  const products = location.state.products;
  console.log(products);
  const onToken = (token)=>{
    setStripeToken(token);
  }
  const [address,setAddress] =useState({});
  const handleChange =(e) =>{
setAddress(
  (prev)=>{
    return {
      ...prev,[e.target.name]:e.target.value
    }
  }
)
  }
  console.log(address,products);

  const handleClick =(e)=>{
    try{
    e.preventDefault();
    navigate("/successcod",{
      state:{
        address:address,
        products:products,
      }
    });
    } catch(err){
      console.log(err);
    }
  }
const login =(e)=>{
  e.preventDefault();
  navigate("/login");
}
  useEffect(()=>{
    const postMoney =async ()=>{
        const res = await userRequest.post("/checkout/payment",{
         tokenId:stripeToken.id,
         email:stripeToken.email,
         card:stripeToken.card,
         amount:500,
        });
        console.log(res.data);
        navigate("/success",{state:{
         stripeData: res.data,
         products: cart, }});
        
    }
       stripeToken  &&  postMoney();
   },[stripeToken,cart,navigate]);
  return (
    <>
    {currentUser!==null?
    <>
      <Navbar/>
    <Announcement/>
    
    <Wrapper>
    <Container>
    <Title>CASH ON DELIVARY</Title>
       <input style={{ padding: 10, marginBottom: 20 }}  onChange={handleChange} placeholder='NAME' type='text' name="name"/>
    <input style={{ padding: 10, marginBottom: 20 }}  onChange={handleChange} name="Mobile Number" placeholder='MOBILE NUMBER' type='number'  />
    <input style={{ padding: 10, marginBottom: 20 }}  onChange={handleChange} type="text" name="city" placeHolder="CITY"  />
    <input style={{ padding: 10, marginBottom: 20 }}  onChange={handleChange} type="text" name="country" placeHolder="Country"  />
    <input style={{ padding: 10, marginBottom: 20 }}  onChange={handleChange} type="text" name="line1" placeHolder="AddressLane1"  />
    <input style={{ padding: 10, marginBottom: 20 }}  onChange={handleChange} type="text" name="line2" placeHolder="AddressLane2"  />
    <input style={{ padding: 10, marginBottom: 20 }}  onChange={handleChange}  type="number" name="pincode" placeHolder="PinCode"/>
    <Button onClick={handleClick} >PLACE ORDER</Button>
      <hr/>
      <hr/>
      <hr/>
      <StripeCheckout
              name="Shara Collection"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
            <Card>FOR CARD PAYMENT</Card>
           </StripeCheckout>
      </Container>
  </Wrapper>
  </>
  :
      <>
      <Wrapper>
        <Container>
          <Title>LOGIN TO ORDER</Title>
          <Button onClick={login} > Navigate to Login</Button>
        </Container>
      </Wrapper>
      </>
    }
    
  </>
  )
}

export default CashOnDelivary