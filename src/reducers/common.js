const dummyUser = {
  username: 'Adrian',
  token: 'wgnaölsfknsöbgf',
  email: 'adrian.g@telia.com'
}

const initialState = {
  appName: "WeBooking",
  showSidebar: true,
  token: null,
  appLoaded: false,
}

export default function common(state=initialState, action) {
  switch (action.type) {
    case 'APP_LOADED': {
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload[0].user : null,
        company: action.error ? null : action.payload[1].company
      }
    }
    case 'LOGIN': {
      return {
        ...state,
        token: action.error ? null : action.payload.user.token,
        currentUser: action.error ? null : action.payload.user,
      }
    }
    case 'LOGOUT': {
      return {
        ...state,
        token: null,
        currentUser: null
      }
    }
    case 'TOGGLE_SIDEBAR': {
      return {
        ...state,
        showSidebar: action.toggle
      }
    }
      case 'PROFILE_SETTINGS_SAVED': {
          return {
              ...state,
              currentUser: action.error ? state.currentUser : action.payload.user
          }
      }
    default:
      return state
  }
}
