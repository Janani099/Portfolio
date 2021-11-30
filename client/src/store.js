import { createStore ,applyMiddleware,compose  } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState ={};

const middleware = [thunk];

// const devtools = process.env.NODE_ENV === 'test'
//   ? x => x /* eslint-disable no-underscore-dangle */
//   : window.__REDUX_DEVTOOLS_EXTENSION__

const store = createStore(
 rootReducer,
 initialState,
//  devtools,
 compose(
   applyMiddleware(...middleware),
   window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()
 )
 
 );

export default store;