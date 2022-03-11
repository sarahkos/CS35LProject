import axios from "axios";
import Post from "../post/Post";
import "./rightbar.css";
import {Users} from "../../dummyData";
import Online from "../online/Online";
import RateReviewIcon from '@mui/icons-material/RateReview';
import { useEffect, useState } from "react";;

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function Rightbar({profile}) {

  const [users, setUser] = useState([]);

  useEffect(()=>{
    const fetchUser= async() => {
      const res = await axios.get(SERVER_URL + `/api/users/`);
      setUser(res.data.users);
      console.log(res);
    };
    fetchUser();
  },[]);

  const changedUserSearch = async () => {
    try {
      const username = document.getElementById("userSearch").value;
      const res = await axios.get(SERVER_URL + `/api/users/`, {
        params: {
          username
        }
      });
      setUser(res.data.users);
      console.log("asdasdasd");
    } catch (error) {
      console.log(error);
    }
  };


  const HomeRightbar = () => {
    return(
      <>
        <h4 className="rightbarTitle">People you should follow</h4>
        <ul className="rightbarFriendList"> 
          {users.map((u) => (
            <Online key={u.id} user={u}/>
          ))}               
        </ul>
      </>
    )  
  };

  const ProfileRightbar = () => {
    return(
      <>
      <h4 className="rightbarTitle">User information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoValue">New York</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoValue">New York</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship:</span>
          <span className="rightbarInfoValue">Single</span>
        </div>
      </div>
      <h4 className="rightbarTitle">User friends</h4>
      <div className="rightbarFollowings">
        <div className="rightbarFollowing">
          <img src="assets/person/1.jpg" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">John Carter</span>
        </div>
        <div className="rightbarFollowing">
          <img src="assets/person/2.jpg" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">John Carter</span>
        </div>
        <div className="rightbarFollowing">
          <img src="assets/person/3.jpg" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">John Carter</span>
        </div>
        <div className="rightbarFollowing">
          <img src="assets/person/4.jpg" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">John Carter</span>
        </div>
        <div className="rightbarFollowing">
          <img src="assets/person/5.jpg" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">John Carter</span>
        </div>
        <div className="rightbarFollowing">
          <img src="assets/person/6.jpg" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">John Carter</span>
        </div>
        
      </div>
      </>
    )
  }
  return (
        <div className="rightbar">
            <div className="rightbarWrapper">
              <input id="userSearch" type= "text" placeholder="Search for a user" className="searchInput" onChange={changedUserSearch}/>
              {profile ? <ProfileRightbar/> : <HomeRightbar/>}
            </div>
        </div>
  )
}
