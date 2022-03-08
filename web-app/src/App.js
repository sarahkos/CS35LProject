import React from "react";
import LoginPage from "./pages/loginpage/loginpage";
import CreateAccount from "./pages/createaccount/createaccount"
import Home from "./pages/home/Home"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
    return (
        <Router> 
            <div className="App">
                <h1> Hello, Hope this works</h1>
                <Switch>
                    <Route exact path="/"> 
                        <LoginPage />
                    </Route>
                    <Route path = "/createaccount">
                        <CreateAccount />
                    </Route>
                    <Route path = "/home">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}


export default App;