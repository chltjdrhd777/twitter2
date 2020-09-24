import React from "react";
import styled from "styled-components";
import SideBarOptions from "./SideBarOptions";
import { icons } from "../dataSource/Icons";

function SideBar() {
  return (
    <BarDiv>
      <SideBarOptions />
      <icons.Button variant="outlined" fullWidth>
        Tweet
      </icons.Button>
    </BarDiv>
  );
}

const BarDiv = styled.div`
  & button {
    background-color: var(--twitter-color);
    border: none;
    color: white;
    font-weight: 800;
    border-radius: 30px;
    margin-top: 20px;
  }
`;

export default SideBar;
