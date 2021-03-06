import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import SignIn from "./Register";
const Routes: React.FC<{}> = () => {
    return (
        <React.Fragment>
            <Header />
            <Switch>
                <Route path="/" exact component={SignIn} />
            </Switch>
        </React.Fragment>
    );
};

export default Routes;
