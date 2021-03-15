import styled from "styled-components";
import {Select as AntSelect} from "antd";
import React, {Fragment} from "react";
import {sizes} from "../../constants/sizes";
import {colors} from "../../constants/colors";


export const Select = props => (
    <Fragment>
        {props.label && <Label required={props.required}>{props.label}</Label>}
        <StyledSelect {...props}>
            {props.children}
        </StyledSelect>
        {props.error && <Error>{props.error.message}</Error>}
    </Fragment>
);

const StyledSelect = styled(AntSelect)`
  width: ${props => props.width || "100%"} !important;
  margin-bottom: 1rem !important;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: ${sizes.font.normal};
  
  ${props => props.required && `
    ::before {
        display: inline-block;
        margin-right: 4px;
        color: #f5222d;
        font-size: 14px;
        line-height: 1;
        content: "*";
    }
  `}
`;

const Error = styled.p`
  font-size: ${sizes.font.small};
  color: ${colors.danger};
`;
