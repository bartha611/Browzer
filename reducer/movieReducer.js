const currentState = {
  loading: false,
  movies: [],
  error: false,
  searchTerm: null
};

const movieReducer = (state = currentState, action) => {
  switch (action.type) {
    case "MOVIE_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
        searchTerm: action.payload
      };
    case "MOVIE_LOAD":
      return {
        ...state,
        loading: false,
        page: state.page + 1,
        movies: [...state.movies, ...action.payload]
      };
    case "MOVIE_SEARCH":
      return {
        ...state,
        loading: false,
        page: 2,
        movies: action.payload
      };
    case "MOVIE_ERROR":
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
};

export default movieReducer;
