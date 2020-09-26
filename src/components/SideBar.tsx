import React from "react";
import styled from "styled-components/macro";
import SideBarOptions from "./SideBarOptions";
import { icons } from "dataSource/Icons";

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
    margin-top: 15px;
  }

  border-right: 1px solid lightgrey;
  border-top: 1px solid lightgrey;
  padding-left: 10px;
  padding-right: 30px;
  flex: 0.17;
`;

export default SideBar;
