import React, { useEffect, useState } from "react";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetch from "../../../JS/services/fetch";
import './person.css'

export default function Person(props) {

  const [data, setData] = useState('')
  const [isOnline, setIsOnline] = useState(false)
  const dispatch = useDispatch()
  const onlineUsers = useSelector(state => state.setOnlineUsers.onlineUsers)


  const loggedUser_id = JSON.parse(localStorage.getItem("loggedUser_id"))
  const members = props.props.members
  const companion_id = members.find(id => id !== loggedUser_id)

  useLayoutEffect(() => {
    fetch.post("chat/about_companion", { companion_id, conversId: props.props._id })
      .then(data => {
        setData(data);
      })
      .catch(e => {
        dispatch({ type: "ADD_ERROR", payload: true })
        setTimeout(() => {
          // window.location.pathname = "/"
        }, 2000);
      })
      fetch.get(`chat/mess${props.props._id}`)
      .then(data => {
        dispatch({ type: 'SET_MESSAGES', payload: data , key : props.props._id })
      })
  }, [companion_id, loggedUser_id, dispatch, props.props._id])

  useEffect(() => {
    if (data && onlineUsers) {
      let arr = []
      onlineUsers.map(item => arr.push(item.userId))
      arr.includes(data._id) ? setIsOnline(true) : setIsOnline(false)
    }
  }, [onlineUsers, data])

  useEffect(()=>{dispatch({type: "IS_ONLINE",payload:isOnline})},[isOnline])

  function handlerOpenSection2() {
        dispatch({ type: "SET_CONVERSATION_ID", payload: props.props._id})
        dispatch({ type: "SET_COMPANION", payload: companion_id })
        dispatch({ type: 'IS_OPEN', payload: true })
        dispatch({ type: 'CHANGE-SECTION2', payload: data })
        dispatch({type: "SET_CALL" ,payload: false })
        dispatch({type: "IS_ONLINE",payload:isOnline})
        dispatch({ type: "IS_OPEN_EDIT_PERSONAL_INFO", payload: false })
      }


  return (

    <div className="chatInfo" onClick={handlerOpenSection2}>
      <div className="personAbout">
        <div className="avatar" style={{ backgroundImage: `url(${data ? data.imgs[0] : ''})` }}>
          <div className={isOnline ? "online" : "offline"} />

        </div>
        <div className="name_mess">
          <div className="fullName">
            <p>{data ? (data.name + " " + data.lastname) : ""}</p>
          </div>
          <div className="lastMess">
            <p className="lastMessage">{data.lastMessage ? data.lastMessage.length > 15 ? `${data.lastMessage.slice(0, 15)}...` : data.lastMessage : "Not message"}</p>
            <p className="lastMessDate">{data.lastMessageDate ? data.lastMessageDate : "🕛"}</p>
          </div>
        </div>
      </div>
      <div className="status" />
    </div>
  );
}