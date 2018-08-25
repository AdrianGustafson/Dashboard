const initialState = {
  tab: 'profile'
}

export default function common(state = initialState, action) {
  switch (action.type) {
    case 'PROFILE_PAGE_LOADED': {
      return {
        ...state,
        errors: action.error ? action.payload.errors : null
      }
    }
    case 'CHANGE_TAB': {
      return {
        ...state,
        tab: action.tab
      }
    }
    case 'PROFILE_SETTINGS_SAVED': {
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors.profile : null
      }
    }
    case 'ASYNC_START': {
      return {
        ...state,
        inProgress: true
      }
    }
    default:
      return state
  }
}
