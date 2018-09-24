const initialState = {
    //company: {"name": "Visthuset", "slug": "visthuset"}
}

export default function company(state=initialState, action) {
    switch (action.type) {
        case 'COMPANY_MANAGE_TAB_LOADED': {
            return {
                ...state,
                tab: action.payload ? 'manage' : null,
                companies: action.error ? null : action.payload.companies,
                companyCount: action.error ? null : action.payload.count
            }
        }
         
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
        case 'COMPANY_PAGE_UNLOADED':
            return {}
        default:
            return state
    }
}