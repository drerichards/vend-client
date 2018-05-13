import React, {Component} from 'react'
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {logoutUser} from "../../actions/index"
import {Button, Menu, Icon} from "antd"
import Login from "./Login"
import NewUser from "./NewUser"
import "./Header.css"
const SubMenu = Menu.SubMenu;

class Header extends Component {
  constructor(){
    super()
      this.state = {
        windowWidth: undefined,
        windowHeight: undefined
      }
      this.handleResize = this.handleResize.bind(this)
  }

  handleResize(){
    this.setState({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
    })
  } 

  handleLogout(){
    this.props.onLogoutClick()
  }

  componentDidMount() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  }

  render() {
    return <div className="Header">
      <Link to="/">
        <h1>Vendible</h1>
      </Link>
      {!this.props.user.loggedIn
        ? <div className="menu_section login">
        {window.innerWidth <= 650 ? 
          <Menu
            onClick={this.handleClick}
            mode="horizontal">
            <SubMenu title={<span><Icon type="menu-unfold" /></span>}>
                <Menu.Item key="setting:1"><NewUser/></Menu.Item>
                <Menu.Item key="setting:2"><Login/></Menu.Item>
            </SubMenu>
          </Menu>:
          <div>
            <NewUser/><Login/>
          </div>
        }
          </div>
        : <div className="menu_section">
        {window.innerWidth <= 650 ? 
          <div>
            <p>Hello, {this.props.user.username}</p>        
            <Menu
              onClick={this.handleClick}
              mode="horizontal">
              <SubMenu title={<span><Icon type="menu-unfold" /></span>}>
                <Menu.Item key="setting:1">
                  <Link to="/cart">View Cart 
                    <Button shape="circle" icon="shopping-cart">
                      <sup>
                        <span>
                          <p>{this.props.cart.cartCount}</p>
                        </span>
                      </sup>
                    </Button> 
                  </Link>
                </Menu.Item>
                <Menu.Item key="setting:2">
                  <Link to="/stores">Stores</Link>
                </Menu.Item>
                <Menu.Item key="setting:3">
                  <Link to="/account">Account</Link>
                </Menu.Item>
                <Menu.Item key="setting:4">
                  <Button icon="logout" onClick={() => {this.handleLogout()}}>Logout</Button>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </div>
          :
          <div>
            <p>Hello, {this.props.user.username}</p>                  
            <Link to="/cart">
              <Button shape="circle" icon="shopping-cart">
                <sup>
                  <span>
                    <p>{this.props.cart.cartCount}</p>
                  </span>
                </sup>
              </Button>
            </Link>
            <Link to="/stores">Stores</Link>
            <Link to="/account">Account</Link>
            <Button icon="logout" onClick={() => {this.handleLogout()}}>Logout</Button>
          </div>
        }
        </div>
      }
    </div>
  }
}

const mapStateToProps = ({user, cart}) => {return {user, cart}}
const mapDispatchToProps = dispatch => {return {onLogoutClick: () => logoutUser(dispatch)}}
export default connect(mapStateToProps, mapDispatchToProps)(Header)