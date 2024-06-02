import { combineReducers } from 'redux'
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import appReducer from 'containers/App/store/reducers'
import authReducer from 'pages/Login/store/reducers'
import dictionariesReducer from 'containers/Dictionaries/store/reducers'
import tripsReducer from 'pages/TripSearch/store/reducers'

const entitiesReducer = combineReducers({
  dictionaries: dictionariesReducer,
  trips: tripsReducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
}

const createRootReducer = routerReducer =>
  persistCombineReducers(persistConfig, {
    auth: authReducer,
    router: routerReducer,
    app: appReducer,
    entities: entitiesReducer
  })

export default createRootReducer
