import "./sidebar.css"
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import {Users} from "../../dummyData"
import CloseFriend from "../closeFriend/CloseFriend";
import { useEffect, useState } from 'react'
import axios from "axios"

export default function Sidebar() {

  const [user, setUser] = useState({});

  useEffect(()=>{
      const fetchUser= async() => {
        const res = await axios.get(`http://localhost:5000/api/users/hello123`);
        setUser(res.data.user)
        console.log(res)
      };
      fetchUser();
    },[])

  return (
        <div className="sidebar">
            <div className="sidebarWrapper">
            <h3 className="sidebarTitle">Profile Info: </h3>
              <ul className="sidebarList">

                <li className="sidebarListItem">
                  <DriveFileRenameOutlineIcon className="sidebarIcon"/>
                  <span className="sidebarListItemText">Name: {user.username} </span>
                </li>

                <li className="sidebarListItem">
                  <LocationCityIcon className="sidebarIcon"/>
                  <span className="sidebarListItemText">Bio: {user.bio} </span>
                </li>

                <li className="sidebarListItem">
                  <AccessTimeIcon className="sidebarIcon"/>
                  <span className="sidebarListItemText">Recipes: {user.recipes}</span>
                </li>

                <li className="sidebarListItem">
                  <DinnerDiningIcon className="sidebarIcon"/>
                  <span className="sidebarListItemText">liked: {user.liked}</span>
                </li> 

              </ul>

              <button className="sidebarButton">Edit Profile</button>
              <hr className="sidebarHr"/>
              <h3 className="sidebarBottomTitle">Recipe from your friends: </h3>
              <ul className="sidebarFriendList">
                {Users.map(u=>(
                  <CloseFriend key= {u.id} user={u}/>
                ))}
              </ul>
            </div>
        </div>
  )
}
