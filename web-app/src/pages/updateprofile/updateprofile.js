import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import "./updateprofile.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const PATH_BIO = SERVER_URL + '/api/users/self/bio';
const PATH_USER = SERVER_URL + '/api/users/self';

export default function UpdateProfile() {

    const [user, setUser] = useState({})
  
    useEffect(()=>{
        const fetchUser= async() => {
          const res = await axios.get(PATH_USER, {withCredentials: true});
          setUser(res.data.user);
          console.log(res.data)
          
        };
        fetchUser();
      },[])

    const handleClick = () => {

        const bio = document.getElementById('bioField').value;
        console.log(bio);

        axios.post(PATH_BIO, {bio}, {withCredentials: true})
            .then((res) => {
               console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
    }


    
        return (
            <div>
                <div className="updateprofile">
                    <div className="inputBackground">
                        <div className="updateHeader"> Update Your Profile </div>
                        <div className="textLabel"> User: {user.username}</div>   
                        <form>
                            <label className="textLabel" >Change Bio: </label>
                            <textarea id="bioField" placeholder="Bio" className="inputBoxLarge" defaultValue={user.bio} />
                            <button type="button" className="submitButton" onClick={() => handleClick()}>Update Profile </button>
                        </form>
                        <div><Link to='Home' class="linkbutton">Back to Home</Link> </div>
                    </div>
                </div>
            </div>
        )
    }