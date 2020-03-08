import React from "react"
import "./movie.scss"
class Movie extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { movie, expand } = this.props
        const { synopsis = "", title = "", imageUrl = "", releaseDate = "", rank = 0 } = movie
        console.log("expand id : ", expand)
        return (
            <div className={expand == movie.id ? "movie expand" : "movie"}>
                <div className="title">{rank}. {title}</div>
                <div className="image">
                    <img src={imageUrl} atl={`image-${title}`} />
                </div>
                {expand === +movie.id && <div className="info">
                    <div className="synopsis">{synopsis}</div>
                    <div className="release-date">{releaseDate}</div>
                </div>}
            </div>
        )
    }
}

export default Movie