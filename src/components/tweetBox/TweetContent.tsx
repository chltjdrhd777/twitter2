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

                  <ContentDiv>
                    <div className="tweetText">{every.tweet}</div>
                    {every.imgFileUrl && (
                      <>
                        <ImgContaingerDiv>
                          <TweetImg src={every.imgFileUrl} alt="" />
                        </ImgContaingerDiv>
                      </>
                    )}

                    {userInfo.uid === every.creatorID ? (
                      <>
                        <button
                          onClick={() =>
                            onDelete(every.docId, every.imgFileUrl!)
                          }
                        >
                          delete
                        </button>
                        <button onClick={() => onEditToggle(every.tweet!)}>
                          edit
                        </button>
                      </>
                    ) : null}
                  </ContentDiv>
                </BodyDiv>
              </PosterDiv>
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

const ImgContaingerDiv = styled.div`
  width: 250px;
  height: 250px;
`;
const TweetImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PosterDiv = styled.div`
  display: flex;

  border-bottom: 8px solid lightgray;
  width: 100%;
`;

const AvaterDiv = styled.div`
  margin-left: 10px;
`;
const BodyDiv = styled.div`
  margin-left: 15px;
`;
const HeaderDiv = styled.div``;
const HeaderTextDiv = styled.div`
  display: flex;
`;

const ContentDiv = styled.div`
  & .tweetText {
    margin: 10px 0px;
  }
`;
export default TweetContent;
