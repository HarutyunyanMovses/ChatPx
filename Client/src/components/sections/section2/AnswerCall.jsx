import React, { useRef, useState } from "react";
import Peer from "simple-peer"
import SOCKET from "../../../JS/soket_Io_client/Socket";
import { useDispatch, useSelector } from "react-redux";


export default function AnswereCall() {

    const userVideo = useRef()
    const connectionRef= useRef()
    const [stream, setStream] = useState()
    const [ callerSignal, setCallerSignal ] = useState()

    const dispatch = useDispatch()
    const videoCallData = useSelector(state => state.setCall)

    const answerCall = () => {
        dispatch({ type: "SET_CALL_ACCEPTED", payload: true })
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        })
        peer.on("signal", (data) => {
            SOCKET.socket.emit("answerCall", { signal: data, to: videoCallData.caller })
        })
        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream
            dispatch({ type: "SET_USER_VIDEO", payload: userVideo })
        })

        peer.signal(callerSignal)
        connectionRef.current = peer
    }



    return (
        <div className="anwereCall">
            {videoCallData.receivingCall && !videoCallData.callAccepted ? (
                <div className="caller">
                    <h1 >{videoCallData.name} is calling...</h1>
                    <button variant="contained" color="primary" onClick={answerCall}>
                        Answer
                    </button>
                </div>
            ) : null}
        </div>
    )
}