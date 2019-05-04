import React, {Component} from 'react';
import Card from './Card';
import './Card.css'
import './MenuCard.css';



class MenuCard extends Component {
    constructor(props){
        super(props);
        this.handleChangeItemMenu = this.handleChangeItemMenu.bind(this);
        this.state = {
            selectedOption: 0
        };
    }

    handleChangeItemMenu(e) {
      const option = e.target,
            selectedOption = option.id.substr(18),
            allOptions = document.querySelectorAll('.MenuCard-nav-item');
      for(let i = 0; i<allOptions.length; i++) {
        allOptions[i].classList.remove('-item-active');
      }
      option.classList.add('-item-active');
      this.setState({selectedOption});
    }

    render(){ 
        return (
          <div>
            <div className="MenuCardGroup">
              <div className="MenuCard-wrap">
                <div className="MenuCard-nav">
                  <div className="MenuCard-nav-inner">
                  {
                    this.props.serviceData.map( (service, index) => {
                      if(index === this.state.selectedOption){
                        return(
                          <a
                            className="MenuCard-nav-item -item-active"
                            id={`MenuCard-nav-item-${index}`}
                            key = {index}
                            onClick = {this.handleChangeItemMenu}
                          >
                            {service.title}
                          </a>
                        )
                      }else{
                        return (
                                <a
                                  className="MenuCard-nav-item"
                                  id={`MenuCard-nav-item-${index}`}
                                  key = {index}
                                  onClick = {this.handleChangeItemMenu}
                                >
                                  {service.title}
                                </a>
                                )
                            }
                    })
                  }
                  </div>
                  <div className="MenuCard-menu-scroll">
                    <div className="MenuCard-menu-scroll-inner">
                        {
                          this.props.serviceData[this.state.selectedOption].branches.map( (branch, index) => {
                            return <a
                                      className="MenuCard-menu-scroll-item"
                                      key = {index}
                                    >
                                      <span>{branch}</span>
                                  </a>
                          } )
                        }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="CardGroup">
              <div className="card-description-wrapper">
                  <div className="card-description-container">
                      <div className="card-description-item">
                        <div className="card-description-header">
                          <div className="card-header">
                            <h1><b>{this.props.serviceData[this.state.selectedOption].title}</b></h1>
                          </div>
                        </div>
                        <div className="card-description-text">
                          <div className="card-text-wrapper">
                            <p>{this.props.serviceData[this.state.selectedOption].paragraph1}</p>
                            <p>{this.props.serviceData[this.state.selectedOption].paragraph2}</p>
                          </div>
                        </div>
                      </div>

                      {
                        this.props.serviceData[this.state.selectedOption].cards.map( (card, index) => { 
                        return  <Card
                                    key = {index}
                                    id = {`Card-${index}`}
                                    title = {card.title}
                                    desc1 = {card.desc1}
                                    desc2 = {card.desc2}
                                    tag = {card.tag}
                                    branches = {this.props.serviceData[this.state.selectedOption].branches}
                                    number = {index}
                                    bg = {card.bg}
                                    image = {card.image}
                                    clickme = {card.clickme}
                                    clickpos = {`click-${index}`}
                                    colorUnderline = {card.colorUnderline}
                                  />
                        } )
                      }
                  </div>
                </div>
              </div>
            </div>
        )
    }

}



export default MenuCard;



