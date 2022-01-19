import React from 'react';
import ItemList from '../item-list';
import {
  withData,
  withSwapiService,
  withChildFunction,
  compose } from '../hoc-helpers';


// В етом файле создали компоненты которые
//будут отображать списки для каждого вида елементов



//В const поместили render ф-ии которые передадим в Child каждому из компонентов
const renderName = ({ name }) => <span>{name}</span>;
const renderModelAndName = ({ model, name }) => <span>{name} ({model})</span>;

// HOC mapPersonMethodsToProps принимает в аргументах swapiService
//достает из него нужную ф-ию (например getAllPeople)
// и возвращяет ее под нужным именем (getData) для PersonList

const mapPersonMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPeople
  };
};

const mapPlanetMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPlanets
  };
};

const mapStarshipMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllStarships
  };
};

//В каждом компоненте за основу берем ItemList,
//затем  ItemList проходит через ф-ию withChildFunction
// Это создает новый компонент у которого установлена ф-ия renderName
// которая будет рендерить нам Child елементы етого списка
//потом созданый компонент передаем в ф-ию withData которая обернет его  в более сложный 
// компонент , который занимаеться получением данных и обработкой ошибок
//и в конце обернем полученый результат в withSwapiService который вторым аргументом
//принемает ф-ию mapPersonMethodsToProps, которая передает в обернутій компонент 
//не весь swapiService, а только нужные ф-ии под нужным именем 
//ну а withSwapiService достает swapiService из контекста и передает его в обернутый компонент

const PersonList = compose(
  withSwapiService(mapPersonMethodsToProps),
  withData,
  withChildFunction(renderName)
)(ItemList);

const PlanetList = compose(
  withSwapiService(mapPlanetMethodsToProps),
  withData,
  withChildFunction(renderName)
)(ItemList);

const StarshipList = compose(
    withSwapiService(mapStarshipMethodsToProps),
    withData,
    withChildFunction(renderModelAndName)
  )(ItemList);


export {
  PersonList,
  PlanetList,
  StarshipList
};
