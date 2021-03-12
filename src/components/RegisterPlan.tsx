import React, { useEffect, useState } from "react";
import EmailAndPasswordForm from "./EmailAndPasswordForm";
import { EmailAndPasswordFormValues } from "./EmailAndPasswordForm";
import PlanHeader from "./PlanHeader";
import { BsCheck } from "react-icons/bs";
import history from "../browserHistory";
import { signUp } from "../actions";
import { connect } from "react-redux";
import { StoreState } from "../reducers";
export interface RegisterFormProps {
    onSubmit(formValues: any): void;
    authStatus?: string | null;
}

export interface RegisterPlanProps {
    signUp(formValues: any): void;
    authStatus?: string | null;
}

const RegisterPlan: React.FC<RegisterPlanProps> = (props) => {
    const [step1ButtonClicked, setStep1ButtonClicked] = useState(false);

    useEffect(() => {
        document.body.style.background = "white";
        if (props.authStatus) {
            history.push("/browse");
        }
    }, []);

    const [planValues, setPlanValues] = useState({
        basic: true,
        standard: false,
        premium: false,
    });

    useEffect(() => {
        if (props.authStatus) {
            setStep1ButtonClicked(true);
        }
    }, [props.authStatus]);

    const onSubmitRegister = async (formValues: EmailAndPasswordFormValues) => {
        props.signUp(formValues);
    };

    return (
        <React.Fragment>
            <PlanHeader />
            <div className="registerPlanContainer">
                <div
                    className="registerPlanStepWrap"
                    style={step1ButtonClicked ? { display: "none" } : {}}
                >
                    <p data-testid="step1">Step 1 of 2 </p>
                    <h1 className="planTitle">Welcome back!</h1>
                    <h1 className="planTitle">Joining Netflix is easy.</h1>
                    <h3>
                        Enter your password and you'll be watching in no time.
                    </h3>
                    <EmailAndPasswordForm
                        onSubmit={(formValues: any) =>
                            onSubmitRegister(formValues)
                        }
                    />
                </div>
                <div
                    className={
                        step1ButtonClicked
                            ? "monthlyPlanContainer"
                            : "hideMonthlyPlanContainer"
                    }
                >
                    <div className="registerMonthlyPlanTextWrap">
                        <p data-testid="step2">Step 2 of 2 </p>
                        <ul>
                            <li>
                                <BsCheck className="checkMark" /> Watch all you
                                want. Ad-free.
                            </li>
                            <li>
                                <BsCheck className="checkMark" />{" "}
                                Recommendations just for you.
                            </li>
                            <li>
                                <BsCheck className="checkMark" /> Change or
                                cancel your plan anytime.
                            </li>
                        </ul>
                    </div>
                    <table data-testid="monthlyPlanTable">
                        <tbody>
                            <tr className="monthlyRowPlanWrap">
                                <td
                                    className={
                                        planValues.basic
                                            ? "selectedPlan"
                                            : "unselectedPlan"
                                    }
                                    onClick={() => {
                                        setPlanValues({
                                            basic: true,
                                            standard: false,
                                            premium: false,
                                        });
                                    }}
                                >
                                    Basic
                                    <div
                                        className={
                                            planValues.basic
                                                ? "arrowDown"
                                                : "hideArrow"
                                        }
                                    ></div>
                                </td>

                                <td
                                    className={
                                        planValues.standard
                                            ? "selectedPlan"
                                            : "unselectedPlan"
                                    }
                                    onClick={() => {
                                        setPlanValues({
                                            basic: false,
                                            standard: true,
                                            premium: false,
                                        });
                                    }}
                                >
                                    Standard
                                    <div
                                        className={
                                            planValues.standard
                                                ? "arrowDown"
                                                : "hideArrow"
                                        }
                                    ></div>
                                </td>
                                <td
                                    className={
                                        planValues.premium
                                            ? "selectedPlan"
                                            : "unselectedPlan"
                                    }
                                    onClick={() => {
                                        setPlanValues({
                                            basic: false,
                                            standard: false,
                                            premium: true,
                                        });
                                    }}
                                >
                                    Premium
                                    <div
                                        className={
                                            planValues.premium
                                                ? "arrowDown"
                                                : "hideArrow"
                                        }
                                    ></div>
                                </td>
                            </tr>

                            <tr className="planRowTitle">
                                <td>Monthly Price</td>
                            </tr>
                            <tr className="monthlyRowPlanWrap">
                                <td
                                    className={
                                        planValues.basic
                                            ? "monthlyPlanSelected"
                                            : "monthlyPlanUnselected"
                                    }
                                >
                                    $9.99
                                </td>
                                <td
                                    className={
                                        planValues.standard
                                            ? "monthlyPlanSelected"
                                            : "monthlyPlanUnselected"
                                    }
                                >
                                    $14.99
                                </td>
                                <td
                                    className={
                                        planValues.premium
                                            ? "monthlyPlanSelected"
                                            : "monthlyPlanUnselected"
                                    }
                                >
                                    $18.99
                                </td>
                            </tr>
                            <tr className="planRowTitle">
                                <td>Quality</td>
                            </tr>
                            <tr className="monthlyRowPlanWrap">
                                <td
                                    className={
                                        planValues.basic
                                            ? "monthlyPlanSelected"
                                            : "monthlyPlanUnselected"
                                    }
                                >
                                    Good
                                </td>
                                <td
                                    className={
                                        planValues.standard
                                            ? "monthlyPlanSelected"
                                            : "monthlyPlanUnselected"
                                    }
                                >
                                    Better
                                </td>
                                <td
                                    className={
                                        planValues.premium
                                            ? "monthlyPlanSelected"
                                            : "monthlyPlanUnselected"
                                    }
                                >
                                    Best
                                </td>
                            </tr>
                            <tr className="planRowTitle">
                                <td>Resolution</td>
                            </tr>
                            <tr className="monthlyRowPlanWrap">
                                <td
                                    className={
                                        planValues.basic
                                            ? "monthlyPlanSelected"
                                            : "monthlyPlanUnselected"
                                    }
                                >
                                    480p
                                </td>
                                <td
                                    className={
                                        planValues.standard
                                            ? "monthlyPlanSelected"
                                            : "monthlyPlanUnselected"
                                    }
                                >
                                    1080p
                                </td>
                                <td
                                    className={
                                        planValues.premium
                                            ? "monthlyPlanSelected"
                                            : "monthlyPlanUnselected"
                                    }
                                >
                                    4k+ HDR
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button
                        className="authButton"
                        data-testid="planContinueButton"
                        onClick={() => {
                            history.push("/browse");
                        }}
                    >
                        Continue
                    </button>
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
export default connect(mapStateToProps, { signUp })(RegisterPlan);
