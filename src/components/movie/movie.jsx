import React, { useState } from "react"
import "./movie.scss"
import Description from "./../description/description"
const Movie = (props) => {
    // hook to control the visibility of the description
    const [expand, setExpand] = useState(false)

    // destructuring the props object to get the movie object
    const { movie } = props

    // destructuring the movie object
    const { synopsis = "", title = "", imageUrl = "", releaseDate = "", rank = 0 } = movie

    // deriving the className based on the expand value
    const className = expand ? "movie expand" : "movie"
    return (
        <div className={className} onClick={(evt) => { evt.preventDefault(); setExpand(!expand) }}>
            <div className="title">{rank}. {title}</div>
            <div className="image">
                <img src={imageUrl} atl={`image-${title}`} />
            </div>
            {expand && <Description synopsis={synopsis} releaseDate={releaseDate} />}
        </div>
    )
}

export default Movie