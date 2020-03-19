import React from "react"
import "./filter.scss"
const Filter = (props) => {
    const { setCurrentOrderBy, currentOrderBy, orderByItems} = props
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