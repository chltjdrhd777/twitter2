import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
import { HomeState, TimeType } from "dataSource/typedef";

//? actions
const userUpdate = createAction<any>("USERUPDATE");
const receiveTweet = createAction<{}>("RECEIVETWEET");
const menuOpen = createAction<{ menuOpenCheck: boolean; docId: string }>(
  "MENU"
);
export const actions = { userUpdate, receiveTweet, menuOpen };

//? reducer
export const homeReducer = createReducer<HomeState>(
  { userInfo: {}, receivedTweet: [] },
  {
    [userUpdate.type]: (state: HomeState, action: PayloadAction<any>) => {
      state.userInfo = action.payload;
    },
    [receiveTweet.type]: (
      state: HomeState,
      action: PayloadAction<
        {
          createdDate: TimeType;
          tweet: string;
          creatorID: string;
          docId: string;
          imgFileUrl: string;
          avatarUrl: string;
          writerEmail: string;
          menuOpenCheck: boolean;
        }[]
      >
    ) => {
      state.receivedTweet = action.payload;
    },
    [menuOpen.type]: (
      state: HomeState,
      action: PayloadAction<{ menuOpenCheck: boolean; docId: string }>
    ) => {
      let indexCheck = state.receivedTweet?.findIndex(
        (every) => every.docId === action.payload.docId
      );

      state.receivedTweet![indexCheck!].menuOpenCheck =
        action.payload.menuOpenCheck;
    },
  }
);
