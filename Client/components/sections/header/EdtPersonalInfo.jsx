import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"
import fetch from "../../../JS/services/fetch";
import SECRET from "../../../JS/secrets";
import emailSvg from "..//section3/icons/email.svg";
import phoneSvg from "..//section3/icons/phone.svg";
import fbSvg from "..//section3/icons/facebook.svg";
import instaSvg from "..//section3/icons/instagram.svg";
import linkedinSvg from "..//section3/icons/linkedin.svg";
import clickSvg from "..//section3/icons/click.png";
import "./edtPersonalInfo.css"




export default function EditPersoanlInfo(params) {

    const info = useSelector(state => state.setLoggedUser.thisUser)
    const dispatch = useDispatch()
    const socialNetworks = info.contacts.socialNetworks
    const [name, setName] = useState(info.fullName.split(" ")[0])
    const [lastname, setlastname] = useState(info.fullName.split(" ")[1])
    const [phone, setPhone] = useState(info.contacts.Phone)
    const [email, setEmail] = useState(info.contacts.email)
    const [fb, setFb] = useState(socialNetworks.fb)
    const [instagram, setInsta] = useState(socialNetworks.instagram)
    const [linkedin, setLinkedin] = useState(socialNetworks.linkedin)
    const [imgSrc, setSrc] = useState('')
    const [image, setImage] = useState(false)
    const [width, setWidth] = useState(window.innerWidth / 100)


    const edit = () => {

        const body = {
            _id: JSON.parse(localStorage.getItem("loggedUser_id")),
            name,
            lastname,
            contacts: {
                Phone: phone,
                email,
                socialNetworks: {
                    fb,
                    linkedin,
                    instagram,
                }
            }
        }

        if (image) {
            let formData = new FormData()
            formData.append("files", image)
            axios.post(`${SECRET.URL_LOCAL_SERVER}/chatpx/filefromclient`, formData,
                {
                    headers: {
                        'content-type': 'multipart/form-data;',
                    },
                }
            ).then(res => {
                body.imgs = [res.data]
                fetch.put(`chat/edit_personal_info`, body)
                    .then(data => {
                        dispatch({ type: "ADD_LOGGED_USER", payload: data })
                    })
                    .catch(e => {
                        alert("pordzeq mi poq ush")
                    })
            })
                .catch(e => {
                    alert("pordzeq mi poq ush")
                })
        } else {
            fetch.put(`chat/edit_personal_info`, body)
                .then(data => {
                    dispatch({ type: "ADD_LOGGED_USER", payload: data })
                })
                .catch(e => {
                    alert("pordzeq mi poq ush")
                })
        }

        dispatch({ type: "IS_OPEN_EDIT_PERSONAL_INFO", payload: false })
    }






    return (info ? (

        <div className="editorBody showMessages" >
            <div className="editorContainer">
                <div className="editImg">
                    <div className="editPersInfo_avatar" style={{
                        'backgroundImage': `url(${info.imgs[0]})`,
                        "width": `${width > 999 ? (width) * 40 : width * 35}px`,
                        "height": `${width > 999 ? (width) * 40 : width * 35}px`
                    }} />
                    <label className="custom-file-upload upladInp">
                        <input type="file" name="files" onChange={(e) => {
                            setImage((e.target.files[0]))
                            setSrc(URL.createObjectURL(e.target.files[0]))
                        }} />
                        <i className="fa fa-plus plus" ></i> Avatar
                    </label><br />
                    <div className="editPersInfo_avatar border_avatar" style={{
                        backgroundImage: `url(${imgSrc})`,
                        "width": `${width > 999 ? (width) * 40 : width * 35}px`,
                        "height": `${width > 999 ? (width) * 40 : width * 35}px`
                    }} />
                </div>

                <div className="editor-form">

                    <p className="editor_h3">Full name</p>
                    <div>
                        <input className="editor_inputs" type="text"
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                            value={name}
                            onClick={() => setName('')}
                            onBlur={() => name ? null : setName(info.fullName.split(" ")[0])}
                        />

                        <input className="editor_inputs" type="text"
                            onChange={(e) => {
                                setlastname(e.target.value)
                            }}
                            value={lastname}
                            onClick={() => setlastname('')}
                            onBlur={() => lastname ? null : setlastname(info.fullName.split(" ")[1])}
                        />
                    </div>

                    <p className="editor_h3">Contacts</p>

                    <div className="editor_blok">
                        <img className="editor_icons" src={phoneSvg} alt="/" />
                        <input className="editor_inputs" type="text"
                            onChange={(e) => {
                                setPhone(e.target.value)
                            }}
                            value={phone}
                            onClick={() => setPhone('')}
                            onBlur={() => phone ? null : setPhone(info.contacts.Phone)}
                        />
                    </div>
                    <div className="editor_blok">
                        <img className="editor_icons" src={emailSvg} alt="/" />
                        <input className="editor_inputs" type="text"
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            value={email}
                            onClick={() => setEmail('')}
                            onBlur={() => email ? null : setEmail(info.contacts.email)}
                        />
                    </div>

                    <p className="editor_h3">Social Networks</p>

                    <div className="editor_blok">
                        <img className="editor_icons" src={fbSvg} alt="/" />
                        <input className="editor_inputs" type="text"
                            onChange={(e) => {
                                setFb(e.target.value)
                            }}
                            value={fb}
                            onClick={() => setFb('')}
                            onBlur={() => fb ? null : setFb(socialNetworks.fb)}
                        />
                    </div>
                    <div className="editor_blok">
                        <img className="editor_icons" src={instaSvg} alt="/" />
                        <input className="editor_inputs" type="text"
                            onChange={(e) => {
                                setInsta(e.target.value)
                            }}
                            value={instagram}
                            onClick={() => setInsta('')}
                            onBlur={() => instagram ? null : setInsta(socialNetworks.instagram)}
                        />
                    </div>
                    <div className="editor_blok">
                        <img className="editor_icons" src={linkedinSvg} alt="/" />
                        <input className="editor_inputs" type="text"
                            onChange={(e) => {
                                setLinkedin(e.target.value)
                            }}
                            value={linkedin}
                            onClick={() => setLinkedin('')}
                            onBlur={() => linkedin ? null : setLinkedin(socialNetworks.linkedin)}
                        />
                    </div>
                </div>

                <div className="editor_button_div">
                    <div className="edit_button" onClick={edit}>Edit Personal Info<img className="editor_button_icon" src={clickSvg} alt="/" /></div>
                </div>

            </div>


        </div>
    ) : null
    )
}