import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
// import { Posts } from "../../dummyData";
import { useEffect, useState } from "react";
import axios from "axios"
import { red } from "@mui/material/colors";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function Feed() {
  const [posts,setPosts] = useState([])  

  useEffect(()=>{
    const fetchPosts = async() => {
      const res = await axios.get(SERVER_URL + '/api/users/self/feed', {withCredentials: true})
        .then(res => {
          setPosts(res.data.feed);
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        })
      
    };
    fetchPosts();
  },[])

  return (
        <div className="feed">
          <div className="feedWrapper">
            <Share/>
            {posts.map((p) => (
              <Post key={p._id} post={p}/>
            ))}            
          </div>
        </div>
  );
}
