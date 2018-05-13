import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { fetchAtelProducts, fetchPokeProducts, fetchNurbProducts } from "../../actions/index"
import { Card, Col, Row, Menu, Dropdown, Icon } from "antd"
import "./Stores.css"
const SubMenu = Menu.SubMenu

class Stores extends Component {
  render() {
    const onAtelClick = ({ key }) => {
      this.props.forAtelClick(key)
    }

    const onPokeClick = ({ key }) => {
      this.props.forPokeClick(key)
    }
    const onNurbClick = ({ key }) => {
      this.props.forNurbClick(key)
    }

    const atelMenu = (
      <Menu onClick={onAtelClick}>
        <SubMenu title="Women's">
          <Menu.Item key="womens/tops"><Link to="/products">Tops & Tees</Link></Menu.Item>
          <Menu.Item key="womens/rompers"><Link to="/products">Rompers</Link></Menu.Item>
          <Menu.Item key="womens/dresses"><Link to="/products">Dresses</Link></Menu.Item>
          <Menu.Item key="womens/denim"><Link to="/products">Denim</Link></Menu.Item>
          <SubMenu title="Shoes">
            <Menu.Item key="womens/opentoes"><Link to="/products">Open Toes</Link></Menu.Item>
            <Menu.Item key="womens/flats"><Link to="/products">Flats</Link></Menu.Item>
            <Menu.Item key="womens/heels"><Link to="/products">Heels</Link></Menu.Item>
          </SubMenu>
          <Menu.Item key="womens/perfume"><Link to="/products">Perfume</Link></Menu.Item>
        </SubMenu>
        <SubMenu title="Men's">
          <Menu.Item key="mens/tees"><Link to="/products">Tees & Tanks</Link></Menu.Item>
          <Menu.Item key="mens/shirts"><Link to="/products">Shirts</Link></Menu.Item>
          <Menu.Item key="mens/outerwear"><Link to="/products">Outerwear</Link></Menu.Item>
          <Menu.Item key="mens/pants"><Link to="/products">Pants</Link></Menu.Item>
          <SubMenu title="Shoes">
            <Menu.Item key="mens/boots"><Link to="/products">Boots</Link></Menu.Item>
            <Menu.Item key="mens/sneakers"><Link to="/products">Sneakers</Link></Menu.Item>
            <Menu.Item key="mens/casual"><Link to="/products">Casual</Link></Menu.Item>
          </SubMenu>
          <Menu.Item key="mens/eyewear"><Link to="/products">Eyewear</Link></Menu.Item>
        </SubMenu>
      </Menu>
    )
    const pokeMenu = (
      <Menu onClick={onPokeClick}>
        <Menu.Item key="tvs">
          <Link to="/products">TVs</Link>
        </Menu.Item>
        <Menu.Item key="computers">
          <Link to="/products">Computers</Link>
        </Menu.Item>
        <SubMenu title="Video Games">
          <Menu.Item key="videogames/ps4"><Link to="/products">Playstation 4</Link></Menu.Item>
          <Menu.Item key="videogames/xboxone"><Link to="/products">Xbox One</Link></Menu.Item>
          <Menu.Item key="videogames/switch"><Link to="/products">Nintendo Switch</Link></Menu.Item>
        </SubMenu>
        <Menu.Item key="tablets">
          <Link to="/products">iPads & Tablets</Link>
        </Menu.Item>
        <SubMenu title="Wearable Tech">
          <Menu.Item key="wearables/smartwatch"><Link to="/products">Smart Watch</Link></Menu.Item>
          <Menu.Item key="wearables/headphones"><Link to="/products">Headphones</Link></Menu.Item>
          <Menu.Item key="wearables/activitytracker"><Link to="/products">Activity Tracker</Link></Menu.Item>
        </SubMenu>
      </Menu>
    )
    const nurbMenu = (
      <Menu onClick={onNurbClick}>
        <Menu.Item key="furniture">
          <Link to="/products">Home Furniture</Link>
        </Menu.Item>
        <Menu.Item key="kitchen">
          <Link to="/products">Kitchen</Link>
        </Menu.Item>
        <SubMenu title="Bed & Bath">
          <Menu.Item key="bedbath/bedding"><Link to="/products">Bedding</Link></Menu.Item>
          <Menu.Item key="bedbath/bath"><Link to="/products">Bath</Link></Menu.Item>
        </SubMenu>
        <Menu.Item key="decor">
          <Link to="/products">Decor</Link>
        </Menu.Item>
      </Menu>
    )

    return (
      <div className="Stores">
        <h1>Select a Store Department</h1>
        <Row gutter={16}>
        <Col span={8}>
        <Card hoverable title={
          <Dropdown placement="bottomCenter" overlay={atelMenu}>
              <div>
                <img src="https://res.cloudinary.com/andrerichards/image/upload/v1519781397/vend/atelier.png" alt="atelier" />
              </div>
            </Dropdown>
          } cover={<noscript />} />
      </Col>
      <Col span={8}>
      <Card hoverable title={
        <Dropdown placement="bottomCenter" overlay={pokeMenu}>
              <div>
                <img src="https://res.cloudinary.com/andrerichards/image/upload/v1519781397/vend/poketo.png" alt="poketo" />
              </div>
            </Dropdown>
          } cover={<noscript />} />
      </Col>
      <Col span={8}>
      <Card hoverable title={
        <Dropdown placement="bottomCenter" overlay={nurbMenu}>
            <div>
              <img src="https://res.cloudinary.com/andrerichards/image/upload/v1519781397/vend/nurbana.png" alt="nurbana" />
            </div>
            </Dropdown>
          } cover={<noscript />} />
      </Col>
        </Row>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    forAtelClick: dept => fetchAtelProducts(dept, dispatch),
    forPokeClick: dept => fetchPokeProducts(dept, dispatch),
    forNurbClick: dept => fetchNurbProducts(dept, dispatch)
  }
}
export default connect(null, mapDispatchToProps)(Stores)
