import React, { useEffect, useState } from "react";
import BrowseHeader from "./BrowseHeader";
import history from "../browserHistory";
import MediaCarousel from "./MediaCarousel";
import NetflixOriginalCarousel from "./NetflixOriginalCarousel";
import { FaPlay } from "react-icons/fa";
import Modal from "./Modal";
import requireAuth from "./requireAuth";
import { fetchMedias, Media } from "../actions";
import { connect } from "react-redux";
import { StoreState } from "../reducers";
import { MediaStateResponse } from "../reducers/mediasReducer";
import Loading from "./Loading";
import { ErrorStateResponse } from "reducers/errorReducer";
import _ from "lodash";
export interface ModalProps {
    onDismiss(): void;
    title?: string;
    content?: JSX.Element;
    actions?: JSX.Element;
}

export interface MediaAndNetflixOriginalCarouselProps {
    modalShow: any;
    // content: Media[];
    content: Media[];
}

interface BrowseProps {
    medias: MediaStateResponse;
    errors: ErrorStateResponse;
    fetchMedias(): void;
}

const Browse: React.FC<BrowseProps> = (props) => {
    const renderMedias = () => {
        if (props.errors.data?.error) {
            return (
                <div className="serverErrorContainer">
                    <h3 className="serverErrorText">
                        {props.errors.data?.error}
                    </h3>
                </div>
            );
        } else if (!props.medias.data?.medias) {
            return (
                <div className="loadingCenter">
                    <Loading />
                </div>
            );
        } else {
            let mediaContentSplit = _.chunk(props.medias.data?.medias, 3);
            return (
                <React.Fragment>
                    <h3 className="carouselTitle">Continue Watching</h3>
                    <MediaCarousel
                        content={mediaContentSplit[0]}
                        modalShow={() => modalShow()}
                    />
                    <h3 className="carouselTitle">TV Shows</h3>
                    {/* <MediaCarousel modalShow={() => modalShow()} /> */}
                    <h3 className="carouselTitle">Netflix Originals</h3>
                    {/* <NetflixOriginalCarousel modalShow={() => modalShow()} /> */}
                    <h3 className="carouselTitle">Popular On Netflix</h3>
                    {/* <MediaCarousel modalShow={() => modalShow()} /> */}
                </React.Fragment>
            );
        }
    };
    useEffect(() => {
        props.fetchMedias();
        document.body.style.background = "black";
    }, []);
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
                    <BrowseHeader />
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

            <div className="browseContainer">{renderMedias()}</div>
        </React.Fragment>
    );
};

const mapStateToProps = (state: StoreState) => {
    return {
        medias: state.medias,
        errors: state.errors,
    };
};

export default connect(mapStateToProps, { fetchMedias })(requireAuth(Browse));
