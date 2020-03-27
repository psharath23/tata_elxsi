import { STORE_MOVIES, SET_CURRENT_ORDER, SET_RANK } from "../actions/movie.action"
const initialState = {
    Orders: [],
    Movies: [],
    CurrentOrderBy: "none",
    LastUpdated: 0,
    Rank: 0
}

const MoviesReducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_MOVIES: {
            return {
                ...state,
                ...{
                    LastUpdated: new Date().getTime(),
                    Movies: action.payload.movies,
                    Orders: action.payload.orders
                }
            }
        }
        case SET_CURRENT_ORDER: {
            return {
                ...state,
                ...{ CurrentOrderBy: action.payload }
            }
        }
        case SET_RANK: {
            return {
                ...state,
                ...{
                    Rank: action.payload
                }
            }
        }
        default:
            return state
    }
}

export default MoviesReducer