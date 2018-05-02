import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Carousel, Button} from "antd"
import "./Home.css"

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="overlay">
          <Carousel
            vertical
            autoplay
            autoplaySpeed="10000"
            speed="2000"
            dots="false"
          >
            <div>
              <h1>All of the best brands</h1>
              <h3>All in one place!</h3>
            </div>
            <div>
              <h1>More stores. More value.</h1>
              <h3>More of what you want!</h3>
            </div>
            <div>
              <h1>What you’ve got in mind</h1>
              <h3>We’ve got inside!</h3>
            </div>
          </Carousel>
          <Link to="/stores">
            <Button type="primary">Shop Now!</Button>
          </Link>
        </div>
        <Carousel
          effect="fade"
          autoplay
          dots="false"
          autoplaySpeed="900"
          speed="1500"
        >
          <div />
          <div />
          <div />
          <div />
          <div />
        </Carousel>
      </div>
    )
  }
}

export default Home
