import React from "react";
import styled from "styled-components";
import { icons } from "../dataSource/Icons";
import { PropTypes } from "../dataSource/typedef";

function SideBarOption({ active, Icon, text }: PropTypes["sideBarOption"]) {
  return (
    <OptionsDiv active={active}>
      <Icon />
      <h2>{text}</h2>
    </OptionsDiv>
  );
}

const OptionsDiv = styled.div<PropTypes["optionDiv"]>`
  display: flex;
  align-items: center;
  cursor: pointer;

  & svg {
    font-size: 20px;
    padding: 10px;
  }

  &:hover {
    background-color: var(--twitter-background);
    border-radius: 30px;
    color: var(--twitter-color);
    transition: color 0.3s ease-out;
  }

  color: ${(props: PropTypes["optionDiv"]) => props.active && "#8296f8"};
`;

function SideBarOptions() {
  return (
    <>
      <SideBarOption active={true} Icon={icons.TwitterIcon} />
      <SideBarOption active={true} Icon={icons.HomeIcon} text="Home" />
      <SideBarOption Icon={icons.SearchIcon} text="Search" />
      <SideBarOption Icon={icons.NotificationsNoneIcon} text="Notification" />
      <SideBarOption Icon={icons.MailOutlineIcon} text="Mail" />
      <SideBarOption Icon={icons.BookmarkBorderIcon} text="Book Mark" />
      <SideBarOption Icon={icons.ListAltIcon} text="List" />
      <SideBarOption Icon={icons.PermIdentityIcon} text="Identity" />
      <SideBarOption Icon={icons.MoreHorizIcon} text="More" />
    </>
  );
}

export default SideBarOptions;
