import { React, useState } from "react";
import styled from "styled-components";

// icon

// elements
import Image from "../elements/Image";

import { ReactComponent as ProfileEditIcon } from "../assets/icon/profileEdit.svg";

const ImageUpload = ({ file, setFile, profileImage }) => {
  let currentSelectedFile = file.file;
  let currentSelectedImage = profileImage;
  if (file.previewURL) currentSelectedImage = file.previewURL;

  const handleChangeImageFile = (e) => {
    let imageFile = e.target.files[0]; // 파일이 선택되었을 때 어떤 파일이 선택되었는지를 가리키는 객체

    setFile({
      file: imageFile ? imageFile : currentSelectedFile,
      previewURL: imageFile
        ? URL.createObjectURL(imageFile)
        : currentSelectedImage,
    });
  };

  return (
    <>
      <LabelBox>
        <Image shape="circle" size="large" src={currentSelectedImage} />
        {/* 플러스아이콘 */}
        <EditButtonInner>
          <ProfileEditIcon />
        </EditButtonInner>
        <InputFile
          type="file"
          // accept="image/jpg, impge/png, image/jpeg, image/gif"
          accept="image/*"
          onChange={handleChangeImageFile}
        />
      </LabelBox>
    </>
  );
};

const LabelBox = styled.label`
  cursor: pointer;
`;

const EditButtonInner = styled.div`
  position: absolute;

  right: 0;
  bottom: 0;
`;

const InputFile = styled.input`
  display: none;
`;

export default ImageUpload;
