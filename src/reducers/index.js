import { combineReducers } from 'redux';

import auth from './auth';
import common from './common';
import company from './company';
import profile from './profile';

export default combineReducers({
    auth,
    common,
    company,
    profile
})
