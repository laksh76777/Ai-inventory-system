import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './hooks/useAuth';
import { TranslationProvider } from './hooks/useTranslation';
import { ThemeProvider } from './hooks/useTheme';
<<<<<<< HEAD
import { ApiKeyProvider } from './hooks/useApiKey';
=======
>>>>>>> a8541f07588bf8bdfadf6b541bc10b9a696e7b1e

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <TranslationProvider>
        <ThemeProvider>
<<<<<<< HEAD
          <ApiKeyProvider>
            <App />
          </ApiKeyProvider>
=======
          <App />
>>>>>>> a8541f07588bf8bdfadf6b541bc10b9a696e7b1e
        </ThemeProvider>
      </TranslationProvider>
    </AuthProvider>
  </React.StrictMode>
);