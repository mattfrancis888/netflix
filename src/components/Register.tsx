import React, { useEffect } from "react";
import Header from "./Header";
const Register: React.FC<{}> = (props) => {
    return (
        <React.Fragment>
            <Header />

            <div className="registerContainer">
                <div className="registerBanner">
                    <div className="registerIntroTextAndButtonWrap">
                        <h1>Unlimited movies, TV shows, and more.</h1>
                        <h3>Watch anywhere. Cancel anytime.</h3>
                        <h3>
                            Ready to watch? Enter your email to create or
                            restart your membership.
                        </h3>
                        <button
                            className="registerButton"
                            data-testid="registerNowButton"
                        >
                            Register Now
                        </button>
                    </div>
                    <div className="registerBackgroundWrap">
                        <img
                            src="https://assets.nflxext.com/ffe/siteui/vlv3/70deccb9-9b6c-4be1-b781-18dd1bcd9264/4b02774c-a587-43ec-b7e4-fdaf1170f261/CA-en-20210301-popsignuptwoweeks-perspective_alpha_website_small.jpg"
                            srcSet="https://assets.nflxext.com/ffe/siteui/vlv3/70deccb9-9b6c-4be1-b781-18dd1bcd9264/4b02774c-a587-43ec-b7e4-fdaf1170f261/CA-en-20210301-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/70deccb9-9b6c-4be1-b781-18dd1bcd9264/4b02774c-a587-43ec-b7e4-fdaf1170f261/CA-en-20210301-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/70deccb9-9b6c-4be1-b781-18dd1bcd9264/4b02774c-a587-43ec-b7e4-fdaf1170f261/CA-en-20210301-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w"
                            alt=""
                        ></img>

                        <div className="registerFade"></div>
                    </div>
                </div>

                <div className="registerSectionWrap">
                    <div className="registerSectionTitleWrap">
                        <h1>Download your shows to watch offline.</h1>
                        <h3>
                            Save your favorites easily and always have something
                            to watch.
                        </h3>
                    </div>
                    <div className="tvContainer">
                        <img
                            className="registerSectionImg"
                            src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png"
                            alt="tv"
                        ></img>

                        <video
                            className="tvVidContent"
                            autoPlay={true}
                            playsInline={false}
                            muted={true}
                            loop={true}
                        >
                            <source
                                src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v"
                                type="video/mp4"
                            />
                        </video>
                    </div>
                </div>

                <div className="registerSectionWrap">
                    <div className="registerSectionTitleWrap">
                        <h1>Enjoy On Your Tv.</h1>
                        <h3>
                            Watch on Smart TVs, Playstation, Xbox, Chromecast,
                            Apple TV, Blu-ray players, and more.
                        </h3>
                    </div>
                    <div className="registerSectionImgWrap">
                        <img
                            className="registerSectionImg"
                            src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg"
                            alt="tv"
                        ></img>
                    </div>
                    <div className="tvContainer"></div>
                </div>

                <div className="registerSectionWrap">
                    <div className="registerSectionTitleWrap">
                        <h1>Watch everywhere.</h1>
                        <h3>
                            Stream unlimited movies and TV shows on your phone,
                            tablet, laptop, and TV without paying more.
                        </h3>
                    </div>
                    <div className="tvContainer">
                        <img
                            className="registerSectionImg"
                            src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png"
                            alt="tv"
                        />
                        <video
                            className="watchEverywhereTVContent"
                            autoPlay={true}
                            playsInline={false}
                            muted={true}
                            loop={true}
                        >
                            <source
                                src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices.m4v"
                                type="video/mp4"
                            />
                        </video>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Register;
