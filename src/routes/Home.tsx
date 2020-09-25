import styled from "styled-components";
import Feed from "components/Feed";
import SideBar from "components/SideBar";
import React from "react";
import Widgets from "components/Widgets";

function Home() {
  return (
    <HomeContainerDiv>
      <SideBar />
      <Feed />
      <Widgets />
    </HomeContainerDiv>
  );
}

const HomeContainerDiv = styled.div`
  display: flex;
  height: 100vh;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
`;

export default Home;
