import React, {useCallback} from "react"
import {useSelector, useDispatch} from "react-redux";
import MovieAction from "./../../actions/movie.action"
import "./filter.scss"
const Filter = (props) => {
    const orderByItems = useSelector(state=> state.MoviesReducer.Orders)
    const currentOrderBy = useSelector(state=> state.MoviesReducer.CurrentOrderBy)
    const dispatch = useDispatch()
    const setCurrentOrderBy = useCallback((evt)=>{
        evt.preventDefault()
        const value = evt.target.value
        dispatch(MovieAction.setCurrentOrderBy(value))
    })
    return (
        <div className="movies-orderby">
            <select className="order-select" onChange={setCurrentOrderBy} value={currentOrderBy}>
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
        </div>
    )
}

export default Filter