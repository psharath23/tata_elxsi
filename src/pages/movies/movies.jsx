import React from "react"
import MovieAction from "../../actions/movie.action";
import { store } from "../../store";
import { connect } from "react-redux"
import Service from "../../service/index"
import { withRouter } from "react-router-dom"
import Movie from "../../components/movie/movie"
import "./movies.scss"
class Movies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentOrderBy: "",
            expand: 0,
            rank: 0
        }
    }

    componentDidMount() {
        const rank = (this.props.match.params && this.props.match.params["rank"]) || 0
        this.setState({ rank })
        Service.get("./movies")
            .then((response) => {
                store.dispatch(MovieAction.storeMovies(response.body))
            })
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
        const { expand, rank } = this.state
        console.log("expand:", expand)
        return (
            <div className="movies-page">
                <div className="movies-heading">
                    {rank ? `Movie with Rank ${rank}` : "Recommended Movies from the 80's"}
                </div>
                {!rank && <div className="movies-orderby">
                    <select className="order-select" onChange={this.setCurrentOrderBy} value={currentOrderBy}>
                        <option key={`label-none`} value={"none"}>none</option>
                        {
                            orderByItems.map((orderItem) => {
                                return (
                                    <option key={`label-${orderItem.valueToOrderBy}`} value={orderItem.valueToOrderBy}>
                                        {orderItem.label}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>}
                <div className="movies-list">
                    {
                        items
                            .sort((a, b) => this.order(a, b, currentOrderBy))
                            .filter((movie) => (rank && !isNaN(rank)) ? +rank === movie.rank : movie)
                            .map((movie) =>
                                <div id={movie.id} onClick={(evt) => { evt.preventDefault(); this.toggleInfo(movie.id) }} key={`movie-${movie.id}`}>
                                    <Movie movie={movie} expand={expand} key={`movie-${movie.id}-expand-${expand}`} />
                                </div>
                            )
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
        currentOrderBy: state.MoviesReducer.CurrentOrderBy
    });
};
let mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch
});
export default connect(mapStateToProps,
    mapDispatchToProps)(withRouter(Movies));