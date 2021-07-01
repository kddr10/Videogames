const initialState = {
  videogames: [],
  genres: [],
  videogameDetail: {},
  error: "",
  filters: { origin: null, genre: null },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
      };
    case "GET_VIDEOGAMES_BY_NAME":
      return {
        ...state,
        videogames: action.payload,
      };
    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };
    case "GET_VIDEOGAME_DETAIL":
      return {
        ...state,
        videogameDetail: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "SET_FILTER_BY_ORIGIN":
      return {
        ...state,
        filters: { ...state.filters, origin: action.payload },
      };
    case "SET_FILTER_BY_GENRES":
      return {
        ...state,
        filters: { ...state.filters, genre: action.payload },
      };
    case "GET_VIDEOGAMES_ORDERED_AZ":
      return {
        ...state,
        videogames: state.videogames
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name)),
      };
    case "GET_VIDEOGAMES_ORDERED_ZA":
      return {
        ...state,
        videogames: state.videogames
          .slice()
          .sort((a, b) => b.name.localeCompare(a.name)),
      };
    case "GET_VIDEOGAMES_ORDERED_LOWER_RATING":
      return {
        ...state,
        videogames: state.videogames.slice().sort((a, b) => {
          return a.rating - b.rating;
        }),
      };
    case "GET_VIDEOGAMES_ORDERED_HIGHER_RATING":
      return {
        ...state,
        videogames: state.videogames.slice().sort((a, b) => {
          return b.rating - a.rating;
        }),
      };
    default:
      return state;
  }
};

export default rootReducer;
