import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { currentUser, userRequest } from "../../requestMethod";
import { useSelector } from "react-redux";

export default function FeaturedInfo() {
 // const admin = useSelector((state)=>state.user.currentUser.isAdmin);
 const admin = localStorage.getItem("persist:root") &&  JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser;

  const [income,setIncome] =useState();
 // const [perc,setPerc] =useState();
  console.log(income);
  useEffect(()=>{
 const getIncome = async() =>{
  const res = await userRequest.get("/orders/income");
    setIncome(res.data[0]?.total);
 }
  admin&& getIncome();
  },[])
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income?income:0}</span>
          <span className="featuredMoneyRate">{1.5}%{" "}
            {10>0? (<ArrowUpward className="featuredIcon"/>) :
            <ArrowDownward  className="featuredIcon negative"/>
            } 
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
