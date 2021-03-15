import React, { Fragment, useGlobal, useState } from "reactn";
import styled from "styled-components";
import { Header, Layout } from "./index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndent } from "@fortawesome/free-solid-svg-icons";
import { Divider, Drawer as AntDrawer } from "antd";
import { Link as RouterLink } from "react-router-dom";
import { colors } from "../constants/colors";
import { doSignOut } from "../firebase/auth";
import { get } from "lodash";
import { useI18n } from "../utils";
import { LanguagesMenu } from "./LanguagesMenu";

export const BaseLayout = (props) => {
  const [globalUser] = useGlobal("user");
  const [isVisibleMenu, setIsVisibleMenu] = useState(false);
  const [, setGlobalIsLoadingUser] = useGlobal("isLoadingUser");

  const i18n = useI18n();

  const adminLinks = [
    {
      name: i18n(["general", "users"]),
      url: "/users",
    },
  ];

  return (
    <Fragment>
      <Drawer
        title="Immertec"
        placement="left"
        closable={true}
        onClose={() => setIsVisibleMenu(false)}
        visible={isVisibleMenu}
      >
        {get(globalUser, "roleCode", "") === "admin" &&
          adminLinks.map((link, index) => (
            <Link
              key={index}
              onClick={() => setIsVisibleMenu(false)}
              to={link.url}
            >
              {link.name}
            </Link>
          ))}
        <Divider />
        {globalUser && (
          <Logout
            key="logout"
            onClick={async () => {
              await setGlobalIsLoadingUser(false);
              await doSignOut();
            }}
          >
            {i18n(["general", "logout"])}
          </Logout>
        )}
      </Drawer>
      <Layout>
        <Header>
          {(props.links || globalUser) && (
            <ActionButton>
              <FontAwesomeIcon
                onClick={() => setIsVisibleMenu(true)}
                icon={faIndent}
              />
            </ActionButton>
          )}
          Immertec - {props.title}
          {<LanguagesMenu />}
        </Header>
        <Body>{props.children}</Body>
      </Layout>
    </Fragment>
  );
};

const Body = styled.section`
  overflow: scroll;
  padding: 4.5rem 1rem 1rem 1rem;
  flex: 1 1 auto;
  height: 100%;
  background-color: white;

  h1 {
    margin: 0 0 1rem 0;
  }
`;

const ActionButton = styled.div`
  cursor: pointer;
  font-size: 1.5rem;
  margin-right: 1rem;
`;

const Drawer = styled(AntDrawer)`
  .ant-drawer-wrapper-body {
    background-color: ${colors.black};

    .ant-drawer-header {
      background-color: ${colors.black};

      .ant-drawer-title {
        color: white;
      }

      .ant-drawer-close {
        color: white;
      }
    }

    .ant-drawer-body {
      padding: 0;
      height: 100%;
    }
  }
`;

const Link = styled(RouterLink)`
  display: block;
  width: 100%;
  color: white;
  text-decoration: none;
  padding: 0 1rem;
  margin-top: 1rem;
`;

const Logout = styled.p`
  cursor: pointer;
  display: block;
  width: 100%;
  color: white;
  margin-top: 0;
  text-decoration: none;
  padding: 0 1rem;

  :hover {
    color: ${colors.danger};
  }
`;
