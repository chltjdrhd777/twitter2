import React from "react";
import styled from "styled-components";
import { icons } from "../../dataSource/Icons";

function BottomMenu() {
  return (
    <>
      <FooterDiv>
        <icons.ChatBubbleIcon fontSize="small" />
        <icons.RepeatIcon fontSize="small" />
        <icons.FavoriteIcon fontSize="small" />
        <icons.PublishIcon fontSize="small" />
      </FooterDiv>
    </>
  );
}

const FooterDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;
  color: grey;
  opacity: 80%;
`;

export default BottomMenu;
