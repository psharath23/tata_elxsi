import React from "react"
import "./description.scss"
const Description = (props) => {
    // destructuring the props to get the synopsis and releaseDate
    const { synopsis = "", releaseDate = "" } = props
    return (
        <div className="description">
            <div className="synopsis">{synopsis}</div>
            <div className="release-date">{releaseDate}</div>
        </div>
    )
}

export default Description