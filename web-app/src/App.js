import React from "react";
import Home from "./pages/home/Home";
import LoginPage from "./pages/loginpage/loginpage";
import CreateAccount from "./pages/createaccount/createaccount"
import UpdateProfile from "./pages/updateprofile/updateprofile"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
    return (
        <Router> 
            <div className="App">
                <Switch>
                    <Route exact path="/"> 
                        <LoginPage />
                    </Route>
                    <Route path = "/createaccount">
                        <CreateAccount />
<<<<<<< HEAD
                    </Route>  
                    <Route path = "/Home">
                        <Home />
=======
                    </Route>
                    <Route path = "/Home">
                        <UpdateProfile />
>>>>>>> 7108291fe855bb57bd0f06eb92e735b8fe244330
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}


export default App;