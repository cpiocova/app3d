import React, {Component} from 'react';
import './Card.css';
import {TweenMax} from 'gsap';
import AOS from 'aos';
import 'aos/dist/aos.css';


function offsetCalculate(obj) {
    var offLeft = 0,
        offTop = 0;

    if (obj.offsetParent) {
        while (obj.offsetParent) {
            offLeft += obj.offsetLeft;
            offTop += obj.offsetTop;
            obj = obj.offsetParent;
        }
    }
    return [offLeft,offTop];
  }


class Card extends Component {
    constructor(props){
        super(props);
        this.handleMovementCard = this.handleMovementCard.bind(this);
        this.handleMouseLeaveCard = this.handleMouseLeaveCard.bind(this);
        this.handleMouseEnterCard = this.handleMouseEnterCard.bind(this);
        this.handleAtractionBox = this.handleAtractionBox.bind(this);
        this.handleMouseEnterBox = this.handleMouseEnterBox.bind(this);
        this.handleMouseLeaveBox = this.handleMouseLeaveBox.bind(this);

        this.state = {
            isHoverCard: false,
            isHoverBox: false
        };
    }

    componentDidMount() {
        AOS.init({
            duration: 1500
        })
    }

    handleAtractionBox(e){
        
        if(this.state.isHoverBox){
            const box = document.getElementsByClassName(this.props.clickpos)[0],
                    offset = offsetCalculate(box),
                    offsetLeft = offset[0],
                    offsetTop = offset[1];
                
            const posX = e.pageX - offsetLeft, 
                  posY = e.pageY - offsetTop,
                  width = box.clientWidth,
                  height = box.clientHeight;

            // left: f(0)= -50  f(w)=50           top: f(0) = -50  f(h) = 50
            const y = 50,
                    mX = -(y * 2) / width,
                    eX = mX * (posX - width) - y,
                    mY = -(y * 2) / height,
                    eY = mY * (posY - height) - y;
                        
            const text = box.parentNode.parentNode.querySelector('.text-view-card'),
                  line = box.parentNode.parentNode.querySelector('.line-view-card');
            
            TweenMax.to(text,.25,{css:{left: -eX, top: -eY}})
            TweenMax.to(line,.25,{css:{left: -eX, top: -eY}, delay: .05})
        }   
    }

    handleMouseEnterBox(){
        this.setState({
            isHoverBox: true
        })       
    }

    handleMouseLeaveBox(){
        const box = document.getElementsByClassName(this.props.clickpos)[0],
              text = box.parentNode.parentNode.querySelector('.text-view-card'),
              line = box.parentNode.parentNode.querySelector('.line-view-card');
        
        TweenMax.to([text,line], .5, {css:{top: 0, left: 0}, delay: .25})

        this.setState({
            isHoverBox: false
        }) 
    }

    handleMovementCard(e){
        if(this.state.isHoverCard){
            const card = document.getElementById(this.props.id),
                  img3d = card.querySelector('.card-image'),
                  offset = offsetCalculate(card),
                  offsetLeft = offset[0],
                  offsetTop = offset[1];

               
            const posX = e.pageX - offsetLeft, // Normalizando la variable 
                  posY = e.pageY - offsetTop;
            
            const 
                width = card.clientWidth,
                height = card.clientHeight,
                cR = 20, // Variables independientes
                cT = 35, // Variables independientes
                mR = cR / width,
                mT = cT / height,
                ecR = mR * (posX - width) + (cR/2), // Interpolando funcion lineal con f(x1)=-5 . f(x2)=5
                ecT = mT * (posY - height) + (cT/2); // Interpolando funcion lineal con f(y1)=-15 . f(y2)=15

            TweenMax.to(
                    card,
                    .3,
                    {
                        css:{
                                transform: 'translateY('+ecT+'px) scale(1.09) rotateY('+-ecR+'deg)'
                            }
                    }, 'my3dAnim')
            TweenMax.to(
                    img3d,
                    .3,
                    {
                        css:{
                            transform: 'scale(0.775)  translateZ(120px)'
                        }
                    }, 'my3dAnim')
        }
    }

    handleMouseLeaveCard(){
        const card = document.getElementById(this.props.id),
              img3d = card.querySelector('.card-image');

        TweenMax.to(card, .45, {css:{transform: 'translateY(0) rotateY(0) scale(1)'}} )
        TweenMax.to(img3d, .45, {css:{transform: 'scale(0.775) translateZ(80px)'}} )

        this.setState({
            isHoverCard: false
        })
    }

    handleMouseEnterCard(){
        this.setState({
            isHoverCard: true
        })
    }

    render(){
        const colorUnderline = {
            backgroundColor: `${this.props.colorUnderline}`
        };
 
        return (
                <div className="card-wrapper" data-aos="fade-up">
                    <div className="card-presentation">
                        <h4>{this.props.branches[this.props.number]}</h4>
                    </div>
                    <div className="card-content">
                        <div className="card-grid">
                            <div className="card-grid-col card-grid-left">
                                <div className="card-title">
                                    <h3>{this.props.title}</h3>
                                </div>
                                <div className="card-subtitle"> 
                                    <p>{this.props.desc1}</p> 
                                    <p>{this.props.desc2}</p> 
                                </div>
                                <div className="card-tags">
                                    {this.props.tag}
                                </div>
                                <div className="card-more">
                                    <a className="button-view-card">

                                        <span
                                            className="zone-view-card"
                                            onMouseMove={this.handleAtractionBox}
                                            onMouseEnter={this.handleMouseEnterBox}
                                            onMouseLeave={this.handleMouseLeaveBox}
                                        >
                                            <span className={`pos-view-card ${this.props.clickpos}`}></span>
                                        </span>
                                        <span className="box-view-card">
                                            <span className="text-view-card">
                                                <span>{this.props.clickme}</span>
                                            </span>
                                            <span
                                                className="line-view-card"
                                                style={colorUnderline}
                                            >
                                            </span>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div className="card-grid-col card-grid-right">
                                <div className="card-effect"
                                    id={this.props.id}
                                    onMouseMove={this.handleMovementCard}
                                    onMouseLeave={this.handleMouseLeaveCard}
                                    onMouseEnter={this.handleMouseEnterCard}
                                >
                                    <div className="Card">
                                        <img src = {this.props.bg} className="card-bg" />
                                        <img src = {this.props.image} className="card-image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }

}



export default Card;



