import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';

const Root = () => (
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  );

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
