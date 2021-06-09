import axios from "axios";

let config = {
  // baseURL:  "https://backend-node-msql.herokuapp.com",
  baseURL:  "http://localhost:5000",
  authorization: localStorage.getItem("token"),
};

export let auth_http = axios.create({
  baseURL: config.baseURL,
  headers: config.authorization
    ? {
        common: {
          authorization: config.authorization,
        },
      }
    : {},
});

export let http = axios.create({
  baseURL: config.baseURL,
});

// Creamos un evento nuevo para capturar el token.
var originalSetItem = localStorage.setItem;

localStorage.setItem = function (key, value) {
    var event = new Event('itemInserted');

    event.value = value; 
    event.key = key; 

    document.dispatchEvent(event);

    originalSetItem.apply(this, arguments);
};

var localStorageSetHandler = function (e) {
  if (e.key == "token") {
    auth_http.defaults.headers.common['authorization'] = e.value;
  }
};

document.addEventListener("itemInserted", localStorageSetHandler, false);