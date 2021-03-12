import React from "react";
import { Route, Switch } from "react-router-dom";
import Browse from "./Browse";
import Search from "./Search";
import BrowseHeader from "./BrowseHeader";
const Routes: React.FC<{}> = () => {
    return (
        <React.Fragment>
            <BrowseHeader />
            <Switch>
                <Route path="/browse" exact component={Browse} />
                <Route path="/search" exact component={Search} />
            </Switch>
        </React.Fragment>
    );
};

export default Routes;
