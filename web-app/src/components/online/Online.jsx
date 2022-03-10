import axios from "axios";
import "./online.css"
import { useEffect, useState } from "react";

export default function Online({user}) {

    const [follow, setFollow] = useState(user.following)
    const [isFollowed, setIsFollowed] = useState(false)

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

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
        <button className="followButton" type="submit" onClick={followHandler}>{(isFollowed ? "unFollow" : "Follow")}</button>
    </li>
  )
}