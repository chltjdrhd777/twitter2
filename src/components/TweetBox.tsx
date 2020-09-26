import React from "react";
import styled from "styled-components";
import { Avatar, Button } from "@material-ui/core";

function TweetBox() {
  return (
    <TweetBoxDiv>
      <form>
        <TweetInputDiv>
          <Avatar src="" />
          <input type="text" placeholder="What's happening" />
        </TweetInputDiv>
        <Button>Tweet</Button>
      </form>
    </TweetBoxDiv>
  );
}

const TweetBoxDiv = styled.div``;
const TweetInputDiv = styled.div``;

export default TweetBox;
