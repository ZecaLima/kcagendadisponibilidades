import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import App from './App';

export function Router() {
  function handleLogin(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  );
}
