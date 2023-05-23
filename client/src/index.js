import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> {/*Provider es un componente q se utiliza para conectar el store de redux con una aplicacion de react*/}
    <BrowserRouter>
    <App />   {/*envolvemos el componente App con el Provider, lo que permite que todos los componentes dentro de App tengan acceso al store. */}
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
