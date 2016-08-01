import React from 'react';
import classNames from 'classnames';
import styles from './styles/cards.css';
import className from './className.js';
import Card from './Card.js'

export class Poker extends React.Component  {

  _getCards = function(hand) {
    return hand.cards.map( (card) => (<Card rank={card.rank} suit={card.suit} chosen={card.chosen} id={card.key} cardClicked={this.chooseCard.bind(this)}/>) ) || null ;
  };

  chooseCard = function(key) {
    console.log(key);
    var card = _.find(this.props.hand.cards, (card) => (card.key == key) );
    //edw allazw giati sto card to this.props einai readOnly
    console.log(this.props.hand.cards);
    card.chosen = !card.chosen;
    console.log(card);
    console.log(this.props.hand.cards);
    //////////////////////////////pws to trexw
    this.props.chosenCard;
    //an thn exw epi3ei gia discard
    /*if(card.chosen) {
      console.log(key);
      this.props.cardsToDiscard.push(card);
      console.log(this.props.cardsToDiscard);
    }
    //alliws tsekarw an to exw parei hdh wste na to diagrapsw
    else {
      console.log("deleting");
      _.pull(this.props.cardsToDiscard, card);
      console.log(this.props.cardsToDiscard);
    }*/
    console.log("after state handling!");
  };

  render() {
    const cards = this._getCards(this.props.hand);

    return <div className={styles.containerClass}>
      <div className={classNames(styles.playingCards, styles.simpleCards)}>
      <ul className={classNames(styles.deck)}>
         <li><div className={className.back}></div></li>
         <li><div className={className.back}></div></li>
         <li><div className={className.back}></div></li>
         <li><div className={className.back}></div></li>
         <li><div className={className.back}></div></li>
         <li><div className={className.back}></div></li>
      </ul>
         <button onClick={this.props.handleClick}>{ this.props.game ? 'Shuffle' : 'Deal!'}</button>
          { this.props.game ?
          <div className={classNames(styles.playingCards, styles.simpleCards), styles.handClass}>
            {cards}
            <div className={styles.ratingClass}>Your rating is: {this.props.hand.rate} </div>
            <button onClick={this.props.updateHand}>Drop-Withdraw</button>
          </div>
          : <span /> }
         </div>
       </div>
  };
};

Poker.PropTypes = {
  hand: React.PropTypes.array,
  game: React.PropTypes.boolean,
  deck: React.PropTypes.array,
  handleClick: React.PropTypes.func,
  chosenCard: React.PropTypes.func,
  updateHand: React.PropTypes.func
};

export default Poker;
