import { FETCH_ATEL_PRODUCTS, FETCH_POKE_PRODUCTS, FETCH_NURB_PRODUCTS} from "../actions/types"

export default function (state = { products: [] }, action) {
    switch (action.type) {
        case FETCH_ATEL_PRODUCTS:
            return action.payload
        case FETCH_POKE_PRODUCTS:
            return action.payload
        case FETCH_NURB_PRODUCTS:
            return action.payload
        default:
            return state
    }
}