const defState = {};

export default function containers(state = defState, action) {
  switch (action.type) {
    case 'SELECTED':
      state[action.table] = action.items;
      return state;
    default:
      return state;
  }
}