import { React, useState } from "react";
import styled from "styled-components";

// icon
import { ReactComponent as Photo } from "../assets/photo.svg";

const ImageUpload = () => {
  const [file, setFile] = useState({ file: "", previewURL: "" });

  const handleChangeImageFile = (e) => {
    let fileReader = new FileReader(); // ���ϵ����� ��ü�� �ҷ������� FileRedaer API�� ����ؾ��Ѵ�.
    // �񵿱������� �����͸� �б� ���� ���� ������ ����Ű�� file ��ü�� �̿��� ������ ������ �а� ������ �� �ִ�.

    let imageFile = e.target.files[0]; // ������ ���õǾ��� �� � ������ ���õǾ������� ����Ű�� ��ü

    fileReader.readAsDataURL(imageFile); // ������ ������ URL�� �о�´�. (������ �д� ��� �� �ϳ���)

    // ���� �бⰡ ���������� �Ϸ�Ǿ��� �� ����
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
