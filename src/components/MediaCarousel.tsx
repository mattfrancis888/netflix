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
import { IconContext } from "react-icons";
import LazyLoad from "react-lazyload";
import { useHistory } from "react-router-dom";

import useWindowDimensions from "../windowDimensions";

const MoviesCarousel: React.FC<{}> = (props) => {
    const history = useHistory();
    const { width } = useWindowDimensions();
    const renderCarousel = (): JSX.Element | JSX.Element[] => {
        return (
            <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={50}
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
                        >
                            <LazyLoad>
                                <div className="mediaContainerCarousel movieOne">
                                    <img
                                        src="https://occ-0-724-116.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABXKu3dDN-pDHe0IvQ4LNtbONhqii1apdDPYyIo2md7qVZ2KCD8hRNrvBsD-M2X4GXjQAezSV5LPxK-BkGw_pYfEmHrETmdk6ASeOn5GJvoBzhRCidWlrvqRJ4s8c5H0LuQ.webp?r=158"
                                        alt="movie poster"
                                    ></img>
                                </div>
                            </LazyLoad>
                        </Slide>
                        <Slide index={1}>
                            <LazyLoad>
                                <div className="mediaContainerCarousel movieTwo">
                                    <img
                                        src="https://occ-0-724-116.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABXKu3dDN-pDHe0IvQ4LNtbONhqii1apdDPYyIo2md7qVZ2KCD8hRNrvBsD-M2X4GXjQAezSV5LPxK-BkGw_pYfEmHrETmdk6ASeOn5GJvoBzhRCidWlrvqRJ4s8c5H0LuQ.webp?r=158"
                                        alt="movie poster"
                                    ></img>
                                </div>
                            </LazyLoad>
                        </Slide>
                        <Slide index={2}>
                            <LazyLoad>
                                <div className="mediaContainerCarousel movieTwo">
                                    <img
                                        src="https://occ-0-724-116.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABXKu3dDN-pDHe0IvQ4LNtbONhqii1apdDPYyIo2md7qVZ2KCD8hRNrvBsD-M2X4GXjQAezSV5LPxK-BkGw_pYfEmHrETmdk6ASeOn5GJvoBzhRCidWlrvqRJ4s8c5H0LuQ.webp?r=158"
                                        alt="movie poster"
                                    ></img>
                                </div>
                            </LazyLoad>
                        </Slide>
                    </Slider>
                    <ButtonBack className="mediaBackButton">
                        <RiArrowLeftSLine />
                    </ButtonBack>
                    <ButtonNext className="mediaNextButton">
                        <RiArrowRightSLine />
                    </ButtonNext>
                </div>
            </CarouselProvider>
        );
    };

    return <div data-testid="movieCarousel">{renderCarousel()}</div>;
};

export default MoviesCarousel;
