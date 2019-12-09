import { put, take, call, all, fork } from "redux-saga/effects";
import { fetchMovies, fetchTitle } from "../backend/fetchdata";

function* watchMovies() {
  while (true) {
    const { title, page, operation } = yield take("LOAD_MOVIES");
    yield put({ type: "MOVIE_REQUEST", payload: title });
    const { data, error } = yield call(fetchMovies, title, page);
    if (error) {
      yield put({ type: "MOVIE_ERROR" });
    } else {
      yield put({
        type: `MOVIE_${operation}`,
        payload: data
      });
    }
  }
}

function* watchTitle() {
  while (true) {
    const { id } = yield take("LOAD_TITLE");
    yield put({ type: "TITLE_REQUEST" });
    const { data, error } = yield call(fetchTitle, id);
    console.log(data);
    if (error) {
      yield put({ type: "TITLE_ERROR" });
    } else {
      yield put({ type: "TITLE_RECEIVED", payload: data });
    }
  }
}

export default function* rootsaga() {
  yield all([fork(watchMovies), fork(watchTitle)]);
}
