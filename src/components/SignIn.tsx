import React, { useEffect } from "react";
// import netflixBgMd from "../img/netflixBgMd.jpg";
import Header from "./Header";
import SignInForm, { SignInFormValues } from "./SignInForm";
import history from "../browserHistory";
import { signIn } from "../actions";
import { StoreState } from "../reducers";
import { connect } from "react-redux";
export interface SignInFormProps {
    onSubmit(formValues: any): void;
    authStatus?: string | null;
}

export interface SignInProps {
    signIn(formValues: any): void;
    authStatus?: string | null;
}

const SignIn: React.FC<SignInProps> = (props) => {
    const onSubmitSignIn = async (formValues: SignInFormValues) => {
        props.signIn(formValues);
    };
    useEffect(() => {
        //If user is already logged in, they should be unable to visit this page
        if (props.authStatus) {
            history.push("/browse");
        }
    }, []);

    return (
        <React.Fragment>
            <Header />
            <div className="signInContainer">
                <div className="signInBackgroundWrap">
                    <img
                        src="https://assets.nflxext.com/ffe/siteui/vlv3/70deccb9-9b6c-4be1-b781-18dd1bcd9264/4b02774c-a587-43ec-b7e4-fdaf1170f261/CA-en-20210301-popsignuptwoweeks-perspective_alpha_website_small.jpg"
                        srcSet="https://assets.nflxext.com/ffe/siteui/vlv3/70deccb9-9b6c-4be1-b781-18dd1bcd9264/4b02774c-a587-43ec-b7e4-fdaf1170f261/CA-en-20210301-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/70deccb9-9b6c-4be1-b781-18dd1bcd9264/4b02774c-a587-43ec-b7e4-fdaf1170f261/CA-en-20210301-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/70deccb9-9b6c-4be1-b781-18dd1bcd9264/4b02774c-a587-43ec-b7e4-fdaf1170f261/CA-en-20210301-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w"
                        alt=""
                    ></img>
                    <div className="signInFade"></div>
                </div>
                <div className="signInFormContainer" data-testid="signInBox">
                    <SignInForm
                        onSubmit={(formValues: any) =>
                            onSubmitSignIn(formValues)
                        }
                    />
                    <div className="newToNetflixWrap">
                        <p className="newToNetflixText">New to Netflix? </p>
                        <p
                            className="signUpNowText"
                            onClick={() => {
                                history.push("/register");
                            }}
                        >
                            Sign up now
                        </p>
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

export default connect(mapStateToProps, { signIn })(SignIn);
