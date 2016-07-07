import React from 'react'
import classes from './LidaRoute.scss'
import { Card } from 'components/Cards'

export const LidaRoute = () => (
  <div className={classes.containerClass}>
    <div>My route! :) </div>
    <Card rank='7' suit='spades'/>
  </div>
)

export default LidaRoute
