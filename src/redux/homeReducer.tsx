import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
import { HomeState } from "dataSource/typedef";

//? actions
const userUpdate = createAction<any>("USERUPDATE");
export const actions = { userUpdate };

//? reducer
export const homeReducer = createReducer<HomeState>(
  { userInfo: {} },
  {
    [userUpdate.type]: (state: HomeState, action: PayloadAction<any>) => {
      state.userInfo = action.payload;
    },
  }
);
