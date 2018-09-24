const initialState = {
  appName: "WeBooking",
  showSidebar: true,
  loggedIn: false,
  token: null,
  appLoaded: false,
  isSuperuser: false,
  apps: []
}

export default function common(state=initialState, action) {
  switch (action.type) {
    case 'APP_LOADED': {
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.user : null
      }
    }
    
    case 'LOGIN': {
      return {
        ...state,
        token: action.error ? null : action.payload.user.token,
        currentUser: action.error ? null : action.payload.user,
        loggedIn: true
      }
    }
    case 'SIDEBAR_LOADED': {
        return {
            ...state,
            
        }   
    }
    case 'PROFILE_PAGE_LOADED':
    case 'LOGIN_PAGE_LOADED': {
        return {
            ...state,
            currentUser: action.payload ? action.payload.user : null,
            token: action.payload ? action.payload.user.token : null
        }
    } 
    case 'USER_DATA_LOADED': {
        return {
            ...state,
            currentUser: action.payload ? action.payload[0].user: null,
            apps: action.payload ? action.payload[1].apps : []
        } 
    }
    case 'LOGOUT': {
      return {
        ...state,
        token: null,
        currentUser: null,
        loggedIn: false
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
      case 'PROFILE_PAGE_UNLOADED': 
      case 'SETTINGS_PAGE_UNLOADED': {
          return { ...state }
      }
    default:
      return state
  }
}
