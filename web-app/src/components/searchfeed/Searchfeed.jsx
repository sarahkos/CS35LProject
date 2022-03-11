import Post from "../post/Post";
import Share from "../share/Share";
import "./searchfeed.css";
// import { Posts } from "../../dummyData";
import { useEffect, useState } from "react";
import axios from "axios"
import { red } from "@mui/material/colors";
import {useLocation , useHistory} from 'react-router-dom';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const PATH_SEARCH = SERVER_URL + '/api/recipes/';

export default function Feed() {
  const [results,setResults] = useState([])  
  const [posts,setPosts] = useState([])  
  const search_args = useLocation().search;
  console.log(search_args);

  useEffect(()=>{    
    const fetchPosts = () => {
        console.log("args" + search_args);
        axios.get(PATH_SEARCH + search_args)
        .then(res => {
            setResults(res.data.recipes);
            console.log(res.data);
        })
        .catch(error => {
            console.log(error);
        });
    };
    fetchPosts();
}, [] );

  return (
        <div className="searchFeed">
          <div className="searchFeedWrapper">
            {/* <Share/> */}
            {results.map((p) => (
              <Post key={p._id} post={p}/>
            ))}            
          </div>
        </div>
  );
}
