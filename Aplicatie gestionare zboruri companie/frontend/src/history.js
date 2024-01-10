import React from 'react';
import ReactDOM from 'react-dom/client';

import HistoryTransaction from './transactionhistory/HistoryTransaction.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HistoryTransaction />
  </React.StrictMode>
);