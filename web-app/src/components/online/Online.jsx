import axios from "axios";
import "./online.css"
import { useContext, useEffect, useState } from "react";

export default function Online({user}) {

    const [follow, setFollow] = useState(user.following)
    const [isFollowed, setIsFollowed] = useState(false)

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const [currentUser ,setUser] = useState([])  

  useEffect(()=>{
    const fetchUser = async() => {
      const res = await axios.get(SERVER_URL + '/api/users/self', {withCredentials: true});
      setUser(res.data.user)
      console.log(res)
    };
    fetchUser();
  },[])

    useEffect(()=>{
        setIsFollowed(user.followers.includes(currentUser.id))
    },[currentUser.id,user.followers])

  const followHandler = ()=>{
    setFollow(isFollowed)
    setIsFollowed(!isFollowed)
    if (isFollowed) {
        axios.post(SERVER_URL + '/api/users/' + user.username + '/followers/unfollow', {}, {withCredentials: true})
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }
    else {
        axios.post(SERVER_URL + '/api/users/' + user.username + '/followers/follow', {}, {withCredentials: true})
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }
}
  return (
    <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">
            <img className="rightbarProfileImg" src={user.profilePicture || "assets/person/noavatar.png"} alt="" />
            <span className="rightbarOnline"></span>
        </div>
        <span className="rightbarUsername">{user.username}</span>
        <button className="followButton" type="submit" onClick={followHandler}>{(isFollowed ? "Unfollow" : "Follow")}</button>
    </li>
  )
}