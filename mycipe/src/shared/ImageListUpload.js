import { React, useState, useEffect } from "react";
import styled from "styled-components";
// icon
import { ReactComponent as PlusImageBefore } from "../assets/plusImageBefore.svg";
import { ReactComponent as Remove } from "../assets/remove.svg";

// elements
import Image from "../elements/Image";

const ImageListUpload = ({ getFileFromImageList }) => {
  const [fileList, setFileList] = useState({
    fileList: [],
    previewURLList: [],
  });

  const handleChangeImageFile = (e) => {
    const imageFileList = Array.from(e.target.files);

    // 6장 이상이면 return
    if (imageFileList.length >= 6) {
      window.alert("5장밖에 안됨~~~~~~~~!");
      return;
    }

    if (imageFileList.length <= 5) {
      const newFileList = [];

      for (let i = 0; i < imageFileList.length; i++) {
        const previewURL = URL.createObjectURL(imageFileList[i]);
        newFileList.push(previewURL);
      }

      setFileList({
        fileList: imageFileList,
        previewURLList: [...newFileList],
      });
    }
  };

  const handleRemoveImageFile = (idx) => {
    // 선택한 index의 배열 요소를 자른다.
    fileList.fileList.splice(idx, 1);
    fileList.previewURLList.splice(idx, 1);

    setFileList({
      fileList: fileList.fileList,
      previewURLList: fileList.previewURLList,
    });
  };

  useEffect(() => {
    getFileFromImageList(fileList.fileList);
  }, [fileList.fileList]);

  return (
    <>
      <Grid>
        <Image shape="rectangle" size="small">
          <label>
            <IconWrapper>
              <PlusImageBefore width="20px" height="20px" />
            </IconWrapper>

            <InputFile
              type="file"
              multiple="multiple"
              accept="image/jpg, impge/png, image/jpeg, image/gif"
              onChange={handleChangeImageFile}
            ></InputFile>
          </label>
        </Image>

        {fileList.previewURLList &&
          fileList.previewURLList.map((url, idx) => {
            return (
              <Image key={url} src={url} shape="rectangle" size="small">
                <RemoveIconWrapper
                  onClick={() => {
                    handleRemoveImageFile(idx);
                    getFileFromImageList(fileList.fileList);
                  }}
                >
                  <Remove />
                </RemoveIconWrapper>
              </Image>
            );
          })}
      </Grid>
    </>
  );
};

const Grid = styled.div`
  width: 320px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  overflow: auto; // 스크롤 자동 추가됨
  scroll-behavior: smooth;

  // 스크롤 숨김
  ::-webkit-scrollbar {
    display: none;
  }
`;

const IconWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RemoveIconWrapper = styled.div`
  width: 16px;
  height: 16px;
  position: relative;
  left: 80px;
  top: 5px;
  cursor: pointer;
`;

const InputFile = styled.input`
  display: none;
`;

export default ImageListUpload;
