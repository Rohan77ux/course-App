const initialState = {
  token: null,
  user: null,
  // ...existing code...
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // ...existing code...
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      }
    // ...existing code...
    default:
      return state
  }
}

export default authReducer
