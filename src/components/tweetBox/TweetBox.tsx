import React, { useState } from "react";
import styled from "styled-components";
import { Avatar, Button } from "@material-ui/core";
import { dbService, storageService } from "dataSource/firebaseDB";
import { CombinedState, timeGenerator } from "dataSource/typedef";
import { useSelector } from "react-redux";
import { v4 as randomId } from "uuid";

function TweetBox() {
  //? onsubmit, onclick///////////
  const [text, setText] = useState("");
  const [img, setImg] = useState("");

  const reduxListener = useSelector(
    (state: CombinedState) => state.homeReducer
  );
  const userInformation = reduxListener.userInfo;

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (text !== "" || img !== "") {
      let imgFileUrl = "";
      if (img) {
        const fileReference = storageService
          .ref()
          .child(`${userInformation.uid}/${randomId()}`);
        const response = await fileReference.putString(img, "data_url");
        imgFileUrl = await response.ref.getDownloadURL();
      }

      const SendThis = {
        tweet: text,
        createdDate: timeGenerator(),
        creatorID: userInformation.uid,
        imgFileUrl,
        avatarUrl:
          "https://images.theconversation.com/files/93614/original/image-20150902-6712-uj9a9a.png?ixlib=rb-1.1.0&q=45&auto=format&w=496&fit=clip",
        writerEmail: userInformation.email,
      };
      await dbService.collection("tweets").add(SendThis);
      setText("");
      setImg("");
    }
  };

  const onChange = (e: any) => {
    const { value } = e.target;
    setText(value);
  };

  const imagePreview = (e: any) => {
    const { files } = e.target;
    const targetFile = files[0];
    const fileReader = new FileReader();
    if (targetFile) {
      fileReader.readAsDataURL(targetFile);
      fileReader.onloadend = (finishedFile: any) => {
        const { result } = finishedFile.currentTarget;
        setImg(result);
      };
    }
  };
  const onClearPreview = () => {
    setImg("");
  };

  return (
    <TweetBoxDiv>
      <form onSubmit={onSubmit}>
        <TweetInputDiv>
          <Avatar src="https://images.theconversation.com/files/93614/original/image-20150902-6712-uj9a9a.png?ixlib=rb-1.1.0&q=45&auto=format&w=496&fit=clip" />
          <input
            value={text}
            onChange={onChange}
            type="text"
            placeholder="What's happening"
            maxLength={100}
          />
        </TweetInputDiv>
        {/*         <input type="text" placeholder="Enter image URL" /> */}

        <input type="file" accept="image/*" onChange={imagePreview} />

        {img && (
          <PreviewDiv>
            <PreviewImg src={img} alt="" />
            <button onClick={onClearPreview}>clear</button>
          </PreviewDiv>
        )}
        <Button type="submit" className="tweet__btn">
          Tweet
        </Button>
      </form>
    </TweetBoxDiv>
  );
}

const TweetBoxDiv = styled.div`
  padding-bottom: 10px;
  border-bottom: 8px solid lightgray;
  padding-right: 10px;

  & > form {
    display: flex;
    flex-direction: column;

    & input {
      border: 1px solid white;
      outline: none;
      transition: 0.5s;
    }
    & input:focus {
      border: 1px solid var(--twitter-color);
    }

    & input:focus::-webkit-input-placeholder {
      color: transparent;
    }

    & > input {
      padding: 10px;
      margin-left: 5px;
    }
  }

  & .tweet__btn {
    background-color: var(--twitter-color);
    border: none;
    color: white;
    font-weight: 800;
    border-radius: 30px;
    margin-top: 15px;
    margin-left: auto;
  }
`;
const TweetInputDiv = styled.div`
  padding: 20px;
  display: flex;
  & > input {
    flex: 1;
    margin-left: 15px;
    font-size: 15px;
    border: none;
    padding: 10px;
  }
`;
const PreviewDiv = styled.div``;

const PreviewImg = styled.img`
  width: 50px;
  height: 50px;
`;

export default TweetBox;
