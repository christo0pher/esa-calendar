import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

window.loadedData = function (t) {
    window.dispatchEvent(new CustomEvent("loadedData", { detail: t }))
}
window.loadedData2 = function (t) {
    window.dispatchEvent(new CustomEvent("loadedData2", { detail: t }))
}

const now = new Date();

function addScript(url) {
    const script = document.createElement("script");

    let connector = url.includes('?') ? '&' : '?'

    script.src = url + connector + 't=' + now.getUTCSeconds();
    script.async = true;

    document.body.appendChild(script);
}

addScript("https://horaro.org/-/api/v1/schedules/4411gf8bgo950j7a2c?callback=loadedData")
addScript("https://horaro.org/-/api/v1/schedules/1d11h41bwq87287a21?callback=loadedData2")

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
