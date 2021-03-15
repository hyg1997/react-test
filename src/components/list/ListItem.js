import styled from "styled-components";
import {colors} from "../../constants/colors";
import {Icon} from "../index";

export const ListItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: ${colors.primary};
  margin: 0;
  border-bottom: #ECECEC 1px solid;
  font-size: 1rem;
  
  ${Icon} {
    font-size: 1.5rem;
  }
`;
