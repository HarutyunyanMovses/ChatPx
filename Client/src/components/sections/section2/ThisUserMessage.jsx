import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Fetch from "..//..//..//JS/services/fetch"
import SOCKET from "../../../JS/soket_Io_client/Socket";
import ValidationFiles from "./ValidationFiles";

export default function ThisUserMessage(props) {

  const [isUpdate, setUpdate] = useState(false)
  const [isOpenInput, setInput] = useState(false)
  const [newMess, setNewMess] = useState(props.value)
  const [isNone, setIsNone] = useState('none')
  const [src, setSrc] = useState("")
  const data = useSelector(state => state.setLoggedUser.thisUser);
  const companion = useSelector(state => state.setChangeSection2.changeSection2)

  const dispatch = useDispatch()

  function deleteMess() {
    console.log(1);
    Fetch.delete(`chat/delete_message/${props.id}/${props.conversId}`)
      .then(data => {
        dispatch({ type: 'SET_MESSAGES', payload: data, key: data[0].conversationId })
        SOCKET.socket.emit("update", { data, companionId: companion._id })
      })
  }
  function updateMess() {
    console.log(1);
    Fetch.put(`chat/update_message/${props.id}/${props.conversId}/${newMess}`)
      .then(data => {
        setInput(false)
        setUpdate(false)
        dispatch({ type: 'SET_MESSAGES', payload: data, key: data[0].conversationId })
        SOCKET.socket.emit("update", { data, companionId: companion._id })
      })
  }

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
      <div className="leftMessage" onClick={(e)=>{
        if (e.target.alt && e.target.alt === "img") {
          setIsNone("blok")
          setSrc(e.target.src)
        }
        }}>
        {
          !isOpenInput ? (
            props.type === "file" ?
              <ValidationFiles props={props.value} />
              :
              <p className="messageContent">{props.value}</p>
          ) : (
            <>
              <input onChange={(e) => {
                setNewMess(e.target.value)
              }}
                value={newMess}
                className="messUpdateInp" />
              <span onClick={updateMess}>update</span>
            </>
          )

        }
      </div>

      <div
        className="thisUserPic"
        style={{ backgroundImage: `url(${data.imgs[0]})` }}
      />
      {

        !isUpdate ?
          (<div className="update" onClick={() => setUpdate(true)}>...</div>)
          : (
            <div className="updateButtons">
              <i className="fa fa-plus closIsUpdate" onClick={() => setUpdate(false)}></i>
              <span onClick={() => setInput(true)}>update</span>
              <span onClick={deleteMess}>delete</span>
            </div>
          )
      }
    </>
  );
}