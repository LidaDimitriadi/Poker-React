import React from 'react';
import classNames from 'classnames';
import styles from './styles/cards.css';
import className from './className.js';


export class Card extends React.Component {
  /*constructor() {
    super();
    this.state = {
      chosen: false
    };
  };*/

  _chosenCard () {
    //this.setState({chosen: !this.state.chosen});
    //console.log(this.state.chosen);
    this.props.cardClicked(this.props.id);
  };

  render() {
    //console.log(this.state.chosen);
    return <div className={(this.props.chosen ? styles.chosenCard : styles.normalCard)} onClick={this._chosenCard.bind(this)}>
          <span className={className.front(this.props.rank, this.props.suit)}>
             <span className={styles.rank}>{this.props.rank}</span>
              <span className={styles.suit} dangerouslySetInnerHTML={{__html: `&${this.props.suit};`}} />
          </span>
        </div>
  }
};

Card.PropTypes = {
  id: React.PropTypes.number,
  rank: React.PropTypes.char,
  suit: React.PropTypes.string,
  chosen: React.PropTypes.boolean,
  cardClicked: React.PropTypes.func
};

/*export const Card = ({ rank, suit, chosen }) => {
  //toggle class for selected card??????

  this.state = {
    chosen: false
  };

  var _chosenCard = function() {
    console.log("in chosenCard");
    this.setState({chosen: !this.state.chosen});
  }

  return <div className={(this.state.chosen ? styles.chosenCard : styles.normalCard)} onClick={this._chosenCard.bind(this)}>
        <span className={className.front(rank, suit)}>
           <span className={styles.rank}>{rank}</span>
            <span className={styles.suit} dangerouslySetInnerHTML={{__html: `&${suit};`}} />
        </span>
      </div>
};

Card.PropTypes = {
  rank: React.PropTypes.char,
  weight: React.PropTypes.number,
  suit: React.PropTypes.string,
  //chosen: React.PropTypes.boolean
};*/

export default Card;
