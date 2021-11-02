import { React, useState } from "react";
import styled from "styled-components";

// icon
import { ReactComponent as Photo } from "../assets/photo.svg";

const ImageUpload = () => {
  const [file, setFile] = useState({ file: "", previewURL: "" });

  const handleChangeImageFile = (e) => {
    let fileReader = new FileReader(); // 파일데이터 자체를 불러오려면 FileRedaer API를 사용해야한다.
    // 비동기적으로 데이터를 읽기 위해 읽을 파일을 가리키는 file 객체를 이용해 파일의 내용을 읽고 저장할 수 있다.

    let imageFile = e.target.files[0]; // 파일이 선택되었을 때 어떤 파일이 선택되었는지를 가리키는 객체

    fileReader.readAsDataURL(imageFile); // 파일을 데이터 URL로 읽어온다. (파일을 읽는 방법 중 하나임)

    // 파일 읽기가 성공적으로 완료되었을 떄 실행
    fileReader.onload = (e) => {
      setFile({ file: imageFile, previewURL: e.target.result });
    };
  };

  return (
    <>
      <UploadWrapper>
        {file.previewURL ? (
          <PreviewImg
            onClick={() => {
              setFile({ ...file, previewURL: null });
            }}
            alt="previewImg"
            src={file.previewURL}
          />
        ) : (
          <label>
            <IconWrapper>
              <Photo />
            </IconWrapper>

            <InputFile
              type="file"
              accept="image/jpg, impge/png, image/jpeg, image/gif"
              onChange={handleChangeImageFile}
            ></InputFile>
          </label>
        )}
      </UploadWrapper>
    </>
  );
};

const UploadWrapper = styled.div`
  width: 328px;
  height: 328px;
  margin: 16px auto;
  background-color: #ededed;
`;

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
`;

const IconWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputFile = styled.input`
  display: none;
`;

export default ImageUpload;
