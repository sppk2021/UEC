import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Register service worker for offline caching
serviceWorkerRegistration.register({
  onSuccess: () => {
    console.log('U Education offline cache is ready.');
  },
  onUpdate: () => {
    console.log('New content is available for U Education.');
  },
});

