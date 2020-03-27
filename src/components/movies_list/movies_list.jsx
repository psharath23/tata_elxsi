import React from "react"
import {useSelector} from "react-redux"
import "./movies_list.scss"
import Loader from "./../loader/loader"
import Movie from "./../movie/movie"
import { useMemo } from "react"
const MoviesList = (props) => {
    const order = (a, b, currentOrderBy) => {
        if (currentOrderBy === "none") {
            return 1
        }
        const currentOrderByA = (`${a[currentOrderBy]}`).toUpperCase();
        const currentOrderByB = (`${b[currentOrderBy]}`).toUpperCase();

        let comparison = 0;
        if (currentOrderByA > currentOrderByB) {
            comparison = 1;
        } else if (currentOrderByA < currentOrderByB) {
            comparison = -1;
        }
        return comparison;
    }

    const filterItems = (items=[]) => {
        return items
        .sort((a, b) => order(a, b, currentOrderBy))
        .filter((movie) => (rank && !isNaN(rank)) ? +rank === movie.rank : movie)
    }
    const movies = useSelector(state=> state.MoviesReducer.Movies || [])
    const currentOrderBy = useSelector(state=> state.MoviesReducer.CurrentOrderBy || "none")
    const rank = useSelector(state=> state.MoviesReducer.Rank)
    const filteredItems = useMemo(()=>filterItems(movies),[movies,currentOrderBy])
    return (
        <div className="movies-list">
            {
                filteredItems.map((movie) => (
                    <Movie movie={movie} key={`movie-${movie.id}`} />
                ))
            }
            {
                filteredItems.length === 0 && <div className="no-recs-found">No movies found</div>
            }
        </div>
    )
}

export default MoviesList