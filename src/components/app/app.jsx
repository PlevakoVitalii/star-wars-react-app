import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';

import {
  PeoplePage,
  PlanetsPage,
  StarshipsPage,
  LoginPage,
  SecretPage
} from '../pages';
import { StarshipDetails } from '../sw-components'
import { SwapiServiceProvider } from '../swapi-service-context';

import './app.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

export default class App extends Component {

  state = {
    swapiService: new SwapiService(),
    isLoggedIn: false
  }

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    });
  };

  //ф-ия которая переключает SwapiService или DummySwapiService
  //вызываем єту ф-ию по клику на кнопке в компоненте  <Header />
  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service = swapiService instanceof SwapiService ?
        DummySwapiService : SwapiService
      return {
        swapiService: new Service(),
        isLoggedIn: false
      };
    });
  }

  getStarshipDetails(props) {
    return <StarshipDetails itemId={props.match.params.id} />;
  }
  render() {
    const { isLoggedIn } = this.state;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange} />
              <RandomPlanet />
              <Routes>
                <Route path="/" element={<h2>Welcome to StarDB</h2>} />
                <Route path="/people/" element={<PeoplePage />} />
                <Route path="/people/:id" element={<PeoplePage />} />
                <Route path="/planets" element={<PlanetsPage />} />
                <Route path="/starships" exact element={<StarshipsPage />} />
                <Route path="/starships/:id" element={<StarshipDetails />} />
                <Route
                  path="/login"
                  element={<LoginPage
                    isLoggedIn={isLoggedIn}
                    onLogin={this.onLogin} />
                  } />

                <Route
                  path="/secret"
                  element={<SecretPage
                    isLoggedIn={isLoggedIn} />} />

                <Route
                  path="*"
                  element={<Navigate to="/" />}
                />
              </Routes>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
};