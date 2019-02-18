const initialState = {
  activeSite: null,
  tab: null,
  routeName: 'settings'
}

function updateRoute(routes, newRoute) {
  for (var i=0; i<routes.length; i++) {
    if (routes[i].id === newRoute.id) {
      routes[i] = newRoute
    }
  }

  return routes
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
    case 'ROUTE_SELECTED': {
      return {
        ...state,
        activeRoute: action.route
      }
    }
    case 'ROUTE_UPDATED': {
      return {
        ...state,
        activeRoute: action.route
      }
    }
    case 'ROUTE_UPDATE_SAVED': {
      return {
        ...state,
        activeRoute: action.error ? state.activeRoute : action.payload.route,
        routes: action.error ?
                    state.routes :
                    updateRoute(state.routes, action.payload.route)
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
    case 'ACTIVE_PAGE_SELECTED': {
      return {
        ...state,
        inProgress: null,
        activePage: action.payload ? action.payload.page : null
      }
    }
    case 'PAGE_UPDATE_SAVED': {
      return {
        ...state,
        activePage: action.error ? state.activePage : action.payload.page,
        errors: action.error ? action.payload.errors : null
      }
    }
    case 'ASYNC_START': {
      if (action.subtype === 'ACTIVE_PAGE_SELECTED') {
        return { ...state, inProgress: true }
      }
    }
    default:
      return state
  }
}
