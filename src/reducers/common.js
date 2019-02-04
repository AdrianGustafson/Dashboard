const initialState = {
  appName: "WeBooking",
  showUserDropdown: false,
  token: null,
  appLoaded: false,
  apps: null
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
        currentUser: action.error ? null : action.payload.user
      }
    }

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
        apps: null
      }
    }
    case 'SHOW_USER_DROPDOWN': {
        return {
            ...state,
            showUserDropdown: true
        }
    }
    case 'HIDE_USER_DROPDOWN': {
      return {
        ...state,
        showUserDropdown: false
      }
    }
    case 'PROFILE_SETTINGS_SAVED': {
        return {
            ...state,
            currentUser: action.error ? state.currentUser : action.payload.user
        }
      }
    case 'USER_APPS_LOADED': {
      return {
        ...state,
        apps: action.error ? null : action.payload.apps
      }
    }
    default:
      return state
  }
}
