import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import SignIn from "./SignIn";
import Register from "./Register";
import RegisterPlan from "./RegisterPlan";
import Browse from "./Browse";
import Search from "./Search";
import BrowseHeader from "./BrowseHeader";
import NotFound from "./NotFound";
import { useLocation } from "react-router-dom";

const inclusionArray = ["/browse", "/search"];

const Routes: React.FC<{}> = () => {
    // console.log(inclusionArray.indexOf(useLocation().pathname));
    return (
        <React.Fragment>
            {inclusionArray.indexOf(useLocation().pathname) > -1 && (
                <BrowseHeader />
            )}
            <Switch>
                <Route path="/" exact component={SignIn} />
                <Route path="/register" exact component={Register} />
                <Route path="/plan" exact component={RegisterPlan} />
                <Route path="/browse" exact component={Browse} />
                <Route path="/search" exact component={Search} />
                <Route component={NotFound} />
            </Switch>
        </React.Fragment>
    );
};

export default Routes;
