import React, { useEffect, useState } from "react";
import BrowseHeader from "./BrowseHeader";
import history from "../browserHistory";
import MediaCarousel from "./MediaCarousel";
import NetflixOriginalCarousel from "./NetflixOriginalCarousel";
import { FaPlay } from "react-icons/fa";
import Modal from "./Modal";
import requireAuth from "./requireAuth";
import {
    fetchMedias,
    Media,
    fetchMediaGenreAndCast,
    fetchMediaWatchingByUser,
    insertMediaWatchingByUser,
    removeMediaWatchingByUser,
} from "../actions";
import { connect } from "react-redux";
import { StoreState } from "../reducers";
import { MediaStateResponse } from "../reducers/mediasReducer";
import Loading from "./Loading";
import { ErrorStateResponse } from "reducers/errorReducer";
import _ from "lodash";
import { MediaGenreAndCastStateResponse } from "reducers/mediaGenreAndCastReducer";
import { WatchingStateResponse } from "reducers/watchingReducer";
export interface ModalProps {
    onDismiss(): void;
    title?: string;
    content?: JSX.Element;
    actions?: JSX.Element;
}

export interface MediaAndNetflixOriginalCarouselProps {
    modalShow: any;
    content: Media[];
    onMediaClick: any;
    onRemoveClick?: any;
    // content: any;
}

interface BrowseProps {
    medias: MediaStateResponse;
    mediaGenreAndCast: MediaGenreAndCastStateResponse;
    watching: WatchingStateResponse;
    errors: ErrorStateResponse;
    fetchMedias(): void;
    fetchMediaGenreAndCast(mediaId: number): void;
    fetchMediaWatchingByUser(): void;
    insertMediaWatchingByUser(mediaId: number): void;
    removeMediaWatchingByUser(mediaId: number): void;
}

const Browse: React.FC<BrowseProps> = (props) => {
    useEffect(() => {
        document.body.style.background = "black";
        props.fetchMedias();
        props.fetchMediaWatchingByUser();
    }, []);

    const renderMedias = () => {
        if (props.errors.data?.error) {
            return (
                <div className="serverErrorContainer">
                    <h3 className="serverErrorText">
                        {props.errors.data?.error}
                    </h3>
                </div>
            );
        } else if (!props.medias.data && !props.watching.data) {
            return (
                <div className="loadingCenter">
                    <Loading />
                </div>
            );
        } else if (props.medias.data?.medias && props.watching.data?.watching) {
            let mediaContentSplit = _.chunk(props.medias.data?.medias, 3);

            return (
                <React.Fragment>
                    {props.watching.data?.watching.length > 0 && (
                        <React.Fragment>
                            <h3 className="carouselTitle">Continue Watching</h3>
                            <MediaCarousel
                                // content={
                                //     _.chunk(props.watching.data?.watching, 3)[0]
                                // }
                                content={props.watching.data?.watching}
                                modalShow={modalShow}
                                onMediaClick={addToWatching}
                                onRemoveClick={removeFromWatching}
                            />
                        </React.Fragment>
                    )}
                    <h3 className="carouselTitle">Popular On Netflix</h3>
                    <MediaCarousel
                        onMediaClick={addToWatching}
                        content={mediaContentSplit[0]}
                        modalShow={modalShow}
                    />
                    <h3 className="carouselTitle">Netflix Originals</h3>
                    {/* <NetflixOriginalCarousel modalShow={() => modalShow()} /> */}

                    <h3 className="carouselTitle">TV Shows</h3>
                    {/* <MediaCarousel modalShow={() => modalShow()} /> */}
                </React.Fragment>
            );
        }
    };

    const [showFilterModal, setShowFilterModal] = useState(false);
    const [showModalContent, setShowModalContent] = useState<Media | null>(
        null
    );

    const addToWatching = (clickedMedia: Media) => {
        try {
            props.insertMediaWatchingByUser(clickedMedia.media_id);
            // alert("Success");
        } catch {
            // alert("Error");
        }
    };

    const removeFromWatching = (clickedMedia: Media) => {
        try {
            props.removeMediaWatchingByUser(clickedMedia.media_id);
            // alert("Success");
        } catch {
            // alert("Error");
        }
    };

    const modalShow = (clickedMedia: Media) => {
        setShowFilterModal(true);
        setShowModalContent({ ...clickedMedia });
        props.fetchMediaGenreAndCast(clickedMedia.media_id);
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
                        <img src={showModalContent?.banner_image} alt=""></img>

                        <div className="modalFade"></div>
                    </div>
                    <div className="browseBannerTitleImageAndInfoWrap">
                        <img
                            src={showModalContent?.banner_title_image}
                            alt=""
                        ></img>
                        <button className="modalWatchButton">
                            <FaPlay className="playIcon" />
                            Watch Now
                        </button>
                    </div>
                </div>
                <div className="modalInfoWrap">
                    <div className="modalTextSection">
                        <p className="modalMediaDate">
                            {showModalContent?.media_date}
                        </p>
                        <p className="modalMediaDesc">
                            {showModalContent?.media_description}
                        </p>
                    </div>
                    <div className="modalTextSection">
                        <div className="modalCastAndGenre">
                            {renderGenreAndCast()}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderGenreAndCast = () => {
        if (!props.mediaGenreAndCast) {
            return (
                <React.Fragment>
                    <div className="modalMediaCastWrap">
                        <p className="modalGreyTextInfo">Cast: </p>
                        <p>Loading</p>
                    </div>
                    <div className="modalMediaGenreWrap">
                        <p className="modalGreyTextInfo">Genres: </p>
                        <p>Loading</p>
                    </div>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <div className="modalMediaCastWrap">
                        <p className="modalGreyTextInfo">Cast: </p>
                        <p>
                            {props.mediaGenreAndCast.data?.casts.map(
                                (actor, index) => {
                                    return ` ${actor.actor_first_name}  ${actor.actor_last_name},`;
                                }
                            )}
                        </p>
                    </div>
                    <div className="modalMediaGenreWrap">
                        <p className="modalGreyTextInfo">Genres: </p>
                        <p>
                            {props.mediaGenreAndCast.data?.genres.map(
                                (genre, index) => {
                                    return ` ${genre.genre_name},`;
                                }
                            )}
                        </p>
                    </div>
                </React.Fragment>
            );
        }
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
        mediaGenreAndCast: state.mediaGenreAndCast,
        watching: state.watching,
        errors: state.errors,
    };
};

export default connect(mapStateToProps, {
    fetchMedias,
    fetchMediaGenreAndCast,
    fetchMediaWatchingByUser,
    insertMediaWatchingByUser,
    removeMediaWatchingByUser,
})(requireAuth(Browse));
