import React, { Component } from 'react';
import Header from './Header';
import Card from './Card';
const cardBack = 'https://opengameart.org/sites/default/files/styles/medium/public/card%20back%20red.png';
const removedCard = 'https://www.htmlcsscolor.com/preview/gallery/277714.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: [],
      currentPairIndexes: [],
      matchIndexes: []
    };
  }

  newGame = () => {
    fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=52')
      .then(resp => resp.json())
      .then(parsed => this.setState({
        deck: parsed.cards,
        currentPairIndexes: [],
        matchIndexes: []
      }))
  }

  handleClick = (index) => {
    let { deck, currentPairIndexes, matchIndexes } = this.state;
    // check if it's the first, if so add it to currentPairIndexes
    if (currentPairIndexes.length === 0) {
      currentPairIndexes.push(index);
      this.setState({ currentPairIndexes });
    } else if (currentPairIndexes.length === 2) {
      currentPairIndexes = [];
      currentPairIndexes.push(index);
      this.setState({ currentPairIndexes });
    } else {
    // otherwise check for a match
      if (deck[index].value === deck[currentPairIndexes[0]].value && index !== currentPairIndexes[0]) {
        // if it's a match, add both indexes to matchIndexes
        matchIndexes.push(currentPairIndexes[0]);
        matchIndexes.push(index);
        this.setState({
          matchIndexes: matchIndexes,
          currentPairIndexes: [],
        });
      } else {
        // if it's not a match, push second to currentPairIndexes
        currentPairIndexes.push(index);
        this.setState({ currentPairIndexes });
      };
    };
  }

  render() {
    let cards = this.state.deck.map((card, id) => {
      let imageSrc;
      if (this.state.matchIndexes.includes(id)) {
        imageSrc = removedCard;
      } else if (this.state.currentPairIndexes.includes(id)) {
        imageSrc = card.image;
      } else {
        imageSrc = cardBack;
      };
      return (
        <Card
          key={id}
          index={id}
          value={card.value}
          image={imageSrc}
          handleClick={this.handleClick}
        />
      );
    })
    return (
      <div style={appStyles}>
        <Header getShuffled={this.newGame} />
        <div style={boardStyles}>
          {cards}
        </div>
      </div>
    );
  }
}

export default App;

const appStyles = {
  width: '100vw',
  height: '100vh',
  backgroundColor: '#277714',
};

const boardStyles = {
  width: '1150px',
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'space-between',
  margin: '0 auto',
}
