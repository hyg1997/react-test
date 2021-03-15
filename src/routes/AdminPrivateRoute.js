import React, {useGlobal} from "reactn";
import {Redirect, Route} from "react-router-dom";
import {get} from "lodash";

export const AdminPrivateRoute = props => {
    const [globalUser] = useGlobal("user");

    return (
        <Route exact
               path={props.path}
               render={() => get(globalUser, "roleCode", "") === "admin"
                   ? props.children
                   : <Redirect to="/home"/>}
        />
    );
};
