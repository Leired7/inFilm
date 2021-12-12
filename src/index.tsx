import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

async function main() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = require('./mocks/browser');

    await worker.start({
      waitUntilReady: true,
      serviceWorker: {
        url: `/mockServiceWorker.js`,
      },
      onUnhandledRequest: (req: Request) => {
        console.warn('Found an unhanded %s request to %s', req.method, req.url);
      },
    });
  }

  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

main();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
