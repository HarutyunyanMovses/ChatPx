import React from "react";
import "./chatHeader.css";
import logo from "..//..//..//icons/big-logo.png";
import newPng from "..//section3/icons/new.png";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const ChatHeader = () => {

  const dropDown = useSelector(state=> state.setEditPersonalInfo.isOpenEditPeronalInfo)
  const [collorDrop,setCollorDrop] = useState('')
  const loggedUser = useSelector(state => state.setLoggedUser.thisUser)
  const aboutAs = useSelector(state => state.setHeaderConfig.aboutAs)
  const dispatch = useDispatch()
  const down = "\u2B9F";
  const up = "\u2B9D";
  const showDropDown = () => {

    if (dropDown) {
      setCollorDrop("")
      dispatch({type:"IS_OPEN_EDIT_PERSONAL_INFO", payload:false})
    } else {
      dispatch({type:"IS_OPEN_EDIT_PERSONAL_INFO", payload:true})
      setCollorDrop("red")
    }
  };

  const hendlerAboutAs = () => {
    !aboutAs ? dispatch({type:"SET_ABOUT_AS", payload:true}) : dispatch({type:"SET_ABOUT_AS", payload:false})
  }

  return (
    <div className="Cheader">
      <img className="headerLogo" src={logo} alt="img"/>
      <div className="aboutDev">
        {
        !aboutAs?(
          <div className="aboutStyle" onClick={hendlerAboutAs}>About as</div>
        ) : (
          <div className="aboutStyle_close" onClick={hendlerAboutAs}>Close</div>
        )
        }
      </div>
      <div className="thisPerson">
        <i className="material-icons">
          &#xe7f7;<div className="newMess"></div>
        </i>
        <div
          className="thisImg"
          style={{backgroundImage : `url(${loggedUser?loggedUser.imgs[0]:""})`}}
        />
        <p className="thisFullName">{loggedUser?loggedUser.fullName:""}</p>
        <p onClick={showDropDown} className="dropSleck" style={{color: collorDrop}}>
          {dropDown ? up : down}
        </p>
        <img onClick={showDropDown} src={newPng} alt="/" style={{width: "5vh",cursor:"pointer"}} />
      </div>
    </div>
  );
}


export default ChatHeader;
