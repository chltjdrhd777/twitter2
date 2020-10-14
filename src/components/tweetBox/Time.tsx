import { time } from "console";
import { TimeProps } from "dataSource/typedef";
import React from "react";
import styled from "styled-components";

function Time({ writeTime }: TimeProps) {
  let now = new Date();
  let yearComp = now.getFullYear() - writeTime.year;
  let monthComp = now.getMonth() - writeTime.month;
  let dayComp = now.getDate() - writeTime.date;
  let timeComp = now.getTime() - writeTime.time;

  let returnTime = "";

  //! I just remain "else if"'s conditions for better understanding
  if (yearComp > 0) {
    if (yearComp === 1) {
      returnTime = yearComp + "year ago";
    } else {
      returnTime = yearComp + "years ago";
    }
  } else if (yearComp === 0 && monthComp > 0) {
    if (monthComp === 1) {
      returnTime = monthComp + "month ago";
    } else {
      returnTime = monthComp + "months ago";
    }
  } else if (yearComp === 0 && monthComp === 0 && dayComp > 0) {
    if (dayComp === 1) {
      returnTime = dayComp + "day ago";
    } else {
      returnTime = dayComp + "days ago";
    }
  } else if (yearComp === 0 && monthComp === 0 && dayComp === 0) {
    let sec = Math.round(timeComp / 1000);
    let min = Math.round(sec / 60);
    let hour = Math.round(min / 60);

    if (hour === 0) {
      if (min === 0 || min === 1) {
        returnTime = min + "minute ago";
      } else {
        returnTime = min + "minutes ago";
      }
    }
  }

  return <TimeDiv>{returnTime}</TimeDiv>;
}

const TimeDiv = styled.div`
  margin-left: 10px;
  font-weight: 500;
  color: darkgray;
`;

export default Time;
