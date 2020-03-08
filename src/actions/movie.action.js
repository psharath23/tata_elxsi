export const STORE_MOVIES = "STORE_MOVIES"
export const SET_CURRENT_ORDER = "SET_CURRENT_ORDER"
class MovieActions {
    storeMovies = (movies) => ({
        type: STORE_MOVIES,
        payload: movies
    })

    setCurrentOrderBy = (orderBy) => ({
        type: SET_CURRENT_ORDER,
        payload: orderBy
    })
}
export default new MovieActions()