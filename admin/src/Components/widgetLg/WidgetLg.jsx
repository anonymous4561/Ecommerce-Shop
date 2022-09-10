import { useEffect, useState } from "react";
import { currentUser, Token, userRequest } from "../../requestMethod";
import "./widgetLg.css";
import {format} from 'timeago.js';
import { useSelector } from "react-redux";

export default function WidgetLg() {
 const admin = localStorage.getItem("persist:root") &&  JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser;

 // const admin = useSelector((state)=>state.user.currentUser.isAdmin);
  const [orders,setOrder] =useState([]);
  useEffect(()=>{
  const getOrders = async ()=>{
    const res = await  userRequest.get("orders");
    setOrder(res.data);
  };
 admin && getOrders();
console.log(orders);
  },[]);
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
      <tbody>
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {orders.map((order) => (
          <tr className="widgetLgTr" key={order._id}>
            <td className="widgetLgUser">
              <span className="widgetLgName">{order.userid}</span>
            </td>
            <td className="widgetLgDate">{format(order.createdAt)}</td>
            <td className="widgetLgAmount">${order.amount}</td>
            <td className="widgetLgStatus">
              <Button type={order.status} />
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
