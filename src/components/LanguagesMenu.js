import {Dropdown, Menu} from "antd";
import React, {useGlobal} from "reactn";
import {languages} from "../utils/i18n";
import styled from "styled-components";
import {responsive, sizes} from "../constants";
import {setLocale} from "yup";
import {yup} from "../config";

export const LanguagesMenu = () => {
    const [globalCurrentLanguageCode, setGlobalCurrentLanguageCode] = useGlobal("currentLanguageCode");

    const setCurrentLanguage = async code => {
        await setGlobalCurrentLanguageCode(code);
        setLocale(yup[code]);
        return localStorage.setItem("currentLanguageCode", code);
    };

    const currentLanguage = () => languages
        .find(language => language.code === globalCurrentLanguageCode);

    const languageMenu = (
        <Menu>
            {
                languages.map(language => (
                    <Language key={language.code}
                              onClick={() => setCurrentLanguage(language.code)}>
                        <Flag src={language.flag}/>
                        <Name>{language.name}</Name>
                    </Language>
                ))
            }
        </Menu>
    );

    return (
        <Dropdown overlay={languageMenu}
                  trigger={['click']}>
            <Trigger>
                <Flag src={currentLanguage().flag}/>
                <Name light>{currentLanguage().name}</Name>
            </Trigger>
        </Dropdown>
    )
};

const Name = styled.p`
  color: ${props => props.light ? "white" : "initial"};
  font-size: ${sizes.font.normal};
  margin: 0;
  
  @media (min-width: ${responsive.tablet}) {
    display: block !important;
  }
`;

const Trigger = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto;
  
  ${Name} {
    display: none;
  }
  
  @media (min-width: ${responsive.tablet}) {
    justify-content: space-between;
    width: 95px;
  }
`;


const Language = styled(Menu.Item)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 120px;
`;

const Flag = styled.img`
  height: ${sizes.font.large};
`;
