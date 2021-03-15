import styled from "styled-components";
import {colors} from "../constants/colors";
import {get} from "lodash"

export const Button = styled.button`
  cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
  background-color: ${props => props.disabled ? "grey" : colors[get(props, "color", "primary")]};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem;
  padding: 0.5rem 1rem;
  width: fit-content;
  color: white;
  margin-bottom: 1rem;
  font-weight: bold;

  :hover {
    background-color: ${props => props.disabled ? "grey" : colors.secondary};
  }
`;
