import React from "react"
import "./movies_heading.scss"
import { useSelector } from "react-redux"
const MoviesHeading = () => {
    const rank = useSelector(state => state.MoviesReducer.Rank)
    return (
        <div className="movies-heading">
            {rank ? `Movie with Rank ${rank}` : "Recommended Movies from the 80's"}
        </div>
    )
}

export default MoviesHeading