import React, { Component } from "react";
import { connect } from "react-redux";
import { StoreState } from "../reducers";
import { History } from "history";
import { validateToken } from "../actions";
import { useLocation } from "react-router-dom";

import history from "../browserHistory";
import Modal from "./Modal";
import anime from "animejs/lib/anime.es.js";
import { MED_SCREEN_SIZE } from "../constants";
import useWindowDimensions from "../windowDimensions";
export interface iModalHoc {
    callback: any;
}
interface MyState {
    showModal: boolean;
}
const hoc = (ChildComponent: any, callback: any) => {
    class ComposedComponent extends Component<iModalHoc, MyState> {
        constructor(props: any) {
            super(props);

            this.state = {
                // "DataSource" is some global data source
                showModal: false,
            };
            //@ts-ignore
            this.callback = callback.bind(this);
        }

        renderModal() {
            if (!this.state.showModal) return null;
            else {
                return (
                    <Modal
                        content={this.renderModalContent()}
                        onDismiss={this.modalOnCancel}
                    />
                );
            }
        }

        renderModalContent() {
            return (
                <p>Hi</p>
                // <div
                //     className="modalContentContainer"
                //     onLoad={() => {
                //         if (useWindowDimensions().width < MED_SCREEN_SIZE) {
                //             anime({
                //                 targets: ".modalBox",
                //                 // Properties
                //                 // Animation Parameters
                //                 width: ["0%", "90%"],
                //                 scale: [0, 1],
                //                 duration: 750,
                //                 easing: "easeOutQuad",
                //             });
                //         } else {
                //             anime({
                //                 targets: ".modalBox",
                //                 // Properties
                //                 // Animation Parameters
                //                 width: ["0%", "80%"],
                //                 scale: [0, 1],
                //                 duration: 750,

                //                 easing: "easeOutQuad",
                //             });
                //         }
                //         anime({
                //             targets: ".modalTextSection",
                //             // Properties
                //             // Animation Parameters

                //             duration: 750,
                //             scale: [0, 1],
                //             easing: "easeOutQuad",
                //         });
                //     }}
                // >
                //     <div className="modalBannerContainer">
                //         <div className="modalBannerImageWrap">
                //             <img
                //                 src={showModalContent?.banner_image}
                //                 alt=""
                //             ></img>

                //             <div className="modalFade"></div>
                //         </div>
                //         <div className="browseBannerTitleImageAndInfoWrap">
                //             <img
                //                 src={showModalContent?.banner_title_image}
                //                 alt=""
                //             ></img>
                //             <button
                //                 className="modalWatchButton"
                //                 onClick={() => {
                //                     Number.isInteger(showModalContent?.media_id)
                //                         ? //@ts-ignore Small TS warning, too lazy to fix
                //                           addToWatching(
                //                               showModalContent?.media_id
                //                           )
                //                         : //   modalOnCancel();
                //                           alert(
                //                               "Trouble adding your movie to your watch list..."
                //                           );
                //                     modalOnCancel();
                //                 }}
                //             >
                //                 <FaPlay className="playIcon" />
                //                 Watch Now
                //             </button>
                //         </div>
                //     </div>
                //     <div className="modalInfoWrap">
                //         <div className="modalTextSection modalTextDateAndDescSection">
                //             <p className="modalMediaDate">
                //                 {showModalContent?.media_date}
                //             </p>
                //             <p className="modalMediaDesc">
                //                 {showModalContent?.media_description}
                //             </p>
                //         </div>
                //         <div className="modalTextSection modalTextCastAndGenreSection">
                //             <div className="modalCastAndGenre">
                //                 {renderGenreAndCast()}
                //             </div>
                //         </div>
                //     </div>
                // </div>
            );
        }

        modalOnCancel = () => {
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
                this.setState({ showModal: false });
            }, 450);
        };

        render() {
            return (
                <React.Fragment>
                    {this.renderModal()}
                    <ChildComponent {...this.props} />)
                </React.Fragment>
            );
        }
    }

    function mapStateToProps(state: StoreState) {
        return {
            authStatus: state.authStatus.authenticated,
        };
    }

    return connect(mapStateToProps, {})(ComposedComponent);
};

export default hoc;
