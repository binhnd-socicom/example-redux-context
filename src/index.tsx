import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './views/App';

import Store from './stores/config-store';

ReactDOM.render(
  <Store.Provider>
    <App label={'App label'} />
  </Store.Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
