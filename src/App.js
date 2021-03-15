import React, {Fragment} from "reactn";
import {BrowserRouter} from "react-router-dom";
import {Routes} from "./routes";
import {withAuthentication} from "./hoc";
import {createGlobalStyle} from "styled-components";

const App = () => {
    const GlobalStyle = createGlobalStyle`
      body {
        margin: 0;
      }
      
      .ReactVirtualized__Grid{
        :focus {
          outline: none;
        }
      }
    `;

    return (
        <Fragment>
            <GlobalStyle/>
            <BrowserRouter>
                <Routes/>
            </BrowserRouter>
        </Fragment>
    );
};

export default withAuthentication(App);
