import { combineReducers } from 'redux';

import auth from './auth';
import common from './common';
import profile from './profile';

export default combineReducers({
  auth,
  common,
  profile
})
