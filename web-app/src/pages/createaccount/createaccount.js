import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import "./createaccount.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const PATH_NEWUSER = SERVER_URL + '/api/users';

export default class CreateAccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errormessage: Array(2).fill(""),
            redirect: false,
        };
    }

    handleClick() {
        const username = document.getElementById("userField").value;
        const password1 = document.getElementById("passField").value;
        const password2 = document.getElementById("passField2").value;

        var messages = Array(2).fill("");
        var success = true;
        if (username.length < 6 || username.length > 15)
        {
            messages[0] = "**Username must be between 6 and 15 characters.\n"
            success = false;

        }
        if (password1 !== password2) {
            messages[1] = "**Passwords do not match.\n"
            success = false;
        }
        if (!success) {
            this.setState({
                errormessage: messages,
            });
            return;
        } else {
            this.setState({
                errormessage: Array(2).fill(""),
            });
        }

        const userObject = {username: username, password: password1};

        axios.post(PATH_NEWUSER, userObject)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });

        this.setState({redirect: true})
    }

    renderRedirect() {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }

    render () {
        return (
            <div>
                <div className="createaccount">
                    <div className="inputBackground">
                        <div className="createHeader"> Create Your Account </div>
                        <form>
                            <input id="userField" placeholder="Username" required className="inputBox" />
                            <span className="text"> Username must be between 6 and 15 characters. </span>
                            <input id="passField" type="password" 
                                placeholder="Password" required className="inputBox" />
                            <input id="passField2" type="password" 
                                placeholder="Retype Password" required className="inputBox" />
                            <button type="button" className="submitButton" onClick={() => this.handleClick()}>
                                 Create Account </button>
                        </form>
                        {this.renderRedirect()}
                        <span className="textError"> {this.state.errormessage} </span>
                    </div>
                </div>
            </div>
        )
    }
}