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
import {useHistory} from 'react-router-dom';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const PATH_PROFILE = SERVER_URL + '/api/users/self';

export default function Sidebar() {

  const [user, setUser] = useState({});

  useEffect(()=>{
      const fetchUser= async() => {
        const res = await axios.get(PATH_PROFILE,{withCredentials: true});
        setUser(res.data.user)
        console.log(res)
      };
      fetchUser();
    },[])

  const history = useHistory();
  const handleClick = ()=> { 
    let path = '/updateprofile'; 
    history.push(path);
  }

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

              </ul>

              <button className="sidebarButton" onClick={handleClick}>Edit Profile</button>
              <hr className="sidebarHr"/>
              <h3 className="sidebarBottomTitle">My Recipes </h3>
              <ul className="sidebarFriendList">
                {user.recipes?.map(recipe=>(
                  <li className="sidebarFriend">
                    <img className="sidebarFriendImg" src={"images/" + (recipe.image || "default.png")} alt="" />
                    <span className="sidebarFriendName">{recipe.title}</span>
                  </li>
                ))}
              </ul>
            </div>
        </div>
  )
}
