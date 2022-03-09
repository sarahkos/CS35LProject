import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
// import { Posts } from "../../dummyData";
import { useEffect, useState } from "react";
import axios from "axios"
import { red } from "@mui/material/colors";



export default function Feed() {
  const [posts,setPosts] = useState([])

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  useEffect(()=>{
    const fetchPosts = async() => {
      const res = await axios.get('http://localhost:5000/api/recipes');
      setPosts(res.data.recipes)
      console.log(res)
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
