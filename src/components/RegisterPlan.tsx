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
                    <p>Step 1 of 3</p>
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
            </div>
        </React.Fragment>
    );
};
export default RegisterPlan;
