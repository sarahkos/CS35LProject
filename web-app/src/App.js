import React from "react";
import Home from "./pages/home/Home";
import LoginPage from "./pages/loginpage/loginpage";
import CreateAccount from "./pages/createaccount/createaccount"
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
                    <Route path = "/homepage">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}


export default App;