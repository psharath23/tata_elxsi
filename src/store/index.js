import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '../reducers'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


const loggerMiddleware = store => next => action => {
    let result = next(action)
    console.groupEnd()
    return result
}

const round = number => Math.round(number * 100) / 100

const monitorReducersEnhancer = createStore => (
    reducer,
    initialState,
    enhancer
) => {
    const monitoredReducer = (state, action) => {
        const start = performance.now()
        const newState = reducer(state, action)
        const end = performance.now()
        const diff = round(end - start)
        return newState
    }

    return createStore(monitoredReducer, initialState, enhancer)
}


const configureStore = (preloadedState) => {
    const middlewares = [loggerMiddleware, thunkMiddleware]
    const middlewareEnhancer = applyMiddleware(...middlewares)

    const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
    const composedEnhancers = composeWithDevTools(...enhancers)

    const store = createStore(persistedReducer, preloadedState, composedEnhancers)
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
    }
    return store
}

export const store = configureStore({})
export const persistor = persistStore(store)
