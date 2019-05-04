import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div style={headerContainer}>
        <h1>Concentration</h1>
        <h4>{this.props.message}</h4>
        <button style={buttonStyles} onClick={this.props.getShuffled}>New Game</button>
      </div>
    );
  }
}

export default Header;

const headerContainer = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '2px solid black',
  marginBottom: '15px',
  padding: '15px 50px'
};

const buttonStyles = {
  height: '25px'
};
