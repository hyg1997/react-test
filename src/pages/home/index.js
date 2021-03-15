import React, { Fragment, useGlobal } from "reactn";
import { get } from "lodash";
import { useI18n } from "../../utils";
import { Button, Icon } from "../../components";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

export const Home = () => {
  const history = useHistory();
  const [globalUser] = useGlobal("user");

  const i18n = useI18n();

  return (
    <Fragment>
      <h1>
        {i18n(["home", "welcome"])} {get(globalUser, "firstName", "")}{" "}
        {get(globalUser, "lastName", "")}
      </h1>
      <Button onClick={() => history.push(`users/${globalUser.id}`)}>
        <Icon icon={faEdit} />
        {i18n(["general", "profile"])}
      </Button>
    </Fragment>
  );
};
