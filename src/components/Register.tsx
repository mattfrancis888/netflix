import React, { useEffect } from "react";
import Header from "./Header";
import { signUp } from "../actions";
import { StoreState } from "../reducers";
import { connect } from "react-redux";
import history from "../browserHistory";
import netflixBgMd from "../img/netflixBgMd.jpg";
import netflixBgLg from "../img/netflixBgLg.jpg";
import netflixTV1 from "../img/netflixTV1.png";
import netflixPhone from "../img/netflixPhone.jpg";
import netflixTV2 from "../img/netflixTV2.png";
import anime from "animejs/lib/anime.es.js";
export interface RegisterProps {
    authStatus?: string | null;
}
const Register: React.FC<RegisterProps> = (props) => {
    useEffect(() => {
        document.body.style.background = "black";
        if (props.authStatus) {
            history.push("/browse");
        }
    }, []);
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
                            onClick={() => {
                                history.push("/plan");
                            }}
                        >
                            Register Now
                        </button>
                    </div>
                    <div className="registerBackgroundWrap">
                        {/* <img
                            src="https://assets.nflxext.com/ffe/siteui/vlv3/70deccb9-9b6c-4be1-b781-18dd1bcd9264/4b02774c-a587-43ec-b7e4-fdaf1170f261/CA-en-20210301-popsignuptwoweeks-perspective_alpha_website_small.jpg"
                            srcSet="https://assets.nflxext.com/ffe/siteui/vlv3/70deccb9-9b6c-4be1-b781-18dd1bcd9264/4b02774c-a587-43ec-b7e4-fdaf1170f261/CA-en-20210301-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/70deccb9-9b6c-4be1-b781-18dd1bcd9264/4b02774c-a587-43ec-b7e4-fdaf1170f261/CA-en-20210301-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/70deccb9-9b6c-4be1-b781-18dd1bcd9264/4b02774c-a587-43ec-b7e4-fdaf1170f261/CA-en-20210301-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w"
                            alt=""
                        ></img> */}

                        <img
                            className="animeRegisterBackgroundImage"
                            src={netflixBgLg}
                            srcSet={`${netflixBgMd} 750w, ${netflixBgLg} 1000w`}
                            alt=""
                            onLoad={() => {
                                anime({
                                    targets: ".animeRegisterBackgroundImage",
                                    // Properties
                                    // Animation Parameters
                                    opacity: [0, 1],
                                    duration: 750,
                                    easing: "easeOutQuad",
                                });
                            }}
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
                    <div
                        className="tvContainer tvAnime1"
                        onLoad={() => {
                            anime({
                                targets: ".tvAnime1",
                                // Properties
                                // Animation Parameters
                                opacity: [0, 1],
                                duration: 500,
                                easing: "easeOutQuad",
                            });
                        }}
                    >
                        <img
                            className="registerSectionImg"
                            src={netflixTV1}
                            alt="tv"
                        ></img>

                        <video
                            className="tvVidContent"
                            autoPlay={true}
                            playsInline={false}
                            muted={true}
                            loop={true}
                        >
                            {/* <source
                                src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v"
                                type="video/mp4"
                            /> */}
                            <source
                                src="https://res.cloudinary.com/du8n2aa4p/video/upload/v1615582922/netflix/netflixTV1vid.mp4"
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
                            src={netflixPhone}
                            alt="tv"
                            onLoad={() => {
                                anime({
                                    targets: ".registerSectionImg",
                                    // Properties
                                    // Animation Parameters
                                    opacity: [0, 1],
                                    duration: 500,
                                    easing: "easeOutQuad",
                                });
                            }}
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
                    <div
                        className="tvContainer tvAnime2"
                        onLoad={() => {
                            anime({
                                targets: ".tvAnime2",
                                // Properties
                                // Animation Parameters
                                opacity: [0, 1],
                                duration: 500,
                                easing: "easeOutQuad",
                            });
                        }}
                    >
                        <img
                            className="registerSectionImg"
                            src={netflixTV2}
                            alt="tv"
                        />
                        <video
                            className="watchEverywhereTVContent"
                            autoPlay={true}
                            playsInline={false}
                            muted={true}
                            loop={true}
                        >
                            {/* <source
                                src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices.m4v"
                                type="video/mp4"
                            /> */}

                            <source
                                src="https://res.cloudinary.com/du8n2aa4p/video/upload/v1615583272/netflix/netflixTV2vid.mp4"
                                type="video/mp4"
                            />
                        </video>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state: StoreState) => {
    return {
        authStatus: state.authStatus.authenticated,
    };
};
export default connect(mapStateToProps, { signUp })(Register);
