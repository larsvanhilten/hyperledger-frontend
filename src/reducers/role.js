const defState = "";

export default function role(state = defState, action) {
  switch (action.type) {
    case 'SET_ROLE':
      state = action.role;
      return state;
    default:
      return state;
  }
}