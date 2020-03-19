import React from "react"
import MovieAction from "../../actions/movie.action";
import { store } from "../../store";
import { connect } from "react-redux"
import Service from "../../service/index"
import { withRouter } from "react-router-dom"
import Movie from "../../components/movie/movie"
import "./movies.scss"
import Loader from "./../../components/loader/loader"
import Filter from "./../../components/filter/filter"
class Movies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentOrderBy: "",
            expand: 0,
            rank: 0,
            loading: true
        }
    }

    componentDidMount() {
        const rank = (this.props.match.params && this.props.match.params["rank"]) || 0
        this.setState({ rank })
        const { lastUpdated } = this.props
        const now = new Date().getTime()
        const diff = Math.abs(now - lastUpdated) / 1000;
        const diffMins = Math.floor(diff / 60) % 60;
        // here we can manipulate the below condition as per our requirement to fetch the latest data after certain time has passed.
        if (diffMins > 59) {
            Service.get("./movies")
                .then((response) => {
                    this.setState({ loading: false })
                    store.dispatch(MovieAction.storeMovies(response.body))
                })
        } else {
            this.setState({ loading: false })
        }
    }

    toggleInfo = (id) => {
        const { expand } = this.state;
        this.setState({
            expand: expand == id ? 0 : id
        })
    }

    setCurrentOrderBy = (evt) => {
        evt.preventDefault()
        const orderBy = evt.target.value;
        store.dispatch(MovieAction.setCurrentOrderBy(orderBy))
    }

    order = (a, b, currentOrderBy) => {
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

    render() {
        const { top5movies = {}, currentOrderBy } = this.props
        const { components = [] } = top5movies
        const orderByItems = (components.find((comp) => comp.type === "order-select") || { items: [] }).items
        const movies = components.find((comp) => comp.type === "movie-list") || {}
        const { items = [] } = movies
        const { rank, loading } = this.state
        const filteredItems = items
            .sort((a, b) => this.order(a, b, currentOrderBy))
            .filter((movie) => (rank && !isNaN(rank)) ? +rank === movie.rank : movie)
        return (
            <div className="movies-page">
                <div className="movies-heading">
                    {rank ? `Movie with Rank ${rank}` : "Recommended Movies from the 80's"}
                </div>
                {
                    !rank &&
                    <Filter
                        currentOrderBy={currentOrderBy}
                        orderByItems={orderByItems}
                        setCurrentOrderBy={this.setCurrentOrderBy}
                    />
                }
                <div className="movies-list">
                    {
                        filteredItems.map((movie) => (
                            <Movie movie={movie} key={`movie-${movie.id}`} />
                        ))
                    }
                    {
                        loading && <Loader contentName="movies" />
                    }
                    {
                        !loading && filteredItems.length === 0 && <div className="no-recs-found">No movies found</div>
                    }
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    console.log({ state })
    return ({
        top5movies: state.MoviesReducer.Top5Movies,
        currentOrderBy: state.MoviesReducer.CurrentOrderBy,
        lastUpdated: state.MoviesReducer.LastUpdated
    });
};
let mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch
});
export default connect(mapStateToProps,
    mapDispatchToProps)(withRouter(Movies));