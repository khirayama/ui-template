import React from 'react';
import ReactDOM from 'react-dom';

import types from './constants/action-types';

import { dispatch } from './libs/app-dispatcher';

import logger from './utils/logger';
import { isMobileUI } from './utils/is-mobile-ui';
import { loadStyle } from './utils/load-style';

import Store from './store';

import DesktopContainer from './components/desktop/container';
import MobileContainer from './components/mobile/container';


window.addEventListener('popstate', (event) => {
  dispatch({
    type: types.CHANGE_HISTORY,
    pathname: location.pathname
  });
});

window.addEventListener('load', () => {
  logger.info(`Loaded app at ${new Date()}`);

  const store = new Store();

  if (isMobileUI()) {
    logger.info(`Start app for mobile at ${new Date()}`);
    loadStyle('mobile/index.css');
    ReactDOM.render(<MobileContainer store={store} />, document.querySelector('#app'));
  } else {
    logger.info(`Start app for desktop at ${new Date()}`);
    loadStyle('desktop/index.css');
    ReactDOM.render(<DesktopContainer store={store} />, document.querySelector('#app'));
  }
});
