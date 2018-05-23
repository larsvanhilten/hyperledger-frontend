const defState = false;

export default function loader(state = defState, action) {
  switch (action.type) {
    case 'SET_LOADER':
      state = action.loader;
      return state;
    default:
      return state;
  }
}