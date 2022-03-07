import React from 'react';
import "./updateprofile.css";

export default class UpdateProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errormessage: Array(2).fill(""),
        };
    }

    handleClick() {
        const username = document.getElementById("userField").value;
        const password1 = document.getElementById("passField").value;
        const password2 = document.getElementById("passField2").value;

        //ADD VALIDATION: IF USERNAME NOT UNIQUE
        //ADD VALIDATION: IF USERNAME SAME AS PREV USERNAME
        //ADD VALIDATION: PASSWORD DIFF THAN CURRENT PASSWORD
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

        //POST INPUT TO SERVER
    }

    render () {
        return (
            <div>
                <div className="updateprofile">
                    <div className="inputBackground">
                        <div className="updateHeader"> Update Your Profile </div>
                        <form>
                            <label>Change Username: </label>
                            <input id="userField" placeholder="Username" required defaultValue="testUsername" className="inputBox" />
                            {/*above, add value of current username from server*/}
                            <span className="text"> Username must be between 6 and 15 characters. </span>
                            <label className="textLabel">Change Password: </label>
                            {/*input current password? need to allow password update to go through?*/}
                            <input id="passField" type="password" 
                                placeholder="New Password" className="inputBox" />
                            <input id="passField2" type="password" 
                                placeholder="Retype New Password" className="inputBox" />
                            <label className="textLabel" >Change Bio: </label>
                            <textarea id="bioField" placeholder="Bio" className="inputBoxLarge" defaultValue="testBio" />
                            <button type="button" className="submitButton" onClick={() => this.handleClick()}>
                                 Update Profile </button>
                        </form>
                        <span className="textError"> {this.state.errormessage} </span>
                    </div>
                </div>
            </div>
        )
    }
}