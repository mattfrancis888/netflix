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
import anime from "animejs/lib/anime.es.js";
import { Media } from "actions";
const MediaCarousel: React.FC<MediaAndNetflixOriginalCarouselProps> = (
    props
) => {
    const history = useHistory();
    const { width } = useWindowDimensions();
    const [style, setStyle] = useState({ opacity: "1" });

    const renderSlides = () => {
        return props.content.map((content: Media, index: number) => {
            return (
                <Slide
                    index={index}
                    key={content.media_id}
                    // onClick={() =>
                    //     history.push(
                    //         `movies/${props.movies[0].movie_name_for_url}`
                    //     )
                    // }
                    //https://occ-0-724-116.1.nflxso.net/dnm/api/v6/ifCRgpXJMAE_puF509EDR7a7mqU/AAAABQmL45nJNIgGUsePchJnmY393Y14AergOtZVaVI3rltbnmzm6T2gZBSvXoubVUAiWuTkxHef1gZl6aFLqtHbNgDftai1nBu71ee6_DcyPRanQC9hCrTMlr8ugA0C_GYJAErHVhNwbOs9Qh1lJ7fKG8Fv7wMkeJUodUn-KCcZCJ03EKrSywDWh7INCxatzrb-Ur21KVas.webp?r=187
                >
                    <LazyLoad>
                        <div
                            className={`mediaContainerCarousel mediaAnime${index}`}
                            onLoad={() => {
                                anime({
                                    targets: `.mediaAnime${index}`,
                                    // Properties
                                    // Animation Parameters

                                    opacity: [
                                        {
                                            value: [0, 1],
                                            duration: 250,
                                            easing: "easeOutQuad",
                                        },
                                    ],
                                });
                            }}
                        >
                            <img
                                src={content.banner_image}
                                alt="movie poster"
                            ></img>
                            <div className="mediaOutlineDownContainer">
                                <div
                                    className="clickForWatch"
                                    onClick={() => props.onMediaClick(content)}
                                ></div>
                                <div
                                    className="outlineDownWrap "
                                    onClick={() => {
                                        props.modalShow(content);
                                    }}
                                >
                                    <AiOutlineDown className="outlineDown" />
                                </div>
                            </div>
                        </div>
                    </LazyLoad>
                </Slide>
            );
        });
    };
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
                        <Slider>{renderSlides()}</Slider>
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
