const initialState = {
  tab: null,
    //company: {"name": "Visthuset", "slug": "visthuset"}
}

export default function company(state=initialState, action) {
    switch (action.type) {
      // PAGE LOADS
        case 'CURRENT_COMPANY_LOADED': {
          return {
            ...state,
            currentCompany: action.error ? null : action.payload.company,
            errors: action.error ? action.payload.errors : null
          }
        }
        case 'COMPANY_MANAGE_TAB_LOADED': {
            return {
                ...state,
                companies: action.error ? null : action.payload.companies,
                companyCount: action.error ? null : action.payload.count
            }
        }
        case 'COMPANY_PAGE_LOADED': {
          return {
            ...state,
            tab: action.tab
          }
        }
        case 'COMPANY_DATA_LOADED': {
          return {
            ...state,
            company: action.error ? null : action.payload.company,
            errors: action.error ? action.payload.errors : null
          }
        }

        // OTHER ACTIONS
        case 'COMPANY_SELECTED': {
          return {
            ...state,
            company: action.company
          }
        }
        case 'COMPANY_CHANGE_TAB': {
            return {
                ...state,
                tab: action.tab
            }
        }
        case 'SUBMIT_CREATE_COMPANY': {
          return {
            ...state,
            company: action.error ? null : action.payload.company,
            errors: action.error ? action.payload.errors : null,
            success: action.error ? false : true,
          }
        }

        // UNLOADS
        case 'COMPANY_CREATE_UNLOADED': {
          return {
            ...state,
            success: false
          }
        }
        case 'CURRENT_COMPANY_UNLOADED': {
          return {
            ...state,
            currentComapany: null
          }
        }
        case 'COMPANIES_PAGE_UNLOADED':
        case 'COMPANY_PAGE_UNLOADED': {
          return {}
        }

        default:
            return state
    }
}
