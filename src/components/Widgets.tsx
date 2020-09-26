import React from "react";
import styled from "styled-components";

function Widgets() {
  return (
    <WidgetsDiv>
      <h2>Widgets</h2>
    </WidgetsDiv>
  );
}

const WidgetsDiv = styled.div`
  flex: 0.3;
  border-top: 1px solid lightgrey;
`;

export default Widgets;
