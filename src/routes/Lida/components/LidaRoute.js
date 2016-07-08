import React from 'react'
import classes from './LidaRoute.scss'
import { Card } from 'components/Cards'
//import CardsCSS from 'components/styles/cards.css'

export const LidaRoute = () => (
  <div className={classes.containerClass}>
    <div>My route! :) </div>
    <Card rank='2' suit='spades'/>
  </div>
)

export default LidaRoute
