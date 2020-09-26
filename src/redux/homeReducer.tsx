import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
import { HomeState } from "dataSource/typedef";
import { authService } from "dataSource/firebaseDB";

console.log(authService.currentUser);

//? actions
const actions = {};

//? reducer
export const homeReducer = createReducer<HomeState>({ userInfo: {} }, {});
