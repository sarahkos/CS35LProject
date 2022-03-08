import React from "react";
import Home from "./pages/home/Home";
import LoginPage from "./pages/loginpage/loginpage";
import CreateAccount from "./pages/createaccount/createaccount"
import Home from "./pages/home/Home"
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
=======
                    <Route path = "/home">
>>>>>>> 98a003c52ba0a7697b189ebcc02a4b1f7c3ccbf9
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}


export default App;