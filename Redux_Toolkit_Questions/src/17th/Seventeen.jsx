import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './store';
import { toggleTheme } from './themeSlice';
import './Seventeen.css';

function ThemeToggleApp() {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDark);

  return (
    <div className={`app-container ${isDark ? 'dark' : 'light'}`}>
      <h1>{isDark ? 'Dark Theme' : 'Light Theme'}</h1>
      <p>This is a theme toggle app using Redux Toolkit.</p>
      <button onClick={() => dispatch(toggleTheme())}>
        Toggle to {isDark ? 'Light' : 'Dark'}
      </button>
    </div>
  );
}

export default function Seventeen() {
  return (
    <Provider store={store}>
      <ThemeToggleApp />
    </Provider>
  );
}
