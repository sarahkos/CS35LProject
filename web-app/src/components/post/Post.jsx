import "./post.css";
import { MoreVert } from "@mui/icons-material";
// import { Users } from "../../dummyData";
import { useEffect, useState } from "react";
import axios from "axios"
import {format} from "timeago.js"

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function Post({post}) {
  const [like, setLike] = useState(post.likes)
  const [isLiked, setIsLiked] = useState(false)
  const [user, setUser] = useState({});


  useEffect(()=>{
    const fetchUser= async() => {
      const res = await axios.get(`/users/${post.userId}`);
      setUser(res.data)
      
    };
    fetchUser();
  },[post.userId])


 const likeHandler = ()=>{
     setLike(isLiked ? like-1 : like+1)
     setIsLiked(!isLiked)
    if (isLiked) {
        axios.post(SERVER_URL + '/api/recipes/' + post._id +'/unlike', {withCredentials: true})
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        axios.post(SERVER_URL + '/api/recipes/' + post._id +'/like', {withCredentials: true})
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }
 }

  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <img className="postProfileImg" src= {user.profilePicture || "assets/person/noavatar.png"} alt="" />
                    <span className="postUserName">
                        {post.author.username}
                    </span>
                    <span className="postDate">{format(post.date)}</span>
                </div>
                <div className="postTopRight">
                    <MoreVert />
                </div>
            </div>
            <div className="postCenter">
                <span className="postTitle">{post?.title}{"\n"}</span>
                <span className="postText">{post?.text}</span>
                <img className="postImg" src={post.photo} alt="" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img className="likeIcon" src="assets/like.png" onClick={likeHandler} alt="" />
                    <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" />
                    <space className="postLikeCounter">{like} people like it</space>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comments} comments</span>
                </div>
            </div>
        </div>       
    </div>
  )
}
