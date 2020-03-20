import { STORE_MOVIES, SET_CURRENT_ORDER } from "../actions/movie.action"
const initialState = {
    Top5Movies: {},
    CurrentOrderBy: "none",
    LastUpdated: 0
}

const MoviesReducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_MOVIES: {
            return {
                ...state,
                ...{ Top5Movies: action.payload, LastUpdated: new Date().getTime() }
            }
        }
        case SET_CURRENT_ORDER: {
            return {
                ...state,
                ...{ CurrentOrderBy: action.payload }
            }
        }
        default:
            return state
    }
}

export default MoviesReducer