import axios from "axios"
import {CREATE_USER} from './types'
import {LOGIN_USER} from './types'
import {LOGOUT_USER} from './types'
import { FETCH_ATEL_PRODUCTS } from "./types"
import { FETCH_POKE_PRODUCTS } from "./types"
import {FETCH_NURB_PRODUCTS} from "./types"
import {FETCH_USER_PURCHASES} from "./types"
import { ADD_TO_CART } from "./types"
import {REMOVE_FROM_CART} from "./types"
import {CLEAR_CART} from "./types"
import { STORE_PURCHASE } from "./types"
const url = "https://lit-dusk-56061.herokuapp.com"

export const createUser = (userBody, dispatch) => {
  try {
    const route = `${url}/api/users`
    axios.post(route, userBody)
        .then(response => {
                dispatch({ type: CREATE_USER, payload: { loggedIn: true, username: response.data.username, status: '' } })
            })
            .catch(error => {
                dispatch({ type: CREATE_USER, payload: { loggedIn: false, username: null, status: error.response.data.message } })
            })
    } catch (error) {
        return error
    }
}

export const loginUser = (userBody, dispatch) => {
    try {
        const route = `${url}/api/auth/login`
        axios.post(route, userBody)
            .then(response => {
                dispatch({ type: LOGIN_USER, payload: { loggedIn: true, username: userBody.username, status: '' } })
            })
            .catch(error => {
                dispatch({ type: LOGIN_USER, payload: { loggedIn: false, username: null, status: 'Incorrect username or password' } })
            })
    } catch (error) {
        return error
    }
}

export const logoutUser = dispatch => {
    try {
        localStorage.clear()
        dispatch({ type: LOGOUT_USER, payload: { loggedIn: false, username: null, status: '' } })
    } catch (error) {
        return error
    }
}

export const fetchAtelProducts = (dept, dispatch) => {
  try {
    axios.get(`${url}/products/atelier/${dept}`)
      .then(response => {
        dispatch({ type: FETCH_ATEL_PRODUCTS, payload: [response.data, "Atelier Lks"] })
      }).catch(error => { return error })
  } catch (error) { return error }
}

export const fetchPokeProducts = (dept, dispatch) => {
  try {
    axios.get(`${url}/products/poketo/${dept}`)
      .then(response => {
        dispatch({ type: FETCH_POKE_PRODUCTS, payload: [response.data, "Poketo"] })
      }).catch(error => { return error })
  } catch (error) { return error }
}

export const fetchNurbProducts = (dept, dispatch) => {
  try {
    axios.get(`${url}/products/nurbana/${dept}`)
      .then(response => {
        dispatch({ type: FETCH_NURB_PRODUCTS, payload: [response.data, "Nurbana"] })
      }).catch(error => { return error })
  } catch (error) { return error }
}

export const fetchUserPurchases = (username, dispatch) => {
  try {
    axios.get(`${url}/user_purchases/${username}`)
      .then(response => {
        dispatch({ type: FETCH_USER_PURCHASES, payload: response.data })
      }).catch(error => { return error })
  } catch (error) { return error }
}

export const addToCart = (productInfo, store, dispatch) => {
  try {
    dispatch({ type: ADD_TO_CART, payload: [productInfo, store] })
  } catch (error) { return error }
}

export const removeFromCart = (store, index, dispatch) => {
  try {
    dispatch({ type: REMOVE_FROM_CART, payload: [store, index] })
  } catch (error) { return error }
}

export const clearCart = dispatch => {
  try { dispatch({ type: CLEAR_CART})
  } catch (error) { return error }
}

export const storePurchase = (username, token, subtotal, purchase, dispatch) => {
  try {
      axios.post(`${url}/payment/stripe`, [subtotal, token])
      .then(response => {
        dispatch({ type: STORE_PURCHASE, payload: { purchaseItems: purchase, trans_details: response.data } })
        axios.post(`${url}/user_purchases/add/${username}`, { purchaseItems: purchase, trans_details: response.data })
      })
  } catch (error) { return error }
}
