import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
import { HomeState } from "dataSource/typedef";

//? actions
const userUpdate = createAction<any>("USERUPDATE");
const receiveTweet = createAction<{}>("RECEIVETWEET");
export const actions = { userUpdate, receiveTweet };

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
          createDate: number;
          tweet: string;
          creatorID: string;
          docId: string;
          imgFileUrl: string;
        }[]
      >
    ) => {
      state.receivedTweet = action.payload;
    },
  }
);
