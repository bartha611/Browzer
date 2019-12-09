import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddlware from "redux-saga";
import movieReducer from "./movieReducer";
import titleReducer from "./titleReducer";
import rootsaga from "../saga";

const sagaMiddleware = createSagaMiddlware();

const reducers = combineReducers({
  movie: movieReducer,
  title: titleReducer
});

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootsaga);

export default store;
