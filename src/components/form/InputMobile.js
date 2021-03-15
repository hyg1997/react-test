import React, {forwardRef, Fragment} from "react";
import styled from "styled-components";
import {colors} from "../../constants/colors";
import {sizes} from "../../constants/sizes";
import {InputItem as AntInputItem} from "antd-mobile";

export const InputItem = forwardRef((props, ref) => {
    return (
        <Fragment>
            {
                props.label &&
                <Label required={props.required}>{props.label}</Label>
            }
            <StyledInputItem {...props}
                             hasError={props.error}
                             ref={ref}/>
            {
                props.error &&
                <Error>{props.errorMessage || props.error.message}</Error>
            }
        </Fragment>
    )
});

const StyledInputItem = styled(AntInputItem)`
  margin-bottom: 1rem !important;
  ${props => props.hasError && `
    background-color: #fff;
    border-color: ${colors.danger};
  `}
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
  margin-top: -0.5rem;
  font-size: ${sizes.font.small};
  color: ${colors.danger};
`;
