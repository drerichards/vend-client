import {FETCH_USER_PURCHASES, STORE_PURCHASE} from "../actions/types";

export default function(state = { userPurchases: [] }, action) {
  switch (action.type) {
    case FETCH_USER_PURCHASES:
      const fetchState = {...state, userPurchases: action.payload}
      return fetchState
    case STORE_PURCHASE:
      const purchaseState = {
        ...state, userPurchases: [...state.userPurchases, action.payload]
      }
      return purchaseState;
    default:
      return state;
  }
}
