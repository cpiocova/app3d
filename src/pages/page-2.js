import React, {Component} from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

import './page-2.css'

class Loader extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="scene">
        <div className="container">

          <div className="container-box1">
            <div className="box1">
              <div className="box-face box-face--front"></div>
              <div className="box-face box-face--back"></div>
              <div className="box-face box-face--right"></div>
              <div className="box-face box-face--left"></div>
              <div className="box-face box-face--top"></div>
              <div className="box-face box-face--bottom"></div>
            </div>
          </div>

          <div className="container-box2">
            <div className="box2">
              <div className="box-face box-face--front"></div>
              <div className="box-face box-face--back"></div>
              <div className="box-face box-face--right"></div>
              <div className="box-face box-face--left"></div>
              <div className="box-face box-face--top"></div>
              <div className="box-face box-face--bottom"></div>
            </div>
          </div>


          <div className="container-box3">
            <div className="box3">
              <div className="box-face box-face--front"></div>
              <div className="box-face box-face--back"></div>
              <div className="box-face box-face--right"></div>
              <div className="box-face box-face--left"></div>
              <div className="box-face box-face--top"></div>
              <div className="box-face box-face--bottom"></div>
            </div>
          </div>

        </div>
      </div>


    )
  }

}

export default Loader