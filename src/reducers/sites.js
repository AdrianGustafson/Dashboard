const initialState = {
  activeSite: null,
  tab: null,
  pageName: 'settings'
}

export default function sites(state=initialState, action) {
  switch (action.type) {
    case 'SITES_PAGE_LOADED': {
      return {
        ...state,
        sites: action.payload ? action.payload.sites : []
      }
    }
    case 'SITE_ROUTES_LOADED': {
      return {
        ...state,
        routes: action.payload ? action.payload.routes : [],
        errors: action.error ? action.payload.errors: null
      }
    }
    case 'LANGUAGES_LOADED': {
      return {
        ...state,
        languages: action.payload ? action.payload.languages : []
      }
    }
    case 'SITES_TAB_CHANGED': {
      return {
        ...state,
        tab: action.tab
      }
    }
    case 'SITE_CREATED': {
      return {
        ...state,
        activeSite: action.error ? null : action.payload.site,
        errors: action.error ? action.payload.errors : null,
        success: !action.error
      }
    }
    case 'SITE_SELECTED': {
      return {
        ...state,
        activeSite: action.site === state.activeSite ? null : action.site
      }
    }
    case 'SITE_CREATE_UNLOADED': {
      return {
        ...state,
        success: undefined,
        tab: state.activeSite.slug
      }
    }
    case 'PAGE_SELECTED': {
      return {
        ...state,
        pageName: action.page.name,
        page: action.page
      }
    }
    case 'ACTIVE_SITE_UNLOADED': {
      return {
        ...state,
        activeSite: null,
        routes: null
      }
    }
    case 'SITES_PAGE_UNLOADED': {
      return {
        ...state,
        sites: null
      }
    }
    default:
      return state
  }
}
