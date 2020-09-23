import React from "react";
import styled from "styled-components";
import SideBarOptions from "./SideBarOptions";

function SideBar() {
  return (
    <BarDiv>
      <SideBarOptions />
    </BarDiv>
  );
}

const BarDiv = styled.div`
  & svg {
    font-size: 20px;
  }
`;

export default SideBar;
