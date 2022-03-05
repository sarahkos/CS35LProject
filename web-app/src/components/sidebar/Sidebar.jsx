import "./sidebar.css"
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import {Users} from "../../dummyData"
import CloseFriend from "../closeFriend/CloseFriend";

export default function Sidebar() {
  return (
        <div className="sidebar">
            <div className="sidebarWrapper">
            <h3 className="sidebarTitle">Profile Info: </h3>
              <ul className="sidebarList">

                <li className="sidebarListItem">
                  <DriveFileRenameOutlineIcon className="sidebarIcon"/>
                  <span className="sidebarListItemText">Name: {Users[0].username} </span>
                </li>

                <li className="sidebarListItem">
                  <LocationCityIcon className="sidebarIcon"/>
                  <span className="sidebarListItemText">Live in: {Users[0].liveIn} </span>
                </li>

                <li className="sidebarListItem">
                  <AccessTimeIcon className="sidebarIcon"/>
                  <span className="sidebarListItemText">Cooking Experience: {Users[0].cookingExperience}</span>
                </li>

                <li className="sidebarListItem">
                  <DinnerDiningIcon className="sidebarIcon"/>
                  <span className="sidebarListItemText">My favorite food is: {Users[0].favFood}</span>
                </li>

                <li className="sidebarListItem">
                  <LocalDiningIcon className="sidebarIcon"/>
                  <span className="sidebarListItemText">My favorite recipe is: {Users[0].favRecipeName}</span>
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
