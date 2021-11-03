import { React, useState } from "react";
import styled from "styled-components";

// icon
import { ReactComponent as PlusImageBefore } from "../assets/plusImageBefore.svg";
import { ReactComponent as PlusImageAfter } from "../assets/plusImageAfter.svg";

const ImageUpload = () => {
  const [file, setFile] = useState({ file: "", previewURL: "" });

  const handleChangeImageFile = (e) => {
    let fileReader = new FileReader(); // 파일데이터 자체를 불러오려면 FileRedaer API를 사용해야한다.
    // 비동기적으로 데이터를 읽기 위해 읽을 파일을 가리키는 file 객체를 이용해 파일의 내용을 읽고 저장할 수 있다.

    let imageFile = e.target.files[0]; // 파일이 선택되었을 때 어떤 파일이 선택되었는지를 가리키는 객체

    fileReader.readAsDataURL(imageFile); // 파일을 데이터 URL로 읽어온다. (파일을 읽는 방법 중 하나임)

    // 파일 읽기가 성공적으로 완료되었을 때 실행
    fileReader.onload = (e) => {
      setFile({ file: imageFile, previewURL: e.target.result });
    };
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
