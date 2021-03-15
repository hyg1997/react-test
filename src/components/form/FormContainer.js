import styled from "styled-components";
import {responsive} from "../../constants/responsive";

export const FormContainer = styled.div`
  width: 280px;

  @media(min-width: ${responsive.tablet}) {
      width: 500px;
  }
`;
