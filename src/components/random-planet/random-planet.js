import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator'

import SwapiService from '../../services/swapi-service'

import './random-planet.css';

export default class RandomPlanet extends Component {

  static defaultProps = {
    updateInterval: 10000
  }

  static propTypes = {
    updateInterval: PropTypes.number
  }

  SwapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false
  }

  componentDidMount() {
    const { updateInterval } = this.props;
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false
    })
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    })
  }

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 17) + 3;
    this.SwapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  };

  render() {

    const { planet, loading, error } = this.state;

    //Константа -> тернарный оператор->если error=true отрисуем 
    //<ErrorIndicator /> иначе null
    const errorMessage = error ? <ErrorIndicator /> : null;

    //константа hasData = trueс если у нас не загрузка и не ошибка
    const hasData = !(loading || error)
    //Константы spinner и content с помощью тернарных операторов
    //в зависимости от чему равно loading или true или false и есть ли ошибка
    //отобразят или компоненты или null(ничего)
    //так как Константы spinner и content имеют условия противоположные loading и !loading
    //одновременно они никогда не будут отображаться

    const spinner = loading && !error ? <Spinner /> : null;

    //Отрисовуем  данные когда hasData = true
    const content = hasData ? <PlanetView planet={planet} /> : null;



    //Т.к. в первоначальном state loading:true
    //вместо компонента сразу будет показан индикатор загрузки
    //а после получения данных он будет заменен на false
    // ф-ей onPlanetLoaded и отобразяться данные полученые с сервера

    return (
      <div className="random-planet jumbotron rounded">
        {errorMessage}
        {spinner}
        {content}
      </div>

    );
  }
}
const PlanetView = ({ planet }) => {

  const { id, name, population,
    rotationPeriod, diameter
  } = planet;

  return (
    <React.Fragment>
      <img className="planet-image"
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
        alt='planet'
      />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  )
}
