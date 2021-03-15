import React, {setGlobal, useEffect, useGlobal, useState} from "reactn";
import {setLocale} from "yup";
import {yup} from "../config";
import moment from "moment"
import "moment/locale/es";

export const withConfiguration = Component => () => {
    const [globalCurrentConfig] = useGlobal("currentConfig");
    const [isLoadingConfig, setIsLoadingConfig] = useState(true);

    useEffect(() => {
        const initializeConfig = async () => {
            const currentLanguageCode = localStorage.getItem("currentLanguageCode") || "es";

            await setGlobal({
                currentLanguageCode,
                user: null,
                register: null,
                isLoadingCreateUser: false,
                isLoadingUser: false,
                isLoadingFacebookAuth: false,
                currentConfig: {}
            });

            setLocale(yup[currentLanguageCode]);
            moment.locale(currentLanguageCode);
        };

        !globalCurrentConfig && initializeConfig();
        setIsLoadingConfig(false);
    }, [globalCurrentConfig]);

    return isLoadingConfig
        ? null
        : <Component/>
};
