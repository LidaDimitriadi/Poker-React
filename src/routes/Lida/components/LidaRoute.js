import React from 'react';
import classes from './LidaRoute.scss';
import Poker from 'components/Cards';

export const LidaRoute = () => {
  const hand = [
    {'rank' : '7', 'suit' : 'hearts', 'id' : '0'},
    {'rank' : '6', 'suit' : 'clubs', 'id' : '1'},
    {'rank' : 'Q', 'suit' : 'hearts', 'id' : '2'},
    {'rank' : 'A', 'suit' : 'diams', 'id' : '3'},
    {'rank' : '9', 'suit' : 'spades', 'id' : '4'}
  ];

  return <div className={classes.containerClass}>
    <Poker hand={hand}/>
  </div>;
};

export default LidaRoute;
