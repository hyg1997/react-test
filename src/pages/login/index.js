import React, {useGlobal, useMemo} from "reactn";
import {useHistory} from "react-router-dom";
import {Container} from "../../components";
import {LoginForm} from "./LoginForm";
import {RegisterForm} from "./RegisterForm";

export const Login = () => {
    const [globalUser] = useGlobal("user");
    const history = useHistory();

    useMemo(() => {
        if (globalUser) return history.push("/home");
    }, [globalUser, history]);

    return (
        <Container>
            <LoginForm/>
            <RegisterForm/>
        </Container>
    );
};
