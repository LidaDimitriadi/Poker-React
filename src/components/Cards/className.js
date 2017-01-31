import React from 'react';
import classNames from 'classnames';
import styles from './styles/cards.css';

export const className = {
  front: (rank, suit) => classNames(
    styles.card,
    styles['rank-' + rank.toLowerCase()],
    styles[suit],
  ),
  back: classNames(styles.card, styles.back),
};

export default className;
