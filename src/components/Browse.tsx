import React, { useEffect, useState } from "react";
import BrowseHeader from "./BrowseHeader";
import history from "../browserHistory";
import MediaCarousel from "./MediaCarousel";
import NetflixOriginalCarousel from "./NetflixOriginalCarousel";
import useWindowDimensions from "../windowDimensions";
import { FaPlay } from "react-icons/fa";
import Modal from "./Modal";
export interface ModalProps {
    onDismiss(): void;
    title?: string;
    content: JSX.Element;
    actions?: JSX.Element;
}

export interface MediaAndNetflixOriginalCarouselProps {
    modalShow: any;
}
const Browse: React.FC<{}> = (props) => {
    const [showFilterModal, setShowFilterModal] = useState(false);
    const modalShow = () => {
        setShowFilterModal(true);
    };
    const modalOnCancel = () => {
        setShowFilterModal(false);
    };
    const renderModal = () => {
        if (!showFilterModal) return null;
        else {
            return (
                <Modal
                    content={renderModalContent()}
                    onDismiss={modalOnCancel}
                />
            );
        }
    };

    const renderModalContent = () => {
        return (
            <div className="modalContentContainer">
                <div className="modalBannerContainer">
                    <div className="modalBannerImageWrap">
                        <img
                            src="https://wallpaperaccess.com/full/4674.jpg"
                            alt=""
                        ></img>

                        <div className="modalFade"></div>
                    </div>
                    <div className="browseBannerTitleImageAndInfoWrap">
                        <img src="https://occ-0-724-116.1.nflxso.net/dnm/api/v6/tx1O544a9T7n8Z_G12qaboulQQE/AAAABTk2XN7GLRTLHV9pVLOUV7ZWdTgnQqitxdYryNH-ZwAkyO2vJRtwtlrgt1_iDdjZQrOJ0E_BN1NdSFtWQm4L7qmxDs2we2VVen4.webp?r=5b7"></img>
                        <p>
                            An all-star lineup of superheroes -- including Iron
                            Man, the Incredible Hulk and Captain America -- team
                            up to save the world from certain doom.
                        </p>
                        <button className="modalWatchButton">
                            <FaPlay className="playIcon" />
                            Watch Now
                        </button>
                    </div>
                </div>
                <div className="modalInfoWrap">
                    <div className="modalTextSection">
                        <p className="modalMediaDate">2015</p>
                        <p className="modalMediaDesc">Description of media</p>
                    </div>
                    <div className="modalTextSection">
                        <div className="modalCastAndGenre">
                            <div className="modalMediaCastWrap">
                                <p className="modalGreyTextInfo">Cast: </p>
                                <p>Name, more</p>
                            </div>
                            <div className="modalMediaGenreWrap">
                                <p className="modalGreyTextInfo">Genres: </p>
                                <p>Action</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <React.Fragment>
            {renderModal()}
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
                <MediaCarousel modalShow={() => modalShow()} />
                <h3>TV Shows</h3>
                <MediaCarousel modalShow={() => modalShow()} />
                <h3>Netflix Originals</h3>
                <NetflixOriginalCarousel modalShow={() => modalShow()} />
                <h3>Popular On Netflix</h3>
                <MediaCarousel modalShow={() => modalShow()} />

                <div className="mediaRowWrap"></div>
            </div>
        </React.Fragment>
    );
};

export default Browse;
