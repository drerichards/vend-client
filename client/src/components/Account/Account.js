import React, {Component} from 'react'
import {connect} from "react-redux";
import {fetchUserPurchases} from "../../actions/index"
import {Collapse, List, Avatar, Button, Modal} from "antd";
import "./Account.css"
const Panel = Collapse.Panel;

class Account extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false, 
            atelData : [],
            pokeData : [],
            nurbData : [],
            dateLabel: ''
        }
    }
    
    componentDidMount(){
        if(this.props.user.username){
            this.props.fetchPurchases(this.props.user.username)
        }
    }

  showModal(purchaseData, label) {
      this.setState(() =>  ({ 
          visible: true,
          atelData: purchaseData.atel,
          pokeData: purchaseData.poke,
          nurbData: purchaseData.nurb,
          dateLabel: label
        }));
  }

  handleOk(e) {
    this.setState(() => ({visible: false}))
  }

    formatTimestamp(time){
        const timestamp = new Date(time*1000);
        const dateFormat = timestamp.toDateString();
        let hours = timestamp.getHours();
        let meridiem 
        hours < 12 ? meridiem = 'AM' : meridiem = 'PM'
        hours === 0 ? hours = 12 : hours > 12 ? hours = hours - 12 : hours
        let minutes = "0" + timestamp.getMinutes();
        let seconds = "0" + timestamp.getSeconds();
        const timeFormat = `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)} ${meridiem}`;
        return `${dateFormat}   @   ${timeFormat}`
    }

    renderNoPurchases(){
        const data = this.props.purchases.userPurchases    
        return <List header={<div>{this.props.user.username}'s Purchase History:</div>} 
        footer={<div>Total: 0</div>} bordered size="large"><div className='ant-list-empty-text'>{data}</div></List>
    }
    
    renderPurchases() {
        const data = this.props.purchases.userPurchases
        return <List header={<div>{this.props.user.username}'s Purchase History:</div>} footer={<div>Total: {data.length}</div>} bordered size="large" dataSource={data}
            renderItem={item => (<List.Item actions={[<Button className="btn btn-info" style={{ fontSize: "1em" }} 
            onClick={() => this.showModal(item.purchaseItems, this.formatTimestamp(item.trans_details.timestamp))}>View Items</Button>]}>

            <List.Item.Meta title={this.formatTimestamp(item.trans_details.timestamp)}/>  
            <div>
                <h4>Payment Type: <span>{item.trans_details.pmt_type}</span></h4>
                <h4>Card Type: <span>{item.trans_details.cc_brand}</span></h4>
                <h4>Last 4: *<span>{item.trans_details.last4}</span></h4>
                <h4> Trans ID: <span>{item.trans_details.trans_id}</span></h4>
                <h4> Email: <span>{item.trans_details.user}</span></h4>
            </div>
                <div>${(item.trans_details.trans_amount / 100).toFixed(2)}</div>
            </List.Item>)}/>
    }

    renderCartList(data) {
        return (
            <List itemLayout="horizontal" dataSource={data} renderItem={(item, i) => (
                <List.Item>
                    <List.Item.Meta avatar={<Avatar src={item.image} />}
                    title={item.brand ? `${item.brand}  - ${item.title}` : item.title}/>
                    {item.price}
                </List.Item>
             )} />
        );
    }

    render() {
        return <div className='Account'>
            { this.props.purchases.userPurchases === 'Sorry! No Purchases to Display' ? this.renderNoPurchases() : this.renderPurchases()}
            <Modal title={this.state.dateLabel} visible={this.state.visible} onOk={() =>this.handleOk()} onCancel={() => this.handleOk()}
                footer={[<Button key="submit" type="primary" onClick={() => this.handleOk()}>Done</Button>]}>
                <Collapse bordered={false} accordion>
                    {this.state.atelData.length > 0 ? 
                    <Panel header={<div><h3>Atelier Lks: </h3> {this.state.atelData.length} Items</div>} key="1">
                    {this.renderCartList(this.state.atelData, "atel")}</Panel> : ''}

                    {this.state.pokeData.length > 0 ? 
                     <Panel header={<div><h3>Poketo: </h3> {this.state.pokeData.length} Items</div>} key="2">
                    {this.renderCartList(this.state.pokeData, "poke")}</Panel> : ''}

                    {this.state.nurbData.length > 0 ? 
                    <Panel header={<div><h3>Nurbana: </h3> {this.state.nurbData.length} Items</div>} key="3">
                    {this.renderCartList(this.state.nurbData, "nurb")}</Panel> : ''}
                </Collapse>
            </Modal>
        </div>
    }
}

const mapStateToProps = ({user, purchases}) => { return {user, purchases}};
const mapDispatchToProps = dispatch => {
    return {fetchPurchases: username => fetchUserPurchases(username, dispatch)}
}
export default connect(mapStateToProps, mapDispatchToProps)(Account);