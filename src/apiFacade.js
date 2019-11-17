const URL = "http://localhost:8080/securitystarter";
function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

class ApiFacade {
  makeOptions(method, addToken, body) {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    };
    if (addToken && this.loggedIn()) {
      opts.headers["x-access-token"] = this.getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  }
  setToken = token => {
    localStorage.setItem("jwtToken", token);
  };
  getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  loggedIn = () => {
    const loggedIn = this.getToken() != null;
    return loggedIn;
  };
  logout = () => {
    localStorage.removeItem("jwtToken");
  };

  login = (user, pass) => {
    const options = this.makeOptions("POST", true, {
      username: user,
      password: pass
    });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then(res => {
        this.setToken(res.token);
      });
  };
  fetchData = () => {
    const options = this.makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/info/user", options).then(handleHttpErrors);
  };

  fetchStarwarz = () => {
    const options = this.makeOptions("GET", true);
    return fetch(URL + "/api/info/person/6",
      options
    ).then(handleHttpErrors);
  };

  fetchPlanet = () => {
    const options = this.makeOptions("GET", true);
    return fetch(URL + "/api/info/planet/3",
      options
    ).then(handleHttpErrors);
  };

  fetchFilm = () => {
    const options = this.makeOptions("GET", true);
    return fetch(URL + "/api/info/film/1",
      options
    ).then(handleHttpErrors);
  };

  fetchStarship = () => {
    const options = this.makeOptions("GET", true);
    return fetch( URL + "/api/info/starships/2",
      options
    ).then(handleHttpErrors);
  };

  fetchSpecies = () => {
    const options = this.makeOptions("GET", true);
    return fetch(URL + "/api/info/species/1",
      options
    ).then(handleHttpErrors);
  };
}
const facade = new ApiFacade();
export default facade;
