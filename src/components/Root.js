import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './App';

import '../assets/styles/base.scss';
import '../assets/styles/company.scss';
import '../assets/styles/grid.scss';
import '../assets/styles/header.scss';
import '../assets/styles/footer.scss';
import '../assets/styles/forms.scss';
import '../assets/styles/listPreview.scss';
import '../assets/styles/main.scss';
import '../assets/styles/profile.scss';
import '../assets/styles/tabs.scss';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
        <App />
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root
