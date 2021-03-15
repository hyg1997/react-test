import React, {forwardRef, Fragment, useEffect, useState} from "react";
import {Icon} from "../Icon";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components";
import {colors} from "../../constants/colors";
import {sizes} from "../../constants/sizes";

export const Input = forwardRef((props, ref) => {
    const [hide, setHide] = useState(false);

    const inputType = () => {
        if (props.type === "password") {
            return hide ? "password" : "text";
        }
        return props.type;
    };

    useEffect(() => {
        if (props.type === "password") setHide(true);
    }, [props.type]);

    return (
        <Fragment>
            {props.label && <Label required={props.required}>{props.label}</Label>}
            <InputContainer>
                <StyledInput {...props} hasError={props.error}
                             ref={ref}
                             type={inputType()}/>
                {props.type === "password" &&
                <StyledIcon icon={hide ? faEye : faEyeSlash}
                            onClick={() => setHide(!hide)}/>}
            </InputContainer>
            {props.error && <Error>{props.errorMessage || props.error.message}</Error>}
        </Fragment>
    )
});


const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledIcon = styled(Icon)`
  position: absolute;
  right: 0;
  bottom: 50%;
`;

const StyledInput = styled.input`
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
