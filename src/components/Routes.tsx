import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import SignIn from "./SignIn";
import Register from "./Register";
const Routes: React.FC<{}> = () => {
    return (
        <React.Fragment>
            <Header />
            <Switch>
                <Route path="/" exact component={SignIn} />
                <Route path="/register" exact component={Register} />
            </Switch>
        </React.Fragment>
    );
};

export default Routes;
