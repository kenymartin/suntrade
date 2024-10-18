import React from 'react'
import {QueryClient, QueryClientProvider} from 'react-query'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ReactQueryDevtools} from 'react-query/devtools'

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

const query = new QueryClient

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={query}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    <ReactQueryDevtools initialIsOpen={true} position='bottom-right' />
  </QueryClientProvider>
);
