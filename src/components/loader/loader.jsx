import React from "react"
import "./loader.scss"
const Loader = (props) => (
    <div className="loading-container">
        <div className="loading-text"><span className="text">loading <b>{props.contentName}</b>, please wait </span><span className="loading-dots"></span></div>
    </div>
)
export default Loader