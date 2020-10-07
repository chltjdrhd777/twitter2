import React, { useState } from "react";
import styled from "styled-components";
import { Avatar, Button } from "@material-ui/core";
import { dbService } from "dataSource/firebaseDB";
import { CombinedState } from "dataSource/typedef";
import { useSelector } from "react-redux";

function TweetBox() {
  //? onsubmit, onclick///////////
  const [text, setText] = useState("");
  const reduxListener = useSelector(
    (state: CombinedState) => state.homeReducer
  );
  const userInformation = reduxListener.userInfo;

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await dbService.collection("tweets").add({
      tweet: text,
      createdDate: Date.now(),
      creatorID: userInformation.uid,
    });
    setText("");
  };

  const onChange = (e: any) => {
    const { value } = e.target;
    setText(value);
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
        <input type="text" placeholder="Enter image URL" />
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

export default TweetBox;
