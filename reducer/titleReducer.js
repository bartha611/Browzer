const currentState = {
  loading: false,
  title: null,
  error: false
};

const titleReducer = (state = currentState, action) => {
  switch (action.type) {
    case "TITLE_REQUEST":
      return {
        ...state,
        loading: true,
        error: false
      };
    case "TITLE_RECEIVED":
      return {
        ...state,
        loading: false,
        title: action.payload
      };
    case "TITLE_ERROR":
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
};

export default titleReducer;
