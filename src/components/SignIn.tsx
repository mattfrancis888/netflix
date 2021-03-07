import React, { useEffect } from "react";
// import netflixBgMd from "../img/netflixBgMd.jpg";
import Header from "./Header";
import SignInForm, { SignInFormValues } from "./SignInForm";

export interface SignInFormProps {
    onSubmit(formValues: any): void;
    authStatus?: string | null;
}

const SignIn: React.FC<{}> = (props) => {
    const onSubmitSignIn = async (formValues: SignInFormValues) => {
        // props.signUp(formValues);
    };

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
                <div className="signInFormContainer">
                    <SignInForm
                        onSubmit={(formValues: any) =>
                            onSubmitSignIn(formValues)
                        }
                    />
                </div>
            </div>
        </React.Fragment>
    );
};

export default SignIn;
