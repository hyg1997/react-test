import React, {Fragment, useState} from "react";
import {Modal, Upload as AntUpload} from "antd";
import styled from "styled-components";
import {sizes} from "../../constants/sizes";
import {colors} from "../../constants/colors";
import uuid from "uuid";
import {Button} from "./Button";
import {Icon} from "../Icon";
import {faDownload, faPlus} from "@fortawesome/free-solid-svg-icons";
import {get} from "lodash";
import {useI18n} from "../../utils";

export const Upload = props => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [fileList, setFileList] = useState(props.defaultValue
        ? [
            {
                name: "thumbImageUrl.jpg",
                thumbUrl: props.defaultValue,
                uid: uuid()
            }
        ]
        : []);

    const i18n = useI18n();

    const onChange = info => {
        const uploadFileList = [...info.fileList];
        console.log(uploadFileList);

        setFileList(uploadFileList.slice(-1));
    };

    return (
        <Fragment>
            <Modal
                onCancel={() => setPreviewVisible(false)}
                style={{textAlign: "center"}}
                visible={previewVisible}
                title={i18n(["general", "preview"])}
                footer={
                    [
                        <Button key="download"
                                width="150px"
                                onClick={() => window.open(get(fileList, "[0].thumbUrl", null), "_blank")}>
                            <Icon icon={faDownload}/>
                            {i18n(["general", "download"])}
                        </Button>
                    ]
                }
            >
                <img src={get(fileList, "[0].thumbUrl", null)}
                     alt="thumbImage"/>
            </Modal>
            <UploadContainer>
                {
                    props.label &&
                    <Label required={props.required}>
                        {props.label}
                    </Label>
                }
                <StyledUpload {...props}
                              onChange={onChange}
                              onPreview={() => setPreviewVisible(true)}
                              fileList={fileList}>
                    <Button disabled={props.disabled}>
                        <Icon icon={faPlus}/>
                        {i18n(["general", "image"])}
                    </Button>
                </StyledUpload>
                {
                    props.error &&
                    <Error>
                        {props.error.message}
                    </Error>
                }
            </UploadContainer>
        </Fragment>
    );
};

const UploadContainer = styled.div`
  margin-bottom: 1rem;
`;

const StyledUpload = styled(AntUpload)`
  .ant-upload-list-item-card-actions {
    padding-right: 1rem; 
  }
  .ant-upload-list-item-error {
    color: initial;
    border-color: initial;
  }
  .ant-upload-list-item-name {
    color: initial;
  }
  .ant-upload-list {
    width: 300px;
  }
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

