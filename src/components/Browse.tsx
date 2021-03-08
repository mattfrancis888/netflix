import React, { useEffect } from "react";
import BrowseHeader from "./BrowseHeader";
import history from "../browserHistory";
import MediaCarousel from "./MediaCarousel";
import NetflixOriginalCarousel from "./NetflixOriginalCarousel";
import useWindowDimensions from "../windowDimensions";
import { FaPlay } from "react-icons/fa";
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

                    <div className="registerFade"></div>
                </div>
                <div className="browseBannerTitleImageAndInfoWrap">
                    <img src="https://occ-0-724-116.1.nflxso.net/dnm/api/v6/tx1O544a9T7n8Z_G12qaboulQQE/AAAABTk2XN7GLRTLHV9pVLOUV7ZWdTgnQqitxdYryNH-ZwAkyO2vJRtwtlrgt1_iDdjZQrOJ0E_BN1NdSFtWQm4L7qmxDs2we2VVen4.webp?r=5b7"></img>
                    <p>
                        An all-star lineup of superheroes -- including Iron Man,
                        the Incredible Hulk and Captain America -- team up to
                        save the world from certain doom.
                    </p>
                    <button className="watchButton">
                        <FaPlay className="playIcon" />
                        Watch Now
                    </button>
                </div>
            </div>
            <div className="browseContainer">
                <h3>Continue Watching</h3>
                <MediaCarousel />
                <h3>TV Shows</h3>
                <MediaCarousel />
                <h3>Netflix Originals</h3>
                <NetflixOriginalCarousel />
                <h3>Popular On Netflix</h3>
                <MediaCarousel />

                <div className="mediaRowWrap"></div>
            </div>
        </React.Fragment>
    );
};

export default Browse;
