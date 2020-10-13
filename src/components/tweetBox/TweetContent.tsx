import React from "react";
import { useSelector } from "react-redux";
import { CombinedState } from "dataSource/typedef";
import styled from "styled-components";
import { dbService, storageService } from "dataSource/firebaseDB";
import { useState } from "react";
import { Avatar } from "@material-ui/core";
import Time from "./Time";

function TweetContent() {
  const [allowEdit, setAllowEdit] = useState(false);
  const [editTargetValue, setEditTargetValue] = useState("");

  const reduxListener = useSelector(
    (state: CombinedState) => state.homeReducer
  );
  const tweetArray = reduxListener.receivedTweet;
  const userInfo = reduxListener.userInfo;

  //? functions
  const onDelete = async (docID: string, imgFileUrl: string) => {
    const confirming = window.confirm("are you want to delete this");
    if (confirming) {
      await dbService.doc(`tweets/${docID}`).delete();
      await storageService.refFromURL(imgFileUrl).delete();
    }
  };

  const onEditToggle = (tweet: string) => {
    if (!allowEdit) {
      setEditTargetValue(tweet);
    }
    setAllowEdit((prev) => !prev);
  };

  const onEditChange = (e: any) => {
    const { value } = e.target;
    setEditTargetValue(value);
  };

  return (
    <>
      {tweetArray?.map((every) => (
        <TweetDiv key={every.docId}>
          {allowEdit ? (
            <form
              onSubmit={async (e: any) => {
                e.preventDefault();
                await dbService
                  .doc(`tweets/${every.docId}`)
                  .update({ tweet: editTargetValue });
                setAllowEdit(false);
              }}
            >
              <input value={editTargetValue} onChange={onEditChange}></input>
              <button type="submit">confirm</button>
              <button onClick={() => onEditToggle(every.tweet!)}>cancel</button>
            </form>
          ) : (
            <>
              <PosterDiv>
                <AvaterDiv>
                  <Avatar src={every.avatarUrl} />
                </AvaterDiv>

                <BodyDiv>
                  <HeaderDiv>
                    <HeaderTextDiv>
                      <h3>{every.writerEmail}</h3>
                      <Time writeTime={every.createdDate} />
                    </HeaderTextDiv>
                  </HeaderDiv>
                </BodyDiv>
              </PosterDiv>
              <h4>{every.tweet}</h4>
              {every.imgFileUrl && <TweetImg src={every.imgFileUrl} alt="" />}

              {userInfo.uid === every.creatorID ? (
                <>
                  <button
                    onClick={() => onDelete(every.docId, every.imgFileUrl!)}
                  >
                    delete
                  </button>
                  <button onClick={() => onEditToggle(every.tweet!)}>
                    edit
                  </button>
                </>
              ) : null}
            </>
          )}
        </TweetDiv>
      ))}
    </>
  );
}

const TweetDiv = styled.div`
  display: flex;
`;

const TweetImg = styled.img`
  width: 100px;
  height: 100px;
`;

const PosterDiv = styled.div``;
const AvaterDiv = styled.div``;
const BodyDiv = styled.div``;
const HeaderDiv = styled.div``;
const HeaderTextDiv = styled.div``;

export default TweetContent;
