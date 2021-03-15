import React, {forwardRef, Fragment} from "react";
import styled from "styled-components";
import {colors} from "../../constants/colors";
import {sizes} from "../../constants/sizes";
import {Switch as AntSwitch} from "antd";

export const Switch = forwardRef((props, ref) => {
    return (
        <Fragment>
            {
                props.label &&
                <Label required={props.required}>{props.label}</Label>
            }
            <SwitchContainer>
                <StyledSwitch {...props}
                              ref={ref}/>
            </SwitchContainer>
            {
                props.error &&
                <Error>{props.errorMessage || props.error.message}</Error>
            }
        </Fragment>
    )
});

const SwitchContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledSwitch = styled(AntSwitch)`
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
