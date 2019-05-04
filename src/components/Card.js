import React, { Component } from 'react';

class Card extends Component {
  handleClick = () => {
    this.props.handleClick(this.props.index);
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <img
          style={cardStyles}
          src={this.props.image}
          alt={this.props.value}
        />
      </div>
    );
  }
}

export default Card;

const cardStyles = {
  minWidth: '75px',
  width: '5.7vw',
  height: 'auto',
  margin: '5px',
  userSelect: 'none'  // disables blue highlight
};
