import React from 'react';

import ItemDetails, { Record } from '../item-details';

import { SwapiServiceConsumer } from '../swapi-service-context';

// В етом файле создали компоненты которые
// будут отображать детали для каждого вида елементов

const PersonDetails = ({ itemId }) => {

  return (
    //Испозуем SwapiServiceConsumer для получения swapiService,
    // переданного через контекст из app.js из SwapiServiceProvider на
    //Дале деструктруируем из  swapiService нужные ф-ии {getPlanet, getPlanetImage}
    //По правилам SwapiServiceConsumer должен принимать ф-ию

    <SwapiServiceConsumer>
      {
        ({ getPerson, getPersonImage }) => {
          return (
            <ItemDetails
              itemId={itemId}
              getData={getPerson}
              getImageUrl={getPersonImage} >

              {/* Передаем в теле компонента <ItemDetails>
несколько компонентов <Record>, который определяет какие данные отображать,
а доступ к ним получим через (this.props.children)*/}
              {/* field - это поле в обьекте который возвращает ф-ия  _transformStarship
в SwapiService, а label - это просто название строки в компоненте при отрисовке на странице*/}
              <Record field="gender" label="Gender" />
              <Record field="eyeColor" label="Eye Color" />
            </ItemDetails>
          )
        }
      }

    </SwapiServiceConsumer>
  );
};

const PlanetDetails = ({ itemId }) => {
  return (
    <SwapiServiceConsumer>
      {
        ({ getPlanet, getPlanetImage }) => {
          return (
            <ItemDetails
              itemId={itemId}
              getData={getPlanet}
              getImageUrl={getPlanetImage}>

              <Record field="population" label="Population" />
              <Record field="rotationPeriod" label="Rotation Period" />
              <Record field="diameter" label="Diameter" />
            </ItemDetails>
          )
        }
      }
    </SwapiServiceConsumer>


  );
};

const StarshipDetails = ({ itemId }) => {
  return (

    <SwapiServiceConsumer>
      {
        ({ getStarship, getStarshipImage }) => {
          return (
            <ItemDetails
              itemId={itemId}
              getData={getStarship}
              getImageUrl={getStarshipImage}>

              <Record field="model" label="Model" />
              <Record field="length" label="Length" />
              <Record field="costInCredits" label="Cost" />
            </ItemDetails>
          )
        }
      }
    </SwapiServiceConsumer>
  );
};

export {
  PersonDetails,
  PlanetDetails,
  StarshipDetails
};

