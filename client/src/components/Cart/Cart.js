import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeFromCart } from "../../actions/index";
import { Collapse, List, Avatar, Button, Icon, message } from "antd";
import Payment from "../Payment/Payment"
import "./Cart.css";
const Panel = Collapse.Panel;

class Cart extends Component {
  renderCartList(data, store) {
    return (
      <List itemLayout="horizontal" dataSource={data} renderItem={(item, i) => (
          <List.Item>
            <List.Item.Meta avatar={<Avatar src={item.image} />}
              title={item.brand ? `${item.brand}  - ${item.title}` : item.title}
              description={item.description}/>
            {item.price}
            <Icon type="delete" onClick={(e, index) => this.deleteItem(e, i)} className={store} />
          </List.Item>
        )} />
    );
  }

  deleteItem(e, i) {
    const store = e.target.className.substr(-4);
    this.props.onDeleteClick(store, i);
    message.error(`Item removed from your Shopping Cart!`);
  }

  getSubtotal(data) {
    const subtotalArr = [];
    const add = (total, num) => {
      return total + num;
    };
    for (let i = 0; i < data.length; i++) {
      let deptData = data[i];
      for (let i = 0; i < deptData.length; i++) {
        subtotalArr.push(parseFloat(deptData[i].price.replace("$", "")));
      }
    }
    if (subtotalArr.length > 0){
      return subtotalArr.reduce(add).toFixed(2);
    } else return 0
  }

  render() {
    const atelData = this.props.cart.atel;
    const pokeData = this.props.cart.poke;
    const nurbData = this.props.cart.nurb;
    const subtotal = this.getSubtotal([atelData, pokeData, nurbData])
    
    return (
      <div className="Cart">
        <Collapse bordered={false} accordion defaultActiveKey={["1"]}>
          <Panel header={<div><h3>Atelier Lks: </h3> {atelData.length} Items</div>} key="1">
            {atelData.length > 0 ? (this.renderCartList(atelData, "atel")) : 
            (<Link to="/stores"><Button>Shop Atelier Lks Store</Button></Link>)
            }
          </Panel>
          <Panel header={<div><h3>Poketo: </h3> {pokeData.length} Items</div>} key="2">
            {pokeData.length > 0 ? (this.renderCartList(pokeData, "poke")) : (
              <Link to="/stores"><Button>Shop Poketo Store</Button></Link>
            )}
          </Panel>
          <Panel header={<div><h3>Nurbana: </h3> {nurbData.length} Items</div>} key="3">
            {nurbData.length > 0 ? (this.renderCartList(nurbData, "nurb")) : (
              <Link to="/stores"><Button>Shop Nurbana Store</Button></Link>
            )}
          </Panel>
        </Collapse>
        <div className="subtotal_section">
          <h3>Subtotal: ${subtotal}</h3>
          <Payment  subtotal={subtotal}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ cart }) => {
  return {cart};
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteClick: (store, index) => removeFromCart(store, index, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
