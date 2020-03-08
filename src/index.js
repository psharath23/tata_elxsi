import ReactDOM from "react-dom"
import React from "react"
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import {Router, Route,Switch} from "react-router-dom"
import { store, persistor } from "./store/index"
import Movies from "./pages/movies/movies"
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
const App = () => (
    <Provider store={store}>
        <PersistGate loading={<div>Loading App Storage....</div>} persistor={persistor}>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Movies} />
                    <Route  path="/:rank" component={Movies} />
                </Switch>
            </Router>
        </PersistGate>
    </Provider>
)
ReactDOM.render(<App />, document.getElementById("root"))