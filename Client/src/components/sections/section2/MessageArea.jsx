import React from "react";
import Emoji from "./Emoji";
import "./section2.css";
import sendImg from "..//..//..//icons/logo.png";
import smile from "..//..//..//icons/smile.svg";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SOCKET from "../../../JS/soket_Io_client/Socket";
import { useEffect } from "react";

export default function MessageArea() {
 const [emojiOpen,setEmoji] = useState(false)
 const [message,setMessage] = useState('')
 const data = useSelector(state => state.setSendData)
const dispatch = useDispatch()


useEffect(()=>{
  dispatch({type:"SEND_MESSAGE_DATA",payload:message,key:"message"})
},[message])

    return (
      <div className="messagePlace">
        <p>+</p>
        <textarea placeholder="Type a message here" onChange={(e)=>{
          setEmoji(false)
          setMessage(e.target.value)
        }} value={message} />

        <img
          onClick={() =>
            setEmoji(!emojiOpen)
          }
          src={smile}
          alt="/"
          className="smile"
        />

        {emojiOpen ? <Emoji props={{setMessage,message}}/> : null}

        <img className="send" src={sendImg} alt="sadasd/" 
          onClick={()=>{
            if(message.length !== 0){
              SOCKET.socket.emit("sendMessage",data)
              setMessage('')
            }
          }}
       />
      </div>
    );
}
