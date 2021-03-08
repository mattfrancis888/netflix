import React, { useEffect, useState } from "react";
import {
    CarouselProvider,
    Slider,
    Slide,
    ButtonBack,
    ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import { AiOutlineDown } from "react-icons/ai";
import LazyLoad from "react-lazyload";
import { useHistory } from "react-router-dom";

import useWindowDimensions from "../windowDimensions";
import { MediaAndNetflixOriginalCarouselProps } from "./Browse";
const MediaCarousel: React.FC<MediaAndNetflixOriginalCarouselProps> = (
    props
) => {
    const history = useHistory();
    const { width } = useWindowDimensions();
    const [style, setStyle] = useState({ opacity: "1" });

    const renderCarousel = (): JSX.Element | JSX.Element[] => {
        return (
            <div
                onMouseEnter={(e) => {
                    setStyle({ opacity: "1" });
                }}
                onMouseLeave={(e) => {
                    setStyle({ opacity: "0" });
                }}
            >
                <CarouselProvider
                    naturalSlideWidth={100}
                    naturalSlideHeight={55}
                    totalSlides={5}
                    className="mediaCarouselWrap"
                    visibleSlides={width < 900 ? 3 : 5}
                    infinite={true}
                >
                    <div className="sliderAndButtonWrap">
                        <Slider>
                            <Slide
                                index={0}
                                // onClick={() =>
                                //     history.push(
                                //         `movies/${props.movies[0].movie_name_for_url}`
                                //     )
                                // }
                                //https://occ-0-724-116.1.nflxso.net/dnm/api/v6/ifCRgpXJMAE_puF509EDR7a7mqU/AAAABQmL45nJNIgGUsePchJnmY393Y14AergOtZVaVI3rltbnmzm6T2gZBSvXoubVUAiWuTkxHef1gZl6aFLqtHbNgDftai1nBu71ee6_DcyPRanQC9hCrTMlr8ugA0C_GYJAErHVhNwbOs9Qh1lJ7fKG8Fv7wMkeJUodUn-KCcZCJ03EKrSywDWh7INCxatzrb-Ur21KVas.webp?r=187
                            >
                                <LazyLoad>
                                    <div className="mediaContainerCarousel">
                                        <img
                                            src="https://occ-0-724-116.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABXKu3dDN-pDHe0IvQ4LNtbONhqii1apdDPYyIo2md7qVZ2KCD8hRNrvBsD-M2X4GXjQAezSV5LPxK-BkGw_pYfEmHrETmdk6ASeOn5GJvoBzhRCidWlrvqRJ4s8c5H0LuQ.webp?r=158"
                                            alt="movie poster"
                                        ></img>
                                        <div className="mediaOutlineDownContainer">
                                            <div className="outlineDownWrap">
                                                <AiOutlineDown
                                                    className="outlineDown"
                                                    onClick={() => {
                                                        props.modalShow();
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </LazyLoad>
                            </Slide>
                            <Slide index={1}>
                                <LazyLoad>
                                    <div className="mediaContainerCarousel">
                                        <img
                                            src="https://occ-0-724-116.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABXKu3dDN-pDHe0IvQ4LNtbONhqii1apdDPYyIo2md7qVZ2KCD8hRNrvBsD-M2X4GXjQAezSV5LPxK-BkGw_pYfEmHrETmdk6ASeOn5GJvoBzhRCidWlrvqRJ4s8c5H0LuQ.webp?r=158"
                                            alt="movie poster"
                                        ></img>
                                        <div className="mediaOutlineDownContainer">
                                            <div className="outlineDownWrap">
                                                <AiOutlineDown
                                                    className="outlineDown"
                                                    onClick={() => {
                                                        props.modalShow();
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </LazyLoad>
                            </Slide>
                            <Slide index={2}>
                                <LazyLoad>
                                    <div className="mediaContainerCarousel">
                                        <img
                                            src="https://occ-0-724-116.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABXKu3dDN-pDHe0IvQ4LNtbONhqii1apdDPYyIo2md7qVZ2KCD8hRNrvBsD-M2X4GXjQAezSV5LPxK-BkGw_pYfEmHrETmdk6ASeOn5GJvoBzhRCidWlrvqRJ4s8c5H0LuQ.webp?r=158"
                                            alt="movie poster"
                                        ></img>
                                        <div className="mediaOutlineDownContainer">
                                            <div className="outlineDownWrap">
                                                <AiOutlineDown
                                                    className="outlineDown"
                                                    onClick={() => {
                                                        props.modalShow();
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </LazyLoad>
                            </Slide>
                        </Slider>
                        <ButtonBack className="mediaBackButton" style={style}>
                            <RiArrowLeftSLine />
                        </ButtonBack>
                        <ButtonNext className="mediaNextButton" style={style}>
                            <RiArrowRightSLine />
                        </ButtonNext>
                    </div>
                </CarouselProvider>
            </div>
        );
    };

    return <div>{renderCarousel()}</div>;
};

export default MediaCarousel;
