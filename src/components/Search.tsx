import React, { useEffect, useState } from "react";
import BrowseHeader from "./BrowseHeader";
import history from "../browserHistory";
import MediaCarousel from "./MediaCarousel";
import NetflixOriginalCarousel from "./NetflixOriginalCarousel";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Modal from "./Modal";
import requireAuth from "./requireAuth";
import anime from "animejs/lib/anime.es.js";
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
import useWindowDimensions from "../windowDimensions";
import { MED_SCREEN_SIZE } from "../constants";
import MediaContent from "./MediaContent";

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
    const { width } = useWindowDimensions();

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
        } else if (props.medias.data?.medias && props.watching.data?.watching) {
            let movies = _.filter(props.medias.data?.medias, {
                media_type_name: "Movie",
            });
            let moviesContentSplit = _.chunk(movies, 8);

            let netflixOrig = _.filter(props.medias.data?.medias, {
                media_type_name: "Netflix Original",
            });
            let netflixOrigSplit = _.chunk(netflixOrig, 8);

            let tvShows = _.filter(props.medias.data?.medias, {
                media_type_name: "TV",
            });
            let tvShowsSplit = _.chunk(tvShows, 8);

            return (
                <React.Fragment>
                    {tvShows.map((content, index) => {
                        return (
                            <div className="searchResultContentWrap">
                                <MediaContent
                                    content={content}
                                    index={index}
                                    onMediaClick={addToWatching}
                                    modalShow={modalShow}
                                />
                            </div>
                        );
                    })}
                </React.Fragment>
            );
        } else if (!props.medias.data && !props.watching.data) {
            return (
                <div className="loadingCenter">
                    <Loading />
                </div>
            );
        }
    };

    const [showModal, setShowModal] = useState(false);
    const [showModalContent, setShowModalContent] = useState<Media | null>(
        null
    );

    const addToWatching = (clickedMediaId: number) => {
        try {
            props.insertMediaWatchingByUser(clickedMediaId);
            alert(
                `Let's pretend that you are watching your show / movie! It's now added to 'Continue Watching' on the homepage. You can remove it from 'Currently Watching' by hovering over it.`
            );
        } catch {
            // alert("Error");
        }
    };

    const modalShow = (clickedMedia: Media) => {
        setShowModal(true);
        setShowModalContent({ ...clickedMedia });
        props.fetchMediaGenreAndCast(clickedMedia.media_id);
    };
    const modalOnCancel = () => {
        anime({
            targets: ".modalBox",
            // Properties
            // Animation Parameters
            width: "0%",
            scale: [1, 0],
            duration: 450,

            easing: "easeOutQuad",
        });
        anime({
            targets: ".modalTextSection",
            // Properties
            // Animation Parameters
            width: "0%",
            duration: 10,

            easing: "easeOutQuad",
        });
        setTimeout(() => {
            setShowModal(false);
        }, 450);
    };
    const renderModal = () => {
        if (!showModal) return null;
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
            <div
                className="modalContentContainer"
                onLoad={() => {
                    if (width < MED_SCREEN_SIZE) {
                        anime({
                            targets: ".modalBox",
                            // Properties
                            // Animation Parameters
                            width: ["0%", "90%"],
                            scale: [0, 1],
                            duration: 750,
                            easing: "easeOutQuad",
                        });
                    } else {
                        anime({
                            targets: ".modalBox",
                            // Properties
                            // Animation Parameters
                            width: ["0%", "80%"],
                            scale: [0, 1],
                            duration: 750,

                            easing: "easeOutQuad",
                        });
                    }
                    anime({
                        targets: ".modalTextSection",
                        // Properties
                        // Animation Parameters

                        duration: 750,
                        scale: [0, 1],
                        easing: "easeOutQuad",
                    });
                }}
            >
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
                        <button
                            className="modalWatchButton"
                            onClick={() => {
                                Number.isInteger(showModalContent?.media_id)
                                    ? //@ts-ignore Small TS warning, too lazy to fix
                                      addToWatching(showModalContent?.media_id)
                                    : //   modalOnCancel();
                                      alert(
                                          "Trouble adding your movie to your watch list..."
                                      );
                                modalOnCancel();
                            }}
                        >
                            <FaPlay className="playIcon" />
                            Watch Now
                        </button>
                    </div>
                </div>
                <div className="modalInfoWrap">
                    <div className="modalTextSection modalTextDateAndDescSection">
                        <p className="modalMediaDate">
                            {showModalContent?.media_date}
                        </p>
                        <p className="modalMediaDesc">
                            {showModalContent?.media_description}
                        </p>
                    </div>
                    <div className="modalTextSection modalTextCastAndGenreSection">
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

            <div className="floatBrowseHeader">
                <BrowseHeader />
            </div>

            <div className="searchResultContainer">{renderMedias()}</div>
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
})(requireAuth(Browse));
