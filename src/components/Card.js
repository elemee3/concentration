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
  maxWidth: '75px',
  height: 'auto',
  margin: '5px',
  userSelect: 'none'  // disables blue highlight
};
