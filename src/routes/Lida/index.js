//import PokerView from './components/PokerView';

///export default {
//  path: '/poker',
//  component: PokerView
//}


import { injectReducer } from '../../store/reducers'
console.log('in route poker index');
export default (store) => ({
  path: '/poker',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
          //mesa sto CounterContainer fortwnw thn template tou counter
      const Poker = require('./containers/PokerContainer').default
      const reducer = require('./modules/deal').default

      /*  Add the reducer to the store on key 'counter'  */
      //gia na fainetai sto redux
      injectReducer(store, { key: 'deal', reducer })

      /*  Return getComponent   */
      cb(null, Poker)

    /* Webpack named bundle   */
  }, 'deal')
  }
})
