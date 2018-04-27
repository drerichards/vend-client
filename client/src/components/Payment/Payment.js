import React, { Component } from "react"
import StripeCheckout from "react-stripe-checkout"
import { connect } from "react-redux"
import { Modal, Button, notification } from "antd"
import { storePurchase, clearCart } from "../../actions/index"

class Payment extends Component {
  handleToken(token, total){
    this.success(total)
    this.props.onPurchaseItems(this.props.user.username, token, this.props.subtotal * 100, this.props.cart)
    this.props.emptyCart()
  }

  success(total) {
    Modal.success({
      title: `Thank You for your Purchase of $${total}!`,
      content: `You can view your purchase on your Account Page`,
    });
  }

  openNotification(){
    const descrip = <div className='notifDescrip'>
        <h4>Email: <p>Choose any in Email Format</p></h4> <br/>
        <h4>Card #: <p>4242 4242 4242 4242</p></h4><br/>
        <h4>MM/YY: <p>11/22</p></h4>
        <h4>CVC: <p>111</p></h4>
      </div>
    notification['info']({
      placement: 'bottomRight',
      message: 'How To Pay',
      description: descrip,
      duration: 10
    })
  }

  render() {
    console.log(process.env.REACT_APP_STRIPE_KEY);
    
    const cartTotal = this.props.subtotal,
      payTotal = cartTotal * 100,
      description = `For your purchase of $${cartTotal}`
    return (
      <StripeCheckout
        name="Vendible"
        description={description}
        amount={payTotal}
        token={token => this.handleToken(token, cartTotal)}
        stripeKey={'pk_test_72k7afMyvAZApegkYfgmOPMp'}>
        {payTotal < 1 ?  <Button className="btn btn-info" disabled style={{ fontSize: "1em" }}>
          Checkout</Button> : <Button className="btn btn-info" onClick={ () => this.openNotification()}style={{ fontSize: "1em" }}>
          Checkout</Button>}
      </StripeCheckout>
    )
  }
}

const mapStateToProps = ({user, cart}) => {return {user, cart}}
const mapDispatchToProps = dispatch => {
    return { onPurchaseItems: (username, token, subtotal, purchase) => storePurchase(username, token, subtotal, purchase, dispatch), 
      emptyCart: () => clearCart(dispatch)}
}
export default connect(mapStateToProps, mapDispatchToProps)(Payment)
