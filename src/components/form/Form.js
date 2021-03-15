import React, {useEffect} from "react";
import {useGlobal} from "reactn";

export const Form = props => {
    const [globalCurrentLanguageCode] = useGlobal("currentLanguageCode");

    useEffect(() => {
        const {clearError, triggerValidation} = props;

        const updateErrors = async () => {
            await triggerValidation();
            clearError();
        };

        updateErrors();
    }, [globalCurrentLanguageCode]);

    return (
        <form {...props} noValidate>
            {props.children}
        </form>
    );
};
