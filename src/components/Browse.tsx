import React, { useEffect } from "react";
import BrowseHeader from "./BrowseHeader";
import history from "../browserHistory";
import MediaCarousel from "./MediaCarousel";
import useWindowDimensions from "../windowDimensions";

const Browse: React.FC<{}> = (props) => {
    return (
        <React.Fragment>
            <div className="browseBannerContainer">
                <div className="floatBrowseHeader">
                    <BrowseHeader artistName="Netflix" />
                </div>
                <div className="browseBannerImageWrap">
                    <img
                        src="https://wallpaperaccess.com/full/4674.jpg"
                        alt=""
                    ></img>
                </div>
            </div>
            <div className="browseContainer">
                <h3>Continue Watching</h3>
                <MediaCarousel />
                <h3>TV Shows</h3>

                <h3>Popular On Netflix</h3>

                <h3>Netflix Originals</h3>
                <div className="mediaRowWrap"></div>
            </div>
        </React.Fragment>
    );
};

export default Browse;
