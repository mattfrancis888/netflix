import React from "react";
import { Router } from "react-router-dom";
import history from "../browserHistory";
import Routes from "./Routes";
import BrowseAndSearchRoutes from "./BrowseAndSearchRoutes";

const App: React.FC<{}> = () => {
    history.listen((_) => {
        window.scrollTo(0, 0);
    });
    return (
        <Router history={history}>
            <Routes />
            <BrowseAndSearchRoutes />
        </Router>
    );
};

export default App;
