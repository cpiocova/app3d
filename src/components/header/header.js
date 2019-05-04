import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import logo from '../../images/cons.svg'
import './header.css'

class Header extends React.Component {
 
 constructor(props){
    super(props)

    this.state = {
      hasScrolled: false
    }
 }

 componentDidMount(){
   window.addEventListener('scroll', 
   this.handleScroll)
 }

handleScroll = (event) =>{
  const scrollTop = window.pageYOffset

  if(scrollTop > 50){
    this.setState({ hasScrolled: true})
  } else {
    this.setState ({hasScrolled: false})
  }

}

  render(){
    return(
      <div className = {this.state.hasScrolled ?
      'Header HeaderScrolled': 'Header'}>
        <div className= 'HeaderGroup'>
          <Link to='/'><img src= {logo} width = '233'></img></Link>
          <Link to='/quienesSomos'>Quienes Somos </Link>
          <Link to='/contactanos'> <button>Contactanos</button> </Link>
        </div>
      </div>
    )
  }
}

export default Header
