import styled from "styled-components";
import {responsive} from "../constants/responsive";

export const Container = styled.section`  
  @media(min-width: ${responsive.tablet}) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: auto;
    width: 75%;
  }
`;
