import { combineReducers } from 'redux'
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import appReducer from 'containers/App/store/reducers'
import authReducer from 'pages/Login/store/reducers'
import tripsSearchReducer from 'pages/TripSearch/store/reducers'
import bookingsReducer from 'pages/Bookings/store/reducers'
import tripsReducer from 'pages/Trips/store/reducers'
import passengersReducer from 'pages/Passengers/store/reducers'
import locationsReducer from 'pages/Locations/store/reducers'
import agenciesReducer from 'pages/Agencies/store/reducers'
import usersCombineReducers from 'pages/Users/store/reducers'
import carriersReducer from 'pages/Carriers/store/reducers'

const entitiesReducer = combineReducers({
  tripsSearch: tripsSearchReducer,
  bookings: bookingsReducer,
  trips: tripsReducer,
  passengers: passengersReducer,
  locations: locationsReducer,
  agencies: agenciesReducer,
  users: usersCombineReducers,
  carriers: carriersReducer
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
