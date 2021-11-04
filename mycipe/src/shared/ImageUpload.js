import { React, useState } from "react";
import styled from "styled-components";

// icon
import { ReactComponent as PlusImageBefore } from "../assets/plusImageBefore.svg";
import { ReactComponent as PlusImageAfter } from "../assets/plusImageAfter.svg";

const ImageUpload = () => {
  const [file, setFile] = useState({ file: "", previewURL: "" });

  const handleChangeImageFile = (e) => {
    let imageFile = e.target.files[0]; // 파일이 선택되었을 때 어떤 파일이 선택되었는지를 가리키는 객체

    setFile({ file: imageFile, previewURL: URL.createObjectURL(imageFile) });
  };

  return (
    <>
      <UploadWrapper previewimg={file.previewURL ? file.previewURL : null}>
        <label>
          {/* 사진 선택 유뮤에 따라 아이콘 색상 변경 */}
          {file.previewURL ? (
            <IconWrapper>
              <PlusImageAfter />
            </IconWrapper>
          ) : (
            <IconWrapper>
              <PlusImageBefore />
            </IconWrapper>
          )}
          <InputFile
            type="file"
            accept="image/jpg, impge/png, image/jpeg, image/gif"
            onChange={handleChangeImageFile}
          ></InputFile>
        </label>
      </UploadWrapper>
    </>
  );
};

const UploadWrapper = styled.div`
  width: 320px;
  height: 320px;
  margin-bottom: 16px;
  border-radius: 6px;
  background-color: #ededed;
  background-size: 320px 320px;
  background-repeat: no-repeat;
  ${(props) =>
    props.previewimg ? `background-image : url(${props.previewimg})` : ""};
`;

const IconWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputFile = styled.input`
  display: none;
`;

export default ImageUpload;
