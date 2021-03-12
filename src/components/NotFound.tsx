import React, { useEffect } from "react";
import Header from "./Header";
const NotFound: React.FC<{}> = (props) => {
    useEffect(() => {
        document.body.style.background = "black";
    }, []);

    return (
        <React.Fragment>
            <Header />
            <div className="serverErrorContainer">
                <h3>The page you are looking for cannot be found.</h3>
            </div>
        </React.Fragment>
    );
};

export default NotFound;
