import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Rightbar from '../../components/rightbar/Rightbar'
import Searchfeed from '../../components/searchfeed/Searchfeed'
import Post from '../../components/post/Post'
import {useLocation , useHistory} from 'react-router-dom';
import { useEffect, useState } from 'react'
import axios from "axios"

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const PATH_SEARCH = SERVER_URL + '/api/recipes/';

export default function SearchResultsFeed() {
    const [results,setResults] = useState([])  
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
        <>
            <Topbar/>
            <div className="homeContainer">
                <Sidebar/>
                <Searchfeed/>
                {/* <div className= "searchresultsFeed">
                    {results.map((p) => (
                        <Post key={p._id} post={p}/>
                    ))}
                </div> */}
                <Rightbar/>
            </div>
        </>
    )
}