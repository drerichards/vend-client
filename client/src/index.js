import React from "react"
import ReactDOM from "react-dom"
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import { createLogger } from "redux-logger"
import { composeWithDevTools } from "redux-devtools-extension"
import { loadState, saveState } from "./localStorage"
import reducers from "./reducers"
import App from "./components/App/App"
import "./index.css"
import registerServiceWorker from "./registerServiceWorker"

const enhancer = composeWithDevTools(applyMiddleware(thunk, createLogger({ collapsed: true })))
const persistedState = loadState()
const store = createStore(reducers, persistedState, enhancer)
store.subscribe(() => saveState(store.getState()))
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"))
registerServiceWorker()
