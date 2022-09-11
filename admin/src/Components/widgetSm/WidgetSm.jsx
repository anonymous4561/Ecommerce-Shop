import "./widgetSm.css";
import { Visibility } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { currentUser, Token, userRequest } from "../../requestMethod";
import { useSelector } from "react-redux";

export default function WidgetSm() {
  const admin = localStorage.getItem("persist:root") &&  JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser;
 // const admin = useSelector((state)=>state.user.currentUser.isAdmin);

  const [users,setUsers] =useState([]);
  useEffect(()=>{
  const getUsers = async ()=>{
    const res = await  userRequest.get("users/?new=true");
    setUsers(res.data);
    console.log(res.data);
  };
 admin && getUsers();
  },[]);
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
      {users.map(user=>(
        <li className="widgetSmListItem" key={user._id}>
          <img
            src={user.img ||   "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif" }
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        ))}
      </ul>
    </div>
  );
}