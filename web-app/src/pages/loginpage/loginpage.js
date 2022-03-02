import React, {useState} from "react";
import "./loginpage"

//still need to make an authentication that connects with the actual backend
//need to make css page to format the design of the login page

export default function LoginPage(){
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    //const [errorMessage, setErrorMessage] = useState("");

    function checkRequirements(){
        return userName.length >= 6 && userName.length <= 15;
    }

    function handleSignIn(event){
        event.preventDefault();
        //Empty the Input Boxes on the Login Page after Sign In
        setUsername('');
        setPassword('');
    }

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

    return(
        <div className="login-page">
            <h1> Sign In </h1>
            <form onSubmit = {handleSignIn}>
                <label for = "usernameLogin"> User Name: </label>
                <input 
                    type = "username" 
                    id = "exampleUsername" 
                    value = {userName} 
                    placeholder="Enter username here" 
                    onChange={(event) => setUsername(event.target.value)}> 
                </input>
                <p> </p>
                <label for = "passwordLogin"> Password: </label>
                <input 
                    type = "password" 
                    id = "examplePassword" 
                    value = {password} 
                    placeholder="Enter password here" 
                    onChange={(event) => setPassword(event.target.value)}> 
                </input>
                <p> </p>
                <button type = "submitClick" disabled={!checkRequirements()}> Sign In</button>
            </form>
                <p> Don't have an Account? <br/>
                {/* Try to get buttton to work*/}
                <a href="#"> Create new Account </a>
                </p>
        </div>
    );
}