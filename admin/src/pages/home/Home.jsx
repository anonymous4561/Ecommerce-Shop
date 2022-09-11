import Chart from "../../Components/chart/Chart";
import FeaturedInfo from "../../Components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../Components/widgetSm/WidgetSm";
import WidgetLg from "../../Components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import {  userRequest,currentUser, token } from "../../requestMethod";
import { useSelector } from "react-redux";

export default function Home() {
 const admin = localStorage.getItem("persist:root") &&  JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser;

// const admin = useSelector((state)=>state.user.currentUser.isAdmin);

  
  const [userStats,setUserStats] = useState([]);
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

useEffect(()=>{
const getStats = async ()=>{
 const res = await userRequest.get("/users/stats");
 res.data.map((item)=>
setUserStats((prev)=> [
  ...prev,{name:MONTHS[item._id-1],"Active User":item.total}
])
 )
}
admin && getStats();
},[]);
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}