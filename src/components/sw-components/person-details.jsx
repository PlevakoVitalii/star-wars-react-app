import React from 'react';
import ItemDetails, { Record } from '../item-details';
import { withSwapiService } from '../hoc-helpers'

// В етом файле создали компоненты которые
// будут отображать детали для PersonDetails

//Компонент PersonDetails возвращает ф-ия которая в аргументах получает
// itemId из props из app.js, и (getData, getImageUrl) из ф-ии mapMethodsToProps
// которая устанавливает правило какие ф-ии из swapiService и в каком виде нужны для PersonDetails
//это делаем что бы не передавать весь swapiService
//т.к. в props мы принимаем { itemId, getData, getImageUrl  } и дальше
//в <ItemDetails> мы передаем так же
// <ItemDetails itemId={itemId} getData={getData} getImageUrl={getData}>
//то заменим эти надписи на {props}

const PersonDetails = (props) => {
  return (
    <ItemDetails {...props} >

      {/* Передаем в теле компонента <ItemDetails>
несколько компонентов <Record>, который определяет какие данные отображать,
а доступ к ним получим через (this.props.children)*/}
      {/* field - это поле в обьекте который возвращает ф-ия  _transformStarship
в SwapiService, а label - это просто название строки в компоненте при отрисовке на странице*/}
      <Record field="gender" label="Gender" />
      <Record field="eyeColor" label="Eye Color" />
    </ItemDetails>
  );
};

const mapMethodsToProps = (swapiService) => {
  //Эта ф-ия mapMethodsToProps получает на вход swapiService
  //и определяет какие ф-ии достать для PersonDetails 
  // и как их назвать (getData:swapiService.getPerson)
  //что бы передать их дальше ItemDetails в props
  
    return {
      getData: swapiService.getPerson,
      getImageUrl: swapiService.getPersonImage
    }
  };


//Обернули компонент PersonDetails в НОС withSwapiService.
//Форма вызова ф-ии сооветсвует форме при создании ф-ии записи 
//const withSwapiService = (mapMethodsToProps) => (Wrapped) => {}
//в with-swapi-service.jsx
export default withSwapiService(mapMethodsToProps)(PersonDetails);


