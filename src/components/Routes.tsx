import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import SignIn from "./SignIn";
import Register from "./Register";
import RegisterPlan from "./RegisterPlan";
const Routes: React.FC<{}> = () => {
    return (
        <React.Fragment>
            <Switch>
                <Route path="/" exact component={SignIn} />
                <Route path="/register" exact component={Register} />
                <Route path="/plan" exact component={RegisterPlan} />
            </Switch>
        </React.Fragment>
    );
};

export default Routes;
