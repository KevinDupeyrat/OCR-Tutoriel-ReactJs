import React from "react";
import PropTypes from "prop-types";
import "./Card.css";

const HIDDEN_SYMBOL = "?";

const Card = ({ card, state, index, onClick }) => (
  <div className={`card ${state}`} onClick={() => onClick(index)}>
    <span className="symbol">{state === "hidden" ? HIDDEN_SYMBOL : card}</span>
  </div>
);

// PropTypes to vaide Props
Card.propTypes = {
  card: PropTypes.string.isRequired,
  state: PropTypes.oneOf(["hidden", "justMatched", "justMismatched", "visible"])
    .isRequired,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

// DefaultProps to set default value
Card.defaultProps = {
  state: "hidden",
};

export default Card;
