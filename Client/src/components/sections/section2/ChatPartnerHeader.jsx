import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Peer from "simple-peer"
import "./section2.css";
import camera from "..//..//..//..//src/icons/camera.svg";
import phone from "..//..//..//..//src/icons/phone.svg";
import SOCKET from "../../../JS/soket_Io_client/Socket";

const ChatPartnerHeader = () => {

  const dispatch = useDispatch();
  const data = useSelector(state => state.setChangeSection2.changeSection2);
  const online = useSelector(state => state.setChangeSection2.isOnline);
  const loggedUser_id = JSON.parse(localStorage.getItem("loggedUser_id"))

  const [stream, setStream] = useState()
  const myVideo = useRef()
  const userVideo = useRef()
  const connectionRef = useRef()

  const videoCallData = useSelector(state => state.setCall)

  const handlerOpen = () => {
    dispatch({ type: "CHANGE-SECTION3", payload: true });
  };

  useEffect(() => {
    SOCKET.socket.on("callUser", (data) => {
      dispatch({ type: "SET_RECEIVING_CALL", payload: true })
      dispatch({ type: "SET_CALLER", payload: data.from })
      dispatch({ type: "SET_CALLER_NAME", payload: data.name })
      dispatch({ type: "SET_CALLER_SIGNAL", payload: data.signal })
    })
  }, [])

  const callUser = (id) => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream)
      myVideo.current.srcObject = stream
      dispatch({ type: "SET_MY_VIDEO", payload: myVideo })
    })
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream
    })
    peer.on("signal", (data) => {
      SOCKET.socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: loggedUser_id,
        name: videoCallData.name
      })
    })
    peer.on("stream", (stream) => {

      userVideo.current.srcObject = stream
      dispatch({ type: "SET_USER_VIDEO", payload: userVideo })

    })
    SOCKET.socket.on("callAccepted", (signal) => {
      dispatch({ type: "SET_CALL_ACCEPTED", payload: true })
      peer.signal(signal)
    })
    connectionRef.current = peer
  }


  return (
    <div className="header">
      <div className="leftSide" onClick={handlerOpen}>
        <div
          className="pic"
          style={{ backgroundImage: `url(${data.imgs[0]})` }}
        />
        <div className="textArea">
          <h6>{data.name + ' ' + data.lastname}</h6>
          <div className="online1">
            <p>
              {online ? "online" : `${new Date().getMinutes()} minutes ago`}
            </p>
            <div
              className="round"
              style={{
                backgroundColor: online ? "green" : "grey"
              }}
            />
          </div>
        </div>
      </div>

      <div className="rightSide">
        <img alt="/" src={camera} className="camera button" onClick={() => callUser(data._id)}></img>
        <img alt="/" src={phone} className="phone button"></img>
      </div>
    </div>
  );
};

export default ChatPartnerHeader;
