import { combineReducers } from 'redux'
import locationsReducer from '../../Locations/store/reducers'

const dictionariesReducer = combineReducers({
  locations: locationsReducer
})

export default dictionariesReducer
