import React, { useEffect, useState } from "react";
import anime from "animejs/lib/anime.es.js";
import { AiOutlineDown, AiOutlineClose } from "react-icons/ai";
import { Media } from "../actions";
import LazyLoad from "react-lazyload";
interface MediaProps {
    content: Media;
    index: number;
    onMediaClick: any;
    onRemoveClick?: any;
    modalShow: any;
}
const MediaContent: React.FC<MediaProps> = (props) => {
    return (
        // <LazyLoad>
        <div
            className={`mediaContainerCarousel mediaAnime${props.index}`}
            onLoad={() => {
                anime({
                    targets: `.mediaAnime${props.index}`,
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
            <img src={props.content.banner_image} alt="movie poster"></img>
            <div className="mediaOutlineDownContainer">
                <div
                    className="clickForWatch"
                    onClick={() => props.onMediaClick(props.content.media_id)}
                ></div>
                <div
                    className="outlineDownWrap "
                    onClick={() => {
                        props.modalShow(props.content);
                    }}
                >
                    <AiOutlineDown className="outlineDown" />
                </div>
                {props.onRemoveClick && (
                    <AiOutlineClose
                        className="removeWatchingIcon"
                        onClick={() => {
                            props.onRemoveClick(props.content);
                        }}
                    />
                )}
            </div>
        </div>
        // </LazyLoad>
    );
};

export default MediaContent;
