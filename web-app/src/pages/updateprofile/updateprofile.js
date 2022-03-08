import React from 'react';
import axios from 'axios';
import "./updateprofile.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const PATH_BIO = SERVER_URL + '/api/users/self/bio';
//const PATH_USER = SERVER_URL + '/api/users/:username';

export default class UpdateProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errormessage: Array(2).fill(""),
        };
    }

    handleClick() {

        const bio = document.getElementById('bioField').value;

        axios.post(PATH_BIO, bio, {withCredentials: true})
            .then((res) => {
               console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
    }

    render () {
        //var username = axios.get(PATH_USER);
        return (
            <div>
                <div className="updateprofile">
                    <div className="inputBackground">
                        <div className="updateHeader"> Update Your Profile </div>
                        <div className="textLabel"> User: test </div>
                        <form>
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