import React from 'react';
import ReactDOM from 'react-dom/client';

import Employee from './employee/Employee.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Employee />
  </React.StrictMode>
);