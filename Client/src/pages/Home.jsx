import React from 'react'
import { useLocation } from 'react-router'
import Announcement from '../Components/Announcement'
import { Categories } from '../Components/Categories'
import { Footer } from '../Components/Footer'
import { Navbar } from '../Components/Navbar'
import Newsletter from '../Components/Newsletter'
import { Products } from '../Components/Products'
import { Slider } from '../Components/Slider'
import env from "react-dotenv";

const Home = () => {
  
 console.log('====================================');
 console.log( process.env.REACT_APP_STRIPE_KEY);
 console.log('===================================='); 
  const location = useLocation();
  console.log(location);
  return (
    <div>
    <Announcement/>
       <Navbar/>
       <Slider/>
       <Categories/>
       <Products/>
       <Newsletter/>
       <Footer/>
       </div>
  )
  
}

export default Home