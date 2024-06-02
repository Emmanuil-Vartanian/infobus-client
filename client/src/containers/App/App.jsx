import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { HistoryRouter } from 'redux-first-history/rr6'

import 'i18n/config'

import store, { history } from '../../store'

import Router from 'router'
import AuthChecker from './components/AuthChecker'
import LocalizationProvider from 'components/Providers/LocalizationProvider'
import ThemeProvider from 'components/Providers/ThemeProvider'
import SnackbarProvider from 'components/Providers/SnackbarProvider'

const App = () => {
  return (
    <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <HistoryRouter history={history}>
          <AuthChecker>
            <ThemeProvider>
              <LocalizationProvider>
                <SnackbarProvider>
                  <div className="App">
                    <Router />
                  </div>
                </SnackbarProvider>
              </LocalizationProvider>
            </ThemeProvider>
          </AuthChecker>
        </HistoryRouter>
      </PersistGate>
    </Provider>
  )
}

export default App
