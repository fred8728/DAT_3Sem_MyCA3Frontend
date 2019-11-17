import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import facade from "./apiFacade";
import Login from "./Login";
import Switch from "./fetchingAPI";
import "./App.css";
import "./index.css";

function App(props) {
  const [state, setState] = useState([{ loggedIn: false }]);

  useEffect(() => {}, []);

  const logout = () => {
    facade.logout();
    setState({ loggedIn: false });
  };

  const login = (user, pass) => {
    facade.login(user, pass).then(res => setState({ loggedIn: true }));
  };

  return (
    <Router>
      {!state.loggedIn ? (
        <Login login={login} />
      ) : (
        <div>
          <ul className="header">
            <li>
              <NavLink exact activeClassName="active" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/starwars">Starwarz API</NavLink>
            </li>
            <li>
              <NavLink to="/planet">Planet API</NavLink>
            </li>
            <li>
              <NavLink to="/starship">Starship API</NavLink>
            </li>
            <li>
              <NavLink to="/films">Film API</NavLink>
            </li>
            <li>
              <NavLink to="/vehicles">Vehicle API</NavLink>
            </li>
          </ul>
          <Switch swi={Switch} />
          <br></br>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </Router>
  );
}
export default App;
