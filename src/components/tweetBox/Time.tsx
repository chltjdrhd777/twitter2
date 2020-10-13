import { TimeProps } from "dataSource/typedef";
import React from "react";

function Time({ writeTime }: TimeProps) {
  let now = new Date();
  let comparison = now.getFullYear();

  console.log(writeTime, now.getTime());

  return <div></div>;
}

export default Time;
