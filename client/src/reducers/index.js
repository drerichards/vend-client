import { combineReducers } from "redux"
import userReducer from "./userReducer"
import inventoryReducer from "./inventoryReducer"
import cartReducer from "./cartReducer";
import purchasesReducer from "./purchasesReducer"

export default combineReducers({
    user: userReducer,
    inventory: inventoryReducer,
    cart: cartReducer,
    purchases: purchasesReducer
})