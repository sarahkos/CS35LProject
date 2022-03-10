import React, {useState} from "react";
import {Link, useHistory} from 'react-router-dom';
import "./loginpage.css"
import axios from 'axios';


const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const PATH_NEWUSER = SERVER_URL + '/api/users/login';

//still need to make an authentication that connects with the actual backend
//need to make css page to format the design of the login page

export default function LoginPage(){
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    //const [errorMessage, setErrorMessage] = useState("");

    const userObject = {username: userName, password: password};

    function checkRequirements(){
        return userName.length >= 6 && userName.length <= 15;
    }

    const history = useHistory();
    const routeChange = () =>{ 
    let path = '/Home'; 
    history.push(path);
  }

    const handleSignIn = async (event) =>{
        event.preventDefault();
        try {
            let response = await axios.post(PATH_NEWUSER, userObject, {withCredentials: true})
            console.log(response.data);
            //Empty the Input Boxes on the Login Page after Sign In
            setUsername('');
            setPassword('');
        }catch (error){
            console.log(error);
        }

        routeChange();
    };

    /*
    Trying to create another button for Creating a new Account
    function handleNew(event){
        event.preventDefault();
    }
    Inside return:
    <form newAccount = {handleNew}>
                <p> Don't have an Account? <br/> </p>
                <buton type = "signUp" class= "btn-create"> Create new account</buton>
            </form>
    */

    /*
    axios.post('/api/users/login', userObject)
    .then((res) => {
        console.log(res.data)
    }).catch((error) => {
        console.log(error)
    });
    */

    return(
        <div className="container">
            <div className= "column left">
                <div className= "loginlogo">
                    <p> The Recipe </p>
                </div>
            </div>
            <div className= "column right">
                <div className="login-page">
                    <div className="header"> Sign In </div> 
                    <form onSubmit = {handleSignIn}>
                        <label required className= "inputArea" htmlFor = "usernameLogin"> User Name: </label>
                        <input 
                            type = "username" 
                            id = "exampleUsername" 
                            value = {userName} 
                            placeholder="Enter username here" 
                            onChange={(event) => setUsername(event.target.value)}> 
                        </input>
                        <p> </p>
                        <label required className= "inputArea" htmlFor = "passwordLogin"> Password: </label>
                        <input 
                            type = "password" 
                            id = "examplePassword" 
                            value = {password} 
                            placeholder="Enter password here" 
                            onChange={(event) => setPassword(event.target.value)}> 
                        </input>
                        <p> </p>
                        <button type = "submitClick" className= "submitButtonSignIn" disabled={!checkRequirements()}> Sign In</button>
                    </form>
                    <p required className="message"> Don't have an Account? </p>
                    <Link to='/createaccount'> Create new Account </Link>
                </div>
            </div>
        </div>
    );
}