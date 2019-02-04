export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
    case 'REGISTER':
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null
      };
    case 'PASSWORD_RESET_REQUESTED': {
      return {
        ...state,
        success: !action.error,
        errors: action.error ? action.payload.errors : null
      }
    }
    case 'PASSWORD_RESET_LOADED': {
        return {
            ...state,
            validLink: action.error ? false : action.payload.validLink,
            type: action.error ? null : action.action
        }
    }
    case 'SUBMIT_PASSWORD_FORM': {
      return {
        ...state,
        success: !action.error,
        errors: action.error ? action.payload.errors : null
      }
    }
    case 'PASSWORD_RESET_UNLOADED':
    case 'LOGIN_PAGE_UNLOADED':
    case 'REGISTER_PAGE_UNLOADED':
    case 'PASSWORD_RESET_PAGE_UNLOADED':
      return {};
    case 'ASYNC_START':
      if (action.subtype === 'LOGIN' || action.subtype === 'RGISTER') {
        return { ...state, inProgress: true };
      }
      break;
    case 'UPDATE_FIELD_AUTH':
      return { ...state, [action.key]: action.value }
  }
  return state;
}
