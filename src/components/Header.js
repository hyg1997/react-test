import styled from "styled-components";
import {colors} from "../constants/colors";
import {sizes} from "../constants/sizes";
import {responsive} from "../constants/responsive";

export const Header = styled.header`
  height: 3.5rem;
  position: fixed;
  z-index: 99;
  grid-area: header;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: ${colors.primary};
  color: white;
  font-size: ${sizes.font.normal};
  font-weight: bold;
  padding: 0 1rem;
  
  @media(min-width: ${responsive.tablet}) {
    font-size: ${sizes.font.large};
    font-weight: normal;
  }
`;
