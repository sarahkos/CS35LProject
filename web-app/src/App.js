import React from "react";
import Home from "./pages/home/Home";
import LoginPage from "./pages/loginpage/loginpage";
import CreateAccount from "./pages/createaccount/createaccount"
<<<<<<< HEAD
=======
import UpdateProfile from "./pages/updateprofile/updateprofile"
>>>>>>> 4887d4cbd31b2ef37ab56d64fa3ab10b0b077966
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
    return (
        <Router> 
            <div className="App">
                <h1></h1>
                <Switch>
                    <Route exact path="/"> 
                        <LoginPage />
                    </Route>
                    <Route path = "/createaccount">
                        <CreateAccount />
                    </Route>
<<<<<<< HEAD
                    <Route path = "/homepage">
                        <Home />
=======
                    <Route path = "/Home">
                        <UpdateProfile />
>>>>>>> 4887d4cbd31b2ef37ab56d64fa3ab10b0b077966
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}


export default App;