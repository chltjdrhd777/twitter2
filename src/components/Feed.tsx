import React from "react";
import styled from "styled-components";

function Feed() {
  return (
    <FeedDiv>
      <div className="feed_header">
        <h2>Home</h2>
      </div>
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
    border: 1px solid lightgrey;
    padding: 15px 20px;
  }
`;

export default Feed;
