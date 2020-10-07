import React from "react";
import { useSelector } from "react-redux";
import { CombinedState } from "dataSource/typedef";
import styled from "styled-components";

function TweetContent() {
  const reduxListener = useSelector(
    (state: CombinedState) => state.homeReducer
  );
  const tweetArray = reduxListener.receivedTweet;
  const userInfo = reduxListener.userInfo;

  return (
    <>
      {tweetArray?.map((every) => (
        <TweetDiv key={every.docId}>
          <h4>{every.tweet}</h4>
          {userInfo.uid === every.creatorID ? (
            <>
              <button>delete</button>
              <button>edit</button>
            </>
          ) : null}
        </TweetDiv>
      ))}
    </>
  );
}

const TweetDiv = styled.div`
  display: flex;
`;

export default TweetContent;
