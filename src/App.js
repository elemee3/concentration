import React, { Component } from 'react';
import Header from './components/Header';
import Card from './components/Card';

// Assets for back of card, removed card
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

  // Set new shuffled deck, set state to original values
  newGame = () => {
    fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=52')
      .then(resp => resp.json())
      .then(parsed =>
        this.setState({
          deck: parsed.cards,
          currentPairIndexes: [],
          matchIndexes: []
        })
      )
      .catch(err => console.log(err));
  }

  handleClick = (index) => {
    let { deck, currentPairIndexes, matchIndexes } = this.state;
    if (currentPairIndexes.length === 0) {
      // if it's the first, add it to currentPairIndexes
      currentPairIndexes.push(index);
      this.setState({ currentPairIndexes });
    } else if (currentPairIndexes.length === 2) {
      // ensure no more than 2 cards can be selected at a time
      currentPairIndexes = [];
      currentPairIndexes.push(index);
      this.setState({ currentPairIndexes });
    } else {
      // if it's the second, check for a match
      if (deck[index].value === deck[currentPairIndexes[0]].value && index !== currentPairIndexes[0]) {
        // if it's a match, add both indexes to matchIndexes
        matchIndexes.push(currentPairIndexes[0]);
        matchIndexes.push(index);
        this.setState({
          matchIndexes,
          currentPairIndexes: [],
        });
      } else {
        // if it's not a match, push second to currentPairIndexes
        currentPairIndexes.push(index);
        this.setState({ currentPairIndexes });
      };
    };
  }

  // If 2 non-matching cards have been selected, flip both back over after 3/4 second
  flipCards = () => {
    setTimeout(function() {
      this.setState({ currentPairIndexes: [] });
    }.bind(this), 750);
  }

  render() {
    // generate cards based on
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
          {
            // handle non-matching pair
            this.state.currentPairIndexes.length === 2
            ?
            this.flipCards()
            :
            null
          }
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

// TODO: In case of match, first flip over second card then remove both
// TODO: Make cards display dynamically based on screen size

// STRETCH: 'Hard mode' to match both color and number
// STRETCH: Allow user to choose different card colors
