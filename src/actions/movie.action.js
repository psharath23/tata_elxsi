export const STORE_MOVIES = "STORE_MOVIES"
export const SET_CURRENT_ORDER = "SET_CURRENT_ORDER"
export const SET_RANK = 'SET_RANK'
class MovieActions {
    storeMovies = (movies) => ({
        type: STORE_MOVIES,
        payload: movies
    })

    setCurrentOrderBy = (orderBy) => ({
        type: SET_CURRENT_ORDER,
        payload: orderBy
    })

    setRank = (rank) => ({
        type:SET_RANK,
        payload: rank
    })
}
export default new MovieActions()