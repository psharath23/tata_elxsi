import React from "react"
import "./loader.scss"
const Loader = (props) => {
    // destructuring props to get contentName
    const { contentName = "" } = props
    return (
        <div className="loading-container">
            <div className="loading-text">
                <span className="text">
                    loading <b>{contentName}</b>, please wait </span><span className="loading-dots">
                </span>
            </div>
        </div>)
}
export default Loader