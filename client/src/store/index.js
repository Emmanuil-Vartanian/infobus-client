import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore } from 'redux'
import { persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from '@redux-devtools/extension'
import { createReduxHistoryContext } from 'redux-first-history'

import createRootReducer from '../reducers'
import rootSaga from '../sagas'

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory()
})

const rootReducer = createRootReducer(routerReducer)
const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware, routerMiddleware]

const createPersistedStore = () => {
  const persistedCombinedReducers = rootReducer
  const store = createStore(
    persistedCombinedReducers,
    composeWithDevTools(applyMiddleware(...middlewares))
  )

  sagaMiddleware.run(rootSaga)

  const persistor = persistStore(store)
  return { store, persistor }
}

const persistedStore = createPersistedStore()

export const history = createReduxHistory(persistedStore.store)

export default persistedStore
