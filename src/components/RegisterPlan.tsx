import React, { useEffect, useState } from "react";
import EmailAndPasswordForm from "./EmailAndPasswordForm";
import { EmailAndPasswordFormValues } from "./EmailAndPasswordForm";
import PlanHeader from "./PlanHeader";
export interface RegisterFormProps {
    onSubmit(formValues: any): void;
    authStatus?: string | null;
}

export interface RegisterPlanProps {
    signUp(formValues: any): void;
    authStatus?: string | null;
}

const RegisterPlan: React.FC<{}> = (props) => {
    const [planValues, setPlanValues] = useState({
        basic: true,
        standard: false,
        premium: false,
    });

    const onSubmitRegister = async (formValues: EmailAndPasswordFormValues) => {
        // props.signUp(formValues);
    };

    return (
        <React.Fragment>
            <PlanHeader />
            <div className="registerPlanContainer">
                <div className="registerPlanStepWrap">
                    <p>Step 1 of 2 </p>
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
                <table className="monthlyPlanContainer">
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
                                    planValues.basic ? "arrowDown" : "hideArrow"
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

                    <tr className="planRowTitle">Monthly Price</tr>
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
                    <tr className="planRowTitle">Quality</tr>
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
                    <tr className="planRowTitle">Resolution</tr>
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
                </table>
            </div>
        </React.Fragment>
    );
};
export default RegisterPlan;
