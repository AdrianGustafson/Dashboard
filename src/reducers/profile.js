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

        profilesLoadError: action.error ? action.payload.errors : null,
        profilesPage: 0
      }
    }
    case 'COMPANY_DATA_LOADED': {
      return {
        ...state,
        admins: action.error ? []: action.payload[1].profiles ,
        adminsCount: action.error ? 0 : action.payload[1].profilesCount,
        profiles: action.error ? null : action.payload[2].profiles,
        profilesCount: action.error ? null : action.payload[2].profilesCount,
        
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
