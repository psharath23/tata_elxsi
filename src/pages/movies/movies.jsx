import React from "react"
import MovieAction from "../../actions/movie.action";
import { store } from "../../store";
import { connect } from "react-redux"
import Service from "../../service/index"
import { withRouter } from "react-router-dom"
import "./movies.scss"
import Filter from "./../../components/filter/filter"
import MoviesList from "./../../components/movies_list/movies_list"
import Loader from "../../components/loader/loader";
import MoviesHeading from "./../../components/movies_heading/movies_heading"
class Movies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentOrderBy: "",
            rank: 0,
            loading: true
        }
    }

    fetchTop5MoviesData = () => {
        Service.get("./movies")
            .then((response) => {
                this.setState({ loading: false })
                const top5movies = response.body
                const { components } = top5movies
                const orderSelect = components.find((component) => component.type === "order-select") || { items: [] }
                const movieList = components.find((component) => component.type === "movie-list")
                const orders = orderSelect && orderSelect.items ? orderSelect.items : []
                const movies = movieList && movieList.items ? movieList.items : []
                store.dispatch(MovieAction.storeMovies({
                    orders, movies
                }))
            })
    }

    componentDidMount() {
        const rank = (this.props.match.params && this.props.match.params["rank"]) || 0
        store.dispatch(MovieAction.setRank(rank))
        const { lastUpdated = 0 } = this.props
        if (+lastUpdated === 0) {
            this.fetchTop5MoviesData()
        } else {
            const now = new Date().getTime()
            const diff = Math.abs(now - lastUpdated) / 1000;
            const diffMins = Math.floor(diff / 60) % 60;
            // here we can manipulate the below condition as per our requirement to fetch the latest data after certain time has passed.
            if (diffMins > 59) {
                this.fetchTop5MoviesData()
            } else {
                this.setState({ loading: false })
            }
        }
    }

    render() {
        const { top5movies = {} } = this.props
        const { components = [] } = top5movies
        const orderByItems = (components.find((comp) => comp.type === "order-select") || { items: [] }).items
        const movies = components.find((comp) => comp.type === "movie-list") || {}
        const { items = [] } = movies
        const { rank, loading } = this.state
        return (
            <div className="movies-page">
                <MoviesHeading />
                {
                    !rank &&
                    <Filter />
                }
                {
                    !loading && <MoviesList />
                }
                {
                    loading && <Loader contentName="movies" />
                }
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    // cleaned this up, remove all othe store values
    return ({
        lastUpdated: state.MoviesReducer.LastUpdated
    });
};
let mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch
});
export default connect(mapStateToProps,
    mapDispatchToProps)(withRouter(Movies));