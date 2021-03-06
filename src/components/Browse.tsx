import React, { useEffect, useState } from "react";
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
import { useTransition, animated, useSpring } from "react-spring";
const avengersBannerData = {
    media_id: 12,
    media_title: "Avengers: Infinity War",
    media_date: 2018,
    media_description:
        "An all-star lineup of superheroes -- including Iron Man, the Incredible Hulk and Captain America -- team up to save the world from certain doom.",
    banner_title_image:
        "https://res.cloudinary.com/du8n2aa4p/image/upload/v1615345142/netflix/logo/avengers_logo.webp",
    banner_image:
        "https://res.cloudinary.com/du8n2aa4p/image/upload/v1615384076/netflix/avengers_infinity.webp",
    name_tokens: "'aveng':1 'infin':2 'war':3",
    media_type_name: "Movie",
};

export interface ModalProps {
    onDismiss(): void;
    title?: string;
    content?: JSX.Element;
    actions?: JSX.Element;
    animation?: any;
    fade?: any;
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
    const [showModal, setShowModal] = useState(false);
    const [firstRender, setFirstRender] = useState(true);

    const [showModalContent, setShowModalContent] = useState<Media | null>(
        null
    );

    const transition = useTransition(showModal, {
        from: {
            transform: showModal ? "scale(0)" : "scale(1)",
        },
        enter: {
            transform: showModal ? "scale(1)" : "scale(0)",
        },

        config: {
            duration: 450,
        },
    });

    const fade = useSpring({
        from: {
            backgroundColor: showModal
                ? "rgba(52, 49, 49, 0)"
                : "rgba(52, 49, 49, 0.4)",
            pointerEvents: showModal ? "all" : "none",
        },
        to: {
            backgroundColor: showModal
                ? "rgba(52, 49, 49, 0.4)"
                : "rgba(52, 49, 49, 0)",
            pointerEvents: showModal ? "all" : "none",
        },
    });

    const { width } = useWindowDimensions();

    useEffect(() => {
        document.body.style.background = "black";
        props.fetchMedias();
        props.fetchMediaWatchingByUser();
    }, []);

    useEffect(() => {}, []);

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
                    <div
                        className={
                            props.watching.data?.watching.length > 0
                                ? "continueWatchingShow"
                                : "continueWatchingHide"
                        }
                    >
                        <h3 className="carouselTitle">Continue Watching</h3>
                        <MediaCarousel
                            content={props.watching.data?.watching}
                            modalShow={modalShow}
                            onMediaClick={addToWatching}
                            onRemoveClick={removeFromWatching}
                        />
                    </div>

                    <h3 className="carouselTitle">Popular On Netflix</h3>
                    <MediaCarousel
                        onMediaClick={addToWatching}
                        content={moviesContentSplit[0]}
                        modalShow={modalShow}
                    />
                    <h3 className="carouselTitle">Movies Loved By Many</h3>
                    <MediaCarousel
                        onMediaClick={addToWatching}
                        content={moviesContentSplit[1]}
                        modalShow={modalShow}
                    />

                    <h3 className="carouselTitle">Netflix Originals</h3>
                    <NetflixOriginalCarousel
                        onMediaClick={addToWatching}
                        content={netflixOrigSplit[0]}
                        modalShow={modalShow}
                    />

                    <h3 className="carouselTitle">TV Shows</h3>
                    <MediaCarousel
                        onMediaClick={addToWatching}
                        content={tvShowsSplit[0]}
                        modalShow={modalShow}
                    />
                </React.Fragment>
            );
        } else if (!props.medias.data && !props.watching.data) {
            return (
                <div className="loadingCenter">
                    <Loading />
                </div>
            );
        }

        //This block would appear in testing
        else if (props.medias.data?.medias) {
            return (
                <div>
                    <p>{props.medias.data?.medias[0].media_title}</p>
                    {/* <p>{props.watching.data?.watching[0].media_title}</p> */}
                </div>
            );
        }
        //This block will not appear in testing,  I believe it's because the API tries to read the cookie
        // } else if (props.watching.data?.watching) {
        //     return (
        //         <div>
        //             <p>Hi</p>
        //             {/* <p>{props.watching.data?.watching[0].media_title}</p> */}
        //         </div>
        //     );
        // }
    };

    const [bannerHeightAuto, setBannerHeightAuto] = useState(false);

    const addToWatching = (clickedMediaId: number) => {
        try {
            props.insertMediaWatchingByUser(clickedMediaId);
            alert(
                `Let's pretend that you are watching your show / movie! It's now added to 'Continue Watching' on the top of the page. You can remove it from 'Currently Watching' by hovering over it.`
            );
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
        setFirstRender(false);
        setShowModal(true);
        setShowModalContent({ ...clickedMedia });
        props.fetchMediaGenreAndCast(clickedMedia.media_id);
    };
    const modalOnCancel = () => {
        setShowModal(false);
    };
    const renderModal = () => {
        return transition((style, item) => {
            if (!firstRender)
                return (
                    <Modal
                        animation={style}
                        fade={fade}
                        content={renderModalContent()}
                        onDismiss={modalOnCancel}
                    />
                );
            else {
                <Modal
                    content={renderModalContent()}
                    onDismiss={modalOnCancel}
                />;
            }
        });
    };

    const renderModalContent = () => {
        return (
            <div className="modalContentContainer" onLoad={() => {}}>
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
                                    if (
                                        props.mediaGenreAndCast.data?.casts
                                            .length ===
                                        index + 1
                                    )
                                        return ` ${actor.actor_first_name}  ${actor.actor_last_name}`;
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
                                    if (
                                        props.mediaGenreAndCast.data?.genres
                                            .length ===
                                        index + 1
                                    )
                                        return ` ${genre.genre_name}`;
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
                <div
                    className={
                        bannerHeightAuto
                            ? `browseBannerImageWrap browseBannerImageWrapHeightAuto`
                            : `browseBannerImageWrap browseBannerImageWrapTempHeight`
                    }
                    onLoad={() => {
                        setBannerHeightAuto(true);
                        anime({
                            targets: ".browseBannerImageWrap",
                            // Properties
                            // Animation Parameters

                            opacity: [
                                {
                                    value: [0, 1],
                                    duration: 1000,
                                    easing: "easeOutQuad",
                                },
                            ],
                        });
                    }}
                >
                    <img
                        src="https://res.cloudinary.com/du8n2aa4p/image/upload/v1615345150/netflix/logo/avengers_banner.jpg"
                        alt="banner"
                    ></img>

                    <div className="registerFade"></div>
                </div>
                <div className="browseBannerTitleImageAndInfoWrap">
                    <img
                        className="animeBannerTitle"
                        src="https://res.cloudinary.com/du8n2aa4p/image/upload/v1615345142/netflix/logo/avengers_logo.webp"
                        onLoad={() => {
                            anime({
                                targets: ".animeBannerTitle",
                                // Properties
                                // Animation Parameters

                                opacity: [
                                    {
                                        value: [0, 1],
                                        duration: 500,
                                        easing: "easeOutQuad",
                                    },
                                ],
                            });
                        }}
                        alt="banner title"
                    ></img>
                    <p>{avengersBannerData.media_description}</p>
                    <div className="bannerButtonWrap">
                        <button
                            className="bannerButton"
                            onClick={() =>
                                addToWatching(avengersBannerData.media_id)
                            }
                        >
                            <FaPlay className="bannerButtonIcon" />
                            Watch Now
                        </button>
                        <button
                            className="bannerButton bannerButtonInfo"
                            onClick={() => {
                                modalShow(avengersBannerData);
                            }}
                        >
                            <AiOutlineInfoCircle className="bannerButtonIcon " />
                            More Info
                        </button>
                    </div>
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
