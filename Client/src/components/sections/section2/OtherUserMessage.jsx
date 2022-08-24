import * as React from "react";
import { useSelector } from "react-redux";
import ValidationFiles from "./ValidationFiles";

export default function ThisUserMessage(props) {
  const data = useSelector(state => state.setChangeSection2.changeSection2);
  return (
    <>
      <div
        className="otherUserPic"
        style={{ backgroundImage: `url(${data.imgs[0]})` }}
      />

      <div className="rightMessage">
        {props.type === "file" ?
          <ValidationFiles props={props.value} />
          :
          <p className="messageContent">{props.value}</p>}
      </div>
    </>
  );
}
