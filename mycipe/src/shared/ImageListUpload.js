import { React, useState, useEffect } from "react";
import styled from "styled-components";
// icon
import { ReactComponent as PlusImageBefore } from "../assets/plusImageBefore.svg";
import { ReactComponent as Remove } from "../assets/remove.svg";

// elements
import Image from "../elements/Image";

const ImageListUpload = ({ isEdit, post, images, setPost }) => {
  const isImage = images ? [...images] : [];
  const [fileList, setFileList] = useState({
    fileObj: {},
    previewURLList: isImage,
    deleteImage: [],
  });

  // 이미시 선택시 실행되는 함수
  const handleChangeImageFile = (e) => {
    // onChange 함수로 새로 받아온 file 배열
    const selectedFile = Array.from(e.target.files);

    let imageFileList = [];

    // 수정모드일 때는 지금 선택한 파일만
    // 미리보기 url을 생성하는 과정에서 수정모드일 때는 선택한 사진만 만들어줘야하기 때문에 따로 빼주었습니다.
    if (isEdit) imageFileList = selectedFile;

    // 작성모드일 때 선택했던 파일 + 지금 선택한 파일
    if (!isEdit)
      imageFileList = [...Object.values(fileList.fileObj), ...selectedFile];

    // 6장 이상이면 return
    if (imageFileList.length >= 6) {
      window.alert("사진은 최대 5장까지 업로드 가능합니다🥲");
      return;
    }

    if (imageFileList.length <= 5) {
      const previewFileList = [];
      const newFileObj = {};

      for (let i = 0; i < imageFileList.length; i++) {
        const previewURL = URL.createObjectURL(imageFileList[i]);
        previewFileList.push(previewURL);
        newFileObj[previewURL] = imageFileList[i];
      }

      setFileList({
        fileObj: isEdit ? { ...fileList.fileObj, ...newFileObj } : newFileObj,

        // 수정모드일 때는 previewURLList를 props로 받아온 images + 새로 선택한 파일 미리보기
        previewURLList: isEdit
          ? [...fileList.previewURLList, ...previewFileList]
          : previewFileList,
        deleteImage: fileList.deleteImage,
      });
    }
  };

  // 이미지 삭제시 실행되는 함수
  const handleRemoveImageFile = (url, idx) => {
    // 수정모드일 때 삭제한 이미지만 담아놓는 배열
    if (images && images.includes(fileList.previewURLList[idx]))
      fileList.deleteImage.push(fileList.previewURLList[idx]);

    const deletedPreviewURLList = fileList.previewURLList.filter(
      (prev, idx) => {
        return prev !== url;
      }
    );

    const newObject = Object.keys(fileList.fileObj)
      .filter((key) => key !== url)
      .reduce((result, current) => {
        result[current] = fileList.fileObj[current];
        return result;
      }, {});

    setFileList({
      fileObj: newObject,
      previewURLList: deletedPreviewURLList,
      deleteImage: fileList.deleteImage,
    });
  };

  console.log(fileList);

  useEffect(() => {
    // request data
    setPost({
      ...post,
      fileList: Object.values(fileList.fileObj),
      deleteImage: fileList.deleteImage,
      previewURLList: fileList.previewURLList,
    });
  }, [fileList]);

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
              accept="image/jpg, image/png, image/jpeg, image/gif"
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
                    handleRemoveImageFile(url, idx);
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
