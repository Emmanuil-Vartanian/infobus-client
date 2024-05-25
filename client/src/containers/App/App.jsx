import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { HistoryRouter } from 'redux-first-history/rr6'

import 'i18n/config'

import store, { history } from '../../store'

import Router from 'router'
import AuthChecker from './components/AuthChecker'
import LocalizationProvider from 'components/Providers/LocalizationProvider'

const App = () => {
  return (
    <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <HistoryRouter history={history}>
          <div className="App">
            <AuthChecker>
              <LocalizationProvider>
                <Router />
              </LocalizationProvider>
            </AuthChecker>
          </div>
        </HistoryRouter>
      </PersistGate>
    </Provider>
  )
}

export default App
