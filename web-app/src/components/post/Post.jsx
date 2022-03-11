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
  const [comments, setComments] = useState([]);

  const [currentUser ,setCurrentUser] = useState([])  

  useEffect(()=>{
    const fetchUser = async() => {
      const res = await axios.get(SERVER_URL + '/api/users/self', {withCredentials: true});
      setCurrentUser(res.data.user)
      console.log(res)
    };
    fetchUser();
  },[])

  useEffect(()=>{
    setIsLiked(post.liked.includes(currentUser.id))
},[currentUser.id,post.liked])

  useEffect(()=>{
    let isMounted = true;
    const fetchComments= async() => {
      const res = await axios.get(SERVER_URL + '/api/recipes/' + post._id + '/comments');
      if (isMounted)
        setComments(res.data.comments);
    console.log(res.data);
    console.log(comments);
    return () => { isMounted = false};
      
    };
    fetchComments();
  },[])


 const likeHandler = ()=>{
     setLike(isLiked ? like-1 : like+1)
     setIsLiked(!isLiked)
    if (isLiked) {
        axios.post(SERVER_URL + '/api/recipes/' + post._id +'/unlike', {}, {withCredentials: true})
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        axios.post(SERVER_URL + '/api/recipes/' + post._id +'/like', {}, {withCredentials: true})
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }
 }

 const commentClick = ()=>{
    const comment = document.getElementById("commentField").value;

    axios.post(SERVER_URL + '/api/recipes/' + post._id + '/comments', {comment}, {withCredentials: true})
        .then(res => {
            console.log(res.data);
            setComments(res.data.comments);
        })
        .catch(err => {
            console.log(err);
        });
 }

  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    {/* <img className="postProfileImg" src= {user.profilePicture || "assets/person/noavatar.png"} alt="" /> */}
                    <span className="postUserName">
                        {post.author.username}
                    </span>
                    <span className="postDate">{format(post.date)}</span>
                </div>
            </div>
            <div className="postCenter">
                <span className="postTitle"><u>{post?.title}</u></span> <br/>
                <img className="postImg" src={'images/' + (post.image || null)} alt="" />
                <span className="ingredients"><b>Ingredients:</b> {post?.ingredients.join(', ')}</span>
                <br/> <br/>
                <pre className="postText">{post?.text}</pre>
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    {/* <img className="likeIcon" src="assets/like.png" onClick={likeHandler} alt="" /> */}
                    <img className="likeIcon" src={(isLiked ? "assets/dislike.png" : "assets/like.png")} onClick={likeHandler}/>
                    <space className="postLikeCounter">{like} people like it</space>
                </div>
            </div>
            <div className="postBottomComments">
                <span className="postCommentText"> comments</span>
                <div>
                   {comments.map((comment) => (
                        <div className="commentsWrapper">
                            <div className="commentTopLeft">
                                <span className="postUserName">
                                    {comment.author.username}
                                </span>
                                <span className="postDate">{format(comment.date)}</span>
                            </div>
                            <div className="commentCenter">
                                <span className="commentText">{comment.text}</span>
                            </div>
                        </div>
                    ))} 
                </div>
                <div className="commentBottom">
                    <form>
<<<<<<< HEAD
                    <input id="commentField" placeholder="have a comment?" type="text" className="commentInput"/>
                    <button className="commentButton" onClick={commentClick}>Post Comment</button>
=======
                    <input id="commentField" placehoder="have a comment?" type="text" className="commentInput"/>
>>>>>>> 81cf7397ac30b01e1e2f492c3c697d75d9dcdf6b
                    </form>
                    <button className="commentButton" onClick={commentClick}>Post Comment</button>
                </div>
                <div className="postBottomRight">
                    {/*<span className="postCommentText"> <div>{post.commets}</div> comments</span>*/}
                </div>
            </div>
        </div>       
    </div>
  )
}
