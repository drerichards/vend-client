import React, { Component } from 'react'
import { connect } from "react-redux"
import { addToCart } from "../../actions/index"
import { Card, Icon, Button, message } from 'antd'
import './Products.css'

class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            brand: '',
            price: '',
            image: '',
            description: ''
        }
    }

    componentDidMount() {
        const firstProduct = this.props.inventory[0][0]
        if (this.props.inventory[1] === 'Atelier Lks' || this.props.inventory[1] === 'Nurbana') {
            this.setState(() => ({
                title: firstProduct.name,
                brand: firstProduct.brand,
                price: `$${firstProduct.skus[0].sale_price}`,
                image: firstProduct.image_urls["420x560"]["0"].url,
                description: firstProduct.content.description
            }))
        } else {
            this.setState(() => ({
                title: firstProduct.name,
                price: `$${firstProduct.salePrice}`,
                image: firstProduct.largeImage,
                description: firstProduct.shortDescription
            }))
        }
    }
    
    componentWillReceiveProps(nextProps){
        const newProduct = nextProps.inventory[0][0];
        if (nextProps.inventory[1] === 'Atelier Lks' || nextProps.inventory[1] === 'Nurbana') {
            this.setState(() => ({
                title: newProduct.name,
                brand: newProduct.brand,
                price: `$${newProduct.skus[0].sale_price}`,
                image: newProduct.image_urls["420x560"]["0"].url,
                description: newProduct.content.description
            }))
        } else {
            this.setState(() => ({
                title: newProduct.name,
                price: `$${newProduct.salePrice}`,
                image: newProduct.largeImage,
                description: newProduct.shortDescription
            }))
        }
    }

    onProductClick({ title, brand, price, image, description }) {
        this.setState(() => ({ title, brand, price, image, description }))
    }

    onDisplayAddClick() {
        const displayProdData = {
            title: this.state.title,
            brand: this.state.brand,
            price: this.state.price,
            image: this.state.image,
            description: this.state.description
        }
        this.onAddButtonClick(displayProdData)
    }

    itemAddSuccess(item) {
        message.success(`${item} added to your Shopping Cart!`);
    }

    onAddButtonClick(displayData) {
        this.props.onAddClick(displayData, this.props.inventory[1])
        this.itemAddSuccess(displayData.title)
    }

    showProducts() {
        const productData = this.props.inventory[0]
        
        if (productData) {
            return productData.map((product, i) => {
                if (this.props.inventory[1] === 'Atelier Lks' || this.props.inventory[1] === 'Nurbana') {
                    const displayData = {
                        title: product.name,
                        brand: product.brand,
                        image: product.image_urls["420x560"]["0"].url,
                        description: product.content.description
                    }
                    product.skus.length > 1 ? displayData.price = `$${product.skus[0]['sale_price']}` : displayData.price = '$49.99'
       
                    return <Card type="inner" title={`${displayData.brand} - ${displayData.title}`} key={i}
                        cover={<img className='displayImage' alt={displayData.title} src={product.image_urls["300x400"]["0"].url}
                            onClick={() => this.onProductClick(displayData)} />}
                        actions={[<Icon type="plus-circle" onClick={() => this.onAddButtonClick(displayData)} />, <p>{displayData.price}</p>]}>
                    </Card>
                } else {
                    const displayData = {
                        title: product.name,
                        price: `$${product.salePrice}`,
                        image: product.largeImage,
                        description: product.shortDescription
                    }
                    return <Card type="inner" title={`${displayData.title}`} key={i}
                        cover={<img className='displayImage' alt={displayData.title} src={displayData.image}
                            onClick={() => this.onProductClick(displayData)} />}
                        actions={[<Icon type="plus-circle" onClick={() => this.onAddButtonClick(displayData)} />, <p>{displayData.price}</p>]}>
                    </Card>
                }

              
            })
        }
    }

    render() {
        return <div className="Products">
            <div className="prod_display">
                <div className="prod_img">
                    <img src={this.state.image} alt={this.state.title} />
                </div>
                <div className="product_info">
                    <Card title={this.state.title}>
                        {this.state.brand ? <p>Brand: {this.state.brand}</p> : ''}
                        <p>Price: {this.state.price}</p>
                        <p>Details: {this.state.description}</p>
                    </Card>
                    <Button icon="plus-circle" size='small' onClick={() => this.onDisplayAddClick()}>Add to Cart</Button>
                </div>
            </div>
            <div className="prod_results">
                <Card title={`${this.props.inventory[1]}:  ${this.props.inventory[0] ? this.props.inventory[0].length : 0} Results`}>
                    {this.showProducts()}
                </Card>
            </div>

        </div>
    }
}

const mapStateToProps = ({ inventory }) => {
    return { inventory }
}
const mapDispatchToProps = dispatch => {
    return { onAddClick: (product, store) => addToCart(product, store, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(Products)