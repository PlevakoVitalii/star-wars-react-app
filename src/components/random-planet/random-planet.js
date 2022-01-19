import React, { Component } from 'react';
import PropTypes from 'prop-types'; 

import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator'

//Импортируем API клиент SwapiService для получения данных с сервера
//в етом компоненте
import SwapiService from '../../services/swapi-service'

import './random-planet.css';

export default class RandomPlanet extends Component {

  //defaultProps устанавливает дефолтное значение синтаксис для класса, анологичная запись
  //Запись выполняеться внутри компонента класса 

  // RandomPlanet.defaultProps={
  //   updateInterval:10000
  // }
  //Этот синтаксис подходит и для функциональных и для классовых компонентов
  //Запись выполняеться снаружи компонента класса или  ф-ии
  static defaultProps = {
    updateInterval: 10000
  }


//   //propTypes выполняет проверку типа пропсов, и если тип не правильный
//   //вернет TypeError
//   //работу по проверке типов проще выполнять с помощью спец библиотек
// // а не писать проверки вручную
//   static propTypes = {
//     updateInterval: (props, propName, componentName) => {
//       const value = props[propName];
//       if (typeof value === 'number' && !isNaN(value)) {
//         return null;
//       }
//       return new TypeError(`${componentName}: ${propName} must be number`);
//     }
//   }

//Код выше по проверке типа пропсов установив библеотеку PropTypes
//можно заменить на

static propTypes = {
      updateInterval: PropTypes.number
    }

  //создали поле SwapiService в котором проинициализируем 
  // проинициализируем екземпляр класса (new SwapiService());
  SwapiService = new SwapiService();

  //до загрузки данных planet это просто пустой обьект
  state = {
    planet: {},
    loading: true,
    error: false
  }

  //Первый раз конструктор вызовет updatePlanet() при 
  //создании компонента а далее через интервал каждые 2,5сек
  //Если компонент будет перемонтироваться несколько раз
  // например кнопкой показать-скрыть компонент
  //каждый раз будет создаваться новый длополнительный setInterval()
  // чтобы этого небыло присваиваем интервалу id --> this.interval
  //а потом будем "уничтожать" этот setInterval по шв
  //перед демонтированием компонента(жизненый цикл)
  //Код из конструктора перенесли в метод жизненогоцикла componentDidMount()
  // что бы запрос к серверу производился только после иницилизации компонента
  //и DOM елементы находяться на странице
  componentDidMount() {
    const { updateInterval } = this.props;
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, updateInterval);
  }

  //Метод жизненого цикла componentWillUnmount удаляет
  //запущеный интервал в момент перед удалением компонента, который
  //пока еще отображаеться на странице
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // Ф-ия onPlanetLoaded получает планету
  // и устанавливает в stete уже выбраныенужные 
  // и отредактированые данные
  // и убырает индикатор загрузки
  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false
    })
  }


  //Ф-ия onError в случае получения ошибки с сервера
  // в state изменит  error: true, для отображения в компоненте 
  //картинки и сообщения об ошибке  <ErrorIndicator />
  //иначе страница упадет
  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    })
  }

  //В ф-ии updatePlanet() в константе (const id)
  //генерируем рамдомное округленное число от 2 до 27
  //вызваем SwapiService
  //из которого вызываем ф-ию getPlanet(id) и передаем ей id 
  //а потом после получения обьекта с данными о планете с сервера  
  // вызваем onPlanetLoaded которая установит новый state
  //добавим в updatePlanet catch которрый вызовет ф-ию onError
  // для обработки ошибок
  updatePlanet = () => {
    const id = Math.floor(Math.random() * 17) + 3;
    this.SwapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  };

  //далее редеряться данные с учетом вытянутых 
  // из state данных с помощью деструктуризации
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



//Создали отдельный компонент <PlanetView/> который отвечает
//только за отрисовку данных  после их получения с сервера
//логика получения данных и т.д. в нем отсутствует
//это принцип разделение обязаностей компонентов 
const PlanetView = ({ planet }) => {

  //достаем нужные поля из { planet } переданой в props 
  const { id, name, population,
    rotationPeriod, diameter
  } = planet;

  //Обернули jsx код в <React.Fragment> что бы не создавать 
  //дополнительный родительский div
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
