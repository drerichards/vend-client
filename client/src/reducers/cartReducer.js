import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../actions/types"

export default function (state = { atel: [], poke: [], nurb: [], cartCount: 0 }, action) {
    switch (action.type) {
        case ADD_TO_CART:
            switch (action.payload[1]) {
                case 'Atelier Lks':
                    const atelState = {
                        ...state,
                        atel: [...state.atel, action.payload[0]],
                        cartCount: ++state.cartCount
                    }
                    return atelState
                case 'Poketo':
                    const pokeState = {
                        ...state,
                        poke: [...state.poke, action.payload[0]],
                        cartCount: ++state.cartCount
                    }
                    return pokeState
                case 'Nurbana':
                    const nurbState = {
                        ...state,
                        nurb: [...state.nurb, action.payload[0]],
                        cartCount: ++state.cartCount
                    }
                    return nurbState
                default:
                    return state
            }
        case REMOVE_FROM_CART:
            switch (action.payload[0]) {
                case 'atel':
                    const atelArr = [...state.atel]
                    atelArr.splice(action.payload[1], 1)
                    const atelSplice = {
                        ...state,
                        atel: atelArr,
                        cartCount: --state.cartCount
                    }
                    return atelSplice
                case 'poke':
                    const pokeArr = [...state.poke]
                    pokeArr.splice(action.payload[1], 1)
                    const pokeSplice = {
                        ...state,
                        poke: pokeArr,
                        cartCount: --state.cartCount
                    }
                    return pokeSplice
                case 'nurb':
                    const nurbArr = [...state.nurb]
                    nurbArr.splice(action.payload[1], 1)
                    const nurbSplice = {
                        ...state,
                        nurb: nurbArr,
                        cartCount: --state.cartCount
                    }
                    return nurbSplice
                default:
                    return state
            }
        case CLEAR_CART:
        const emptyState = {
             ...state, atel: [], poke: [], nurb: [], cartCount: 0
            }
            return emptyState
        default:
            return state
    }
}