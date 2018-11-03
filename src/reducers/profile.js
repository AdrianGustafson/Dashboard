const initialState = {
  tab: null
}

export default function common(state = initialState, action) {
  switch (action.type) {
    case 'PROFILE_PAGE_LOADED': {
      return {
        ...state,
        profile: action.error ? null : action.payload.profile,
        errors: action.error ? action.payload.errors : null
      }
    }
    case 'CHANGE_TAB': {
      return {
        ...state,
        tab: action.tab
      }
    }
    case 'SET_PROFILE_PAGE': {
      return {
        ...state,
        profiles: action.payload.profiles,
        profilesCount: action.payload.profilesCount,
        profilesPage: action.page
      }
    }
    case 'PROFILE_SETTINGS_SAVED': {
      return {
        ...state,
        inProgress: false,
        profileErrors: action.error ? action.payload.errors.profile : null,
        profileSuccess: action.error ? false : true
      }
    }
    case 'COMPANY_EMPLOYEES_LOADED': {
      return {
        ...state,
        profiles: action.error ? null : action.payload.profiles,
        profilesCount: action.error ? null : action.payload.profilesCount,
        profilesLoadError: action.error ? action.payload.errors : null,
        profilesPage: 0
      }
    }
    case 'PROFILE_PAGE_UNLOADED': {
          return {tab:null}
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
