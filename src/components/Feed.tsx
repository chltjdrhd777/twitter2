import React from "react";
import styled from "styled-components";
import TweetBox from "./TweetBox";

function Feed() {
  return (
    <FeedDiv>
      <div className="feed_header">
        <h2>Feed</h2>
      </div>
      <TweetBox />
    </FeedDiv>
  );
}

const FeedDiv = styled.div`
  flex: 0.4;
  border-right: 1px solid lightgrey;
  min-width: fit-content;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  & .feed_header {
    display: sticky;
    top: 0;
    background-color: white;
    z-index: 100;
    border-bottom: 1px solid lightgrey;
    border-top: 1px solid lightgrey;
    padding: 15px 20px;
  }
`;

export default Feed;
