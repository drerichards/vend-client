import React, { Component } from "react"
import { Router, Route, Redirect, Switch } from "react-router-dom"
import { connect } from "react-redux"
import createHistory from "history/createBrowserHistory"
import ErrorBoundary from "../ErrorBoundary"
import Home from "../Home/Home"
import Header from "../Header/Header"
import Stores from "../Stores/Stores"
import Products from "../Products/Products"
import Account from "../Account/Account"
import Cart from "../Cart/Cart"
import "./App.css"

export const history = createHistory()
class App extends Component {
  render() {
    if(!this.props.user.loggedIn){
     return <Router history={history}>
      <Switch>
        <div className="App">        
          <ErrorBoundary>
            <Header />
          </ErrorBoundary>
          <ErrorBoundary>
            <Route exact path="/" component={Home} />
          </ErrorBoundary>
          <Redirect to={{pathname: '/'}}/> 
        </div>    
      </Switch>
    </Router>       
    } else return <Router history={history}>
        <Switch>
          {/* root */}
          <ErrorBoundary>
            <div className="App">
              {/* header */}
              <ErrorBoundary>
                <Header />
              </ErrorBoundary>
              {/* home */}
              <ErrorBoundary>
                <Route exact path="/" component={Home} />
              </ErrorBoundary>

              {/* stores */}
              <ErrorBoundary>
                <Route path="/stores" component={Stores} />
              </ErrorBoundary>

              {/* products */}
              <ErrorBoundary>
                <Route path="/products" component={Products} />
              </ErrorBoundary>

              {/* account */}
              <ErrorBoundary>
                <Route path="/account" component={Account} />
              </ErrorBoundary>

              {/* cart */}
              <ErrorBoundary>
                <Route path="/cart" component={Cart} />
              </ErrorBoundary>
            </div>
          </ErrorBoundary>
        </Switch>
      </Router>
  }
}

const mapStateToProps = ({user}) => { return {user}};
export default connect(mapStateToProps)(App);