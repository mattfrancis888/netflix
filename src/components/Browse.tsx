import React, { useEffect } from "react";
import BrowseHeader from "./BrowseHeader";
import history from "../browserHistory";
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
                <div className="mediaRowWrap">
                    <div className="mediaContainer">
                        <img src="https://occ-0-724-116.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABXKu3dDN-pDHe0IvQ4LNtbONhqii1apdDPYyIo2md7qVZ2KCD8hRNrvBsD-M2X4GXjQAezSV5LPxK-BkGw_pYfEmHrETmdk6ASeOn5GJvoBzhRCidWlrvqRJ4s8c5H0LuQ.webp?r=158"></img>
                    </div>
                    <div className="mediaContainer">
                        <img src="https://occ-0-724-116.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABXKu3dDN-pDHe0IvQ4LNtbONhqii1apdDPYyIo2md7qVZ2KCD8hRNrvBsD-M2X4GXjQAezSV5LPxK-BkGw_pYfEmHrETmdk6ASeOn5GJvoBzhRCidWlrvqRJ4s8c5H0LuQ.webp?r=158"></img>
                    </div>
                    <div className="mediaContainer">
                        <img src="https://occ-0-724-116.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABXKu3dDN-pDHe0IvQ4LNtbONhqii1apdDPYyIo2md7qVZ2KCD8hRNrvBsD-M2X4GXjQAezSV5LPxK-BkGw_pYfEmHrETmdk6ASeOn5GJvoBzhRCidWlrvqRJ4s8c5H0LuQ.webp?r=158"></img>
                    </div>
                    <div className="mediaContainer">
                        <img src="https://occ-0-724-116.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABXKu3dDN-pDHe0IvQ4LNtbONhqii1apdDPYyIo2md7qVZ2KCD8hRNrvBsD-M2X4GXjQAezSV5LPxK-BkGw_pYfEmHrETmdk6ASeOn5GJvoBzhRCidWlrvqRJ4s8c5H0LuQ.webp?r=158"></img>
                    </div>
                </div>

                <h3>TV Shows</h3>
                <div className="mediaRowWrap"></div>

                <h3>Popular On Netflix</h3>
                <div className="mediaRowWrap"></div>

                <h3>Netflix Originals</h3>
                <div className="mediaRowWrap"></div>
            </div>
        </React.Fragment>
    );
};

export default Browse;
