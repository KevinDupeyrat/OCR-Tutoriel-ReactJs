import React, { Component } from "react";
import shuffle from "lodash.shuffle";
import "./App.css";
import Card from "./Card";
import GuessCount from "./GuessCount";
import HallOfFame from "./HallOfFame";
import HighScoreInput from "./HighScoreInput";

const SIDE = 2;
const SYMBOLS = "😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿";
const VISUAL_PAUSE_MSECS = 750;

class App extends Component {
  state = {
    cards: this.generateCards(), // Generate Cards layout
    currentPair: [], // Current index pair
    guesses: 0, // Number ok Guesses
    hallOfFame: null,
    matchedCardIndices: [], // All Pair are finded
  };

  // Arraow fx for binding
  displayHallOfFame = (hallOfFame) => {
    this.setState({ hallOfFame });
  };

  /**
   * Function to generate deck at the start.
   */
  generateCards() {
    const result = [];
    const size = SIDE * SIDE;
    const candidates = shuffle(SYMBOLS);

    while (result.length < size) {
      const card = candidates.pop();
      result.push(card, card);
    }

    return shuffle(result);
  }

  /**
   * Function for initialise render of card
   *
   * @param index card index
   */
  getFeedbackForCard(index) {
    const { currentPair, matchedCardIndices } = this.state;
    const indexMatched = matchedCardIndices.includes(index);

    if (currentPair.length < 2) {
      return indexMatched || index === currentPair[0] ? "visible" : "hidden";
    }

    if (currentPair.includes(index)) {
      return indexMatched ? "justMatched" : "justMismatched";
    }

    return indexMatched ? "visible" : "hidden";
  }

  /**
   * Function who is fire when click event is emit on a card.
   * It fill currentPair array with index
   *
   * @param index card index
   */
  // Use Arrow function to guarantee its binding (this)
  handleCardClick = (index) => {
    const { currentPair } = this.state;

    if (currentPair.length === 2) {
      return;
    }

    if (currentPair.length === 0) {
      this.setState({ currentPair: [index] });
      return;
    }

    if (currentPair[0] === index) {
      return;
    }

    this.handleNewPairClosedBy(index);
  };

  /**
   * Function who check if pair match
   *
   * @param index
   */
  handleNewPairClosedBy(index) {
    const { cards, currentPair, guesses, matchedCardIndices } = this.state;
    const newPair = [currentPair[0], index];
    const newGuesse = guesses + 1;
    const match = cards[newPair[0]] === cards[newPair[1]];
    this.setState({ currentPair: newPair, guesses: newGuesse });
    if (match) {
      this.setState({
        matchedCardIndices: [...matchedCardIndices, ...newPair],
      });
    }
    setTimeout(() => this.setState({ currentPair: [] }), VISUAL_PAUSE_MSECS);
  }

  render() {
    const { cards, guesses, matchedCardIndices, hallOfFame } = this.state;

    const won = matchedCardIndices.length === cards.length;

    return (
      <div className="memory">
        <GuessCount guesses={guesses} />
        {cards.map((card, index) => (
          <Card
            card={card}
            state={this.getFeedbackForCard(index)} // Function use for the render (it display the state of the card)
            onClick={this.handleCardClick} // Function who fire on the event Click (not the render so
            // you need to pass by reference)
            key={index}
            index={index}
          />
        ))}
        {won &&
          (hallOfFame ? (
            <HallOfFame entries={hallOfFame} />
          ) : (
            <HighScoreInput
              guesses={guesses}
              onStored={this.displayHallOfFame}
            />
          ))}
      </div>
    );
  }
}

export default App;
