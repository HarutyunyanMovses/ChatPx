import React from "react";
import email from "./icons/email.svg";
import phone from "./icons/phone.svg";
import fb from "./icons/facebook.svg";
import insta from "./icons/instagram.svg";
import linkedin from "./icons/linkedin.svg";
import { useSelector } from "react-redux";
import "./section3.css";

function PersonalinfoOpened() {
  const userinfo = useSelector(state => state.setChangeSection2.changeSection2);
  const info = userinfo.contacts

  if (!info.socialNetworks) {
    return (
      <div className="personalinfoOpened">
        <div className="section3Icons">
          <img src={email} alt="/" />
          <img src={phone} alt="/" />
          <img src={fb} alt="/" />
          <img src={insta} alt="/" />
          <img src={linkedin} alt="/" />
        </div>
        <div className="section3Disc section3Icons">
          <p>{info.email ? <a href={info.email}>{info.email}</a> : "Email"}</p>
          <p>{info.Phone ? <a href={info.Phone}>{info.Phone}</a> : "Phone"}</p>
          <p>fb.com/...</p>
          <p>instagram.com/...</p>
          <p>linkedin.com/...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {console.log(info)}
      <div className="personalinfoOpened">
        <div className="section3Icons">
          <img src={email} alt="/" />
          <img src={phone} alt="/" />
          <img src={fb} alt="/" />
          <img src={insta} alt="/" />
          <img src={linkedin} alt="/" />
        </div>
        <div className="section3Disc section3Icons">
          <p>{info.email !== "{...}.email.ru" ? <a href={info.email}>{info.email}</a> : "Email"}</p>
          <p>{info.Phone !== "+374(98)..." ? <a href={info.Phone}>{info.Phone}</a> : "Phone"}</p>
          <p>
            {info.socialNetworks.fb !== "FaceBook.com" ? (
              <a href={info.socialNetworks.fb} target="_blank" rel="noreferrer">
                {
                  info.socialNetworks.fb
                }
              </a>
            ) : (
              "FaceBook.com"
            )}
          </p>
          <p>
            {info.socialNetworks.instagram !== "Instagran.com" ? (
              <a href={info.socialNetworks.instagram} target="_blank" rel="noreferrer">
                {
                  info.socialNetworks.instagram}
              </a>
            ) : (
              "Instagram.com"
            )}
          </p>
          <p>
            {info.socialNetworks.linkedin !== "Linkedin.com" ? (
              <a href={info.socialNetworks.linkedin} target="_blank" rel="noreferrer">
                {
                  info.socialNetworks.linkedin}
              </a>
            ) : (
              "Linkedin.com"
            )}
          </p>
        </div>
      </div>
    </>
  );
}

export default PersonalinfoOpened;
