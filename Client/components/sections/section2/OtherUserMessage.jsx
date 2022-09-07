import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import ValidationFiles from "./ValidationFiles";

export default function ThisUserMessage(props) {
  const data = useSelector(state => state.setChangeSection2.changeSection2);
  const [isNone, setIsNone] = useState('none')
  const [src, setSrc] = useState("")


  if (isNone === "blok") {
    return (
      <div className="fullScrinMess popup-fade" style={{ display: isNone }}>
        <i className="fa fa-plus closeImg" onClick={() => {
          setIsNone('none')
          setSrc("")
        }}></i>
        <img className="fullScrinImg" src={src} alt="img" />
        <a href={src} download={true}>
          <i className="material-icons downloadMess">file_download</i>
        </a>
      </div>
    )
  }

  return (
    <>
      <div
        className="otherUserPic"
        style={{ backgroundImage: `url(${data.imgs[0]})` }}
      />

      <div className="rightMessage" onClick={(e) => {
        if (e.target.alt && e.target.alt === "img") {
          setIsNone("blok")
          setSrc(e.target.src)
        }
      }}>
        {props.type === "file" ?
          <ValidationFiles props={props.value} />
          :
          <p className="messageContent">{props.value}</p>}
      </div>
    </>
  );
}
