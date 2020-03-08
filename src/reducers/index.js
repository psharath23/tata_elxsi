import MoviesReducer from "./movies.reducer"
import { combineReducers } from "redux"

const rootReducer = combineReducers({ MoviesReducer })

export default rootReducer