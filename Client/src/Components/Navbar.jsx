import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import { Badge } from '@mui/material';
import { ShoppingCartOutlined } from '@material-ui/icons';
import {mobile} from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {logout} from "../redux/userRedux";
 
const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  cursor:pointer;
  
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;


export const Navbar = () => {
  const quantity = useSelector((state)=>state.cart.quantity);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = ()=>{
     navigate("/");
  }
  const handleRegister=()=>{
    navigate("/register");
  }

  const handleLogin=()=>{
    navigate("/login");
  }
  const logOut = ()=>{
    dispatch(logout());
    navigate("/login");
  }
  return (
    <Container>
    <Wrapper>
      <Left>
        <Language onClick={logOut}>
          EN
        </Language>
        <SearchContainer style={{color:"gray",fontSize:16}} >
            <Input/>
          <SearchIcon/>
        </SearchContainer>
      </Left>
      <Center>
      
        <Logo  onClick={handleClick}>
          Shara
        </Logo>
        
      </Center>
      <Right>
     
      <MenuItem  onClick={handleRegister}>REGISTER</MenuItem>
          <MenuItem  onClick={handleLogin}>SIGN IN</MenuItem>
          
          <MenuItem>
          <Link to="/cart">
      <Badge badgeContent={quantity} color="primary">
  <ShoppingCartOutlined color="action" />
    </Badge>
    </Link>
      </MenuItem>
      </Right>
    </Wrapper>
    </Container>
  )
}
 