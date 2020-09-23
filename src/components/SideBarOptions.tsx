import React from "react";
import styled from "styled-components";
import { icons } from "../dataSource/Icons";

interface SideBarOptionProps {
  Icon?: any;
  text?: string;
}

function SideBarOption({ Icon, text }: SideBarOptionProps) {
  return (
    <OptionsDiv>
      <Icon />
      <h2>{text}</h2>
    </OptionsDiv>
  );
}

const OptionsDiv = styled.div``;

function SideBarOptions() {
  return (
    <>
      <SideBarOption Icon={icons.TwitterIcon} text="Twitter" />
      <SideBarOption Icon={icons.HomeIcon} text="Home" />
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
