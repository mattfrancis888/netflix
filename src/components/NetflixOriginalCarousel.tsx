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
import { AiOutlineDown, AiOutlineClose } from "react-icons/ai";
import LazyLoad from "react-lazyload";
import { useHistory } from "react-router-dom";
import useWindowDimensions from "../windowDimensions";
import { MediaAndNetflixOriginalCarouselProps } from "./Browse";
import anime from "animejs/lib/anime.es.js";
import { Media } from "actions";

//A 'hack' it would be better to implement it into a database but for simplicty sake...
const carouselImages = [
    "https://res.cloudinary.com/du8n2aa4p/image/upload/v1615385556/netflix/peaky_carousel.webp",
    "https://res.cloudinary.com/du8n2aa4p/image/upload/v1615385555/netflix/queens_carousel.webp",
    "https://res.cloudinary.com/du8n2aa4p/image/upload/v1615385555/netflix/lucifer_carousel.webp",
    "https://res.cloudinary.com/du8n2aa4p/image/upload/v1615385555/netflix/umbrella_carousel.webp",
    "https://res.cloudinary.com/du8n2aa4p/image/upload/v1615385555/netflix/blackmirror_carousel.webp",
    "https://res.cloudinary.com/du8n2aa4p/image/upload/v1615385555/netflix/disenchantment_carousel.webp",
    "https://res.cloudinary.com/du8n2aa4p/image/upload/v1615385556/netflix/arrested_carousel.webp",
    "https://res.cloudinary.com/du8n2aa4p/image/upload/v1615385556/netflix/moneyheist_carousel.webp",
];
const NetflixOriginalCarousel: React.FC<MediaAndNetflixOriginalCarouselProps> = (
    props
) => {
    const history = useHistory();
    const { width } = useWindowDimensions();
    const [style, setStyle] = useState({ opacity: "1" });

    const renderSlides = () => {
        return props.content.map((content: Media, index: number) => {
            return (
                <Slide index={index} key={content.media_id}>
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
                                src={
                                    carouselImages[index]
                                        ? carouselImages[index]
                                        : ""
                                    //content.banner_image
                                }
                                alt="carousel"
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
                                {props.onRemoveClick && (
                                    <AiOutlineClose
                                        className="removeWatchingIcon"
                                        onClick={() => {
                                            props.onRemoveClick(content);
                                        }}
                                    />
                                )}
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
                    naturalSlideHeight={200}
                    totalSlides={8}
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

export default NetflixOriginalCarousel;
