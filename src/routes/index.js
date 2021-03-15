import React from "reactn";
import { Redirect, Route, Switch } from "react-router-dom";
import { Home, Login, User, Users } from "../pages";
import { PrivateRoute } from "./PrivateRoute";
import { AdminPrivateRoute } from "./AdminPrivateRoute";
import { BaseLayout } from "../components";
import { useI18n } from "../utils";

export const Routes = () => {
  const i18n = useI18n();

  return (
    <Switch>
      <Route
        exact
        path="/login"
        render={() => (
          <BaseLayout title={i18n(["general", "login"])}>
            <Login />
          </BaseLayout>
        )}
      />
      <PrivateRoute exact path="/home">
        <BaseLayout title={i18n(["general", "home"])}>
          <Home />
        </BaseLayout>
      </PrivateRoute>
      <AdminPrivateRoute exact path="/users">
        <BaseLayout title={i18n(["general", "users"])}>
          <Users />
        </BaseLayout>
      </AdminPrivateRoute>
      <AdminPrivateRoute exact path="/users/:userId">
        <BaseLayout title={i18n(["general", "editUser"])}>
          <User />
        </BaseLayout>
      </AdminPrivateRoute>
      <Redirect to="/home" />
    </Switch>
  );
};
