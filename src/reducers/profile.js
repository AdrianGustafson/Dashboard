const initialState = {
  tab: null
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
        errors: action.error ? action.payload.errors.profile : null,
        success: action.error ? false : true
      }
    }
    case 'PROFILE_PAGE_UNLOADED': {
          return {}
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
