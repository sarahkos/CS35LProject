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
=======
                    </Route>  
                    <Route path = "/Home">
                        <Home />
>>>>>>> 2e25dd70d7aeb45f452ec1ccce553038cf381b7e
                    </Route>
                    <Route path='/updateprofile'>
                        <UpdateProfile />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}


export default App;