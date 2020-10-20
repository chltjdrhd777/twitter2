import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CombinedState } from "dataSource/typedef";
import styled from "styled-components/macro";
import { dbService, storageService } from "dataSource/firebaseDB";
import { useState } from "react";
import { Avatar } from "@material-ui/core";
import Time from "./Time";
import { icons } from "dataSource/Icons";
import { actions } from "redux/homeReducer";
import BottomMenu from "./BottomMenu";

function TweetContent() {
  const [allowEdit, setAllowEdit] = useState(false);
  const [editTargetValue, setEditTargetValue] = useState("");
  const dispatch = useDispatch();

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

  const popUpFunc = (menuOpenCheck: boolean, docId: string) => {
    dispatch(actions.menuOpen({ menuOpenCheck, docId }));
  };

  const parentCheck = useRef<HTMLDivElement>(null);
  window.addEventListener("click", (e: any) => {
    console.log(e.target, parentCheck.current?.children[0]);
    if (e.target !== parentCheck.current) {
      console.log("you clicked outside");
    }
  });

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
                  </ContentDiv>

                  <BottomMenu />
                </BodyDiv>

                <PopUpDiv
                  onClick={() => popUpFunc(!every.menuOpenCheck, every.docId)}
                  ref={parentCheck}
                >
                  <icons.KeyboardArrowDownIcon />
                </PopUpDiv>
                {every.menuOpenCheck && (
                  <AfterPopUpDiv>
                    {userInfo.uid === every.creatorID ? (
                      <>
                        <button
                          onClick={() =>
                            onDelete(every.docId, every.imgFileUrl!)
                          }
                        >
                          delete
                        </button>
                        <button>edit</button>
                      </>
                    ) : null}
                  </AfterPopUpDiv>
                )}
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
  width: 200px;
  height: 200px;
`;
const TweetImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`;

const PosterDiv = styled.div`
  display: flex;
  position: relative;

  border-bottom: 5px solid lightgray;
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

const PopUpDiv = styled.div`
  position: absolute;
  right: 15px;
  margin-top: 5px;
  border-radius: 50%;
  border: 1px solid white;
  width: 15px;
  height: 15px;
  &:hover {
    transition: all 0.3s ease-in;
    background-color: grey;
    border: 1px solid var(--twitter-color);

    & > .down_bar {
      color: white;
    }
  }
`;

/* interface AfterPopUpProp {
  menuOpenCheck :boolean
} */

const AfterPopUpDiv = styled.div`
  position: absolute;
  box-shadow: 0px 0px 5px;
  right: 3.5px;
  top: 5px;
  /*  opacity: 0;
  visibility: hidden; */
  outline: none;

  & > button {
    background-color: var(--twitter-color);
    border: none;
    color: white;
    width: 100%;
    &:hover {
      transition: all 0.3s ease-in;
      background-color: var(--twitter-background);
    }

    &:focus {
      outline: none;
    }
  }
`;

export default TweetContent;
