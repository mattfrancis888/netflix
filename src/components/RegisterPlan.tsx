import React, { useEffect } from "react";
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
                        <td className="selectedPlan">
                            Basic
                            <div className="arrowDown"></div>
                        </td>

                        <td className="unselectedPlan">Standard</td>
                        <td className="unselectedPlan">Premium</td>
                    </tr>

                    <tr className="planRowTitle">Monthly Price</tr>
                    <tr className="monthlyRowPlanWrap">
                        <td>$9.99</td>
                        <td>$14.99</td>
                        <td>$18.99</td>
                    </tr>
                    <tr className="planRowTitle">Quality</tr>
                    <tr className="monthlyRowPlanWrap">
                        <td>Good</td>
                        <td>Better</td>
                        <td>Best</td>
                    </tr>
                    <tr className="planRowTitle">Resolution</tr>
                    <tr className="monthlyRowPlanWrap">
                        <td>480p</td>
                        <td>1080p</td>
                        <td>4k+ HDR</td>
                    </tr>
                </table>
            </div>
        </React.Fragment>
    );
};
export default RegisterPlan;
