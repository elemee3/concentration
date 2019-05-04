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
      matchIndexes: [],
      currentPairIndexes: [],
      message: "Press 'New Game' to Play!",
      activeGame: false
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
          matchIndexes: [],
          message: "",
          activeGame: true
        })
      )
      .catch(err => console.log(err));
  }


  handleClick = (index) => {
    let { currentPairIndexes, matchIndexes } = this.state;
    // take action only if: 1) card is still in play; 2) card is not already clicked; 3) there are 0 or 1 cards selected
    if (!matchIndexes.includes(index) && !currentPairIndexes.includes(index) && currentPairIndexes.length < 2) {
      currentPairIndexes.push(index);
      this.setState({ currentPairIndexes });
    };
  }

  checkMatch = () => {
    let { deck, currentPairIndexes } = this.state;
    if (deck[currentPairIndexes[0]].value === deck[currentPairIndexes[1]].value) {
      this.removeMatch();
    } else {
      this.flipCards();
    };
  }

  // If 2 matching cards have been selected, remove from board after 3/4 second
  removeMatch = () => {
    let { currentPairIndexes, matchIndexes } = this.state;
    setTimeout(function() {
      matchIndexes.push(currentPairIndexes[0]);
      matchIndexes.push(currentPairIndexes[1]);
      this.setState({
        matchIndexes,
        currentPairIndexes: [],
      });
    }.bind(this), 750);
  }

  // If 2 non-matching cards have been selected, flip both back over after 3/4 second
  flipCards = () => {
    setTimeout(function() {
      this.setState({ currentPairIndexes: [] });
    }.bind(this), 750);
  }

  checkGameOver = () => {
    if (this.state.matchIndexes.length === 52 && this.state.activeGame) {
      this.setState({
        activeGame: false,
        message: "You win! Press 'New Game' to Play Again"
      });
    };
  }

  render() {
    this.checkGameOver();
    // generate cards based on state
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
        <Header getShuffled={this.newGame} message={this.state.message} />
        <div style={boardStyles}>
          {cards}
          {
            // if 2 cards are selected, check for match
            this.state.currentPairIndexes.length === 2
            ?
            this.checkMatch()
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

// TODO: Make cards display dynamically based on screen size
