import styled from "styled-components";
import {Button as AntButton} from "antd";
import {get} from "lodash";

export const Button = styled(AntButton)`
  text-transform: uppercase;
  margin-right: 1rem;
  width: ${props => get(props, "width", "100px")};
  height: 50px;
`;
