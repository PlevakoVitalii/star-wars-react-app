import React from "react";

import { SwapiServiceConsumer } from '../swapi-service-context';

// withSwapiService - это НОС который принимает компонент Wrapped
//который он обернет, и вернет компонент ф-ию, которая приймет props
//и вернет обернутый в SwapiServiceConsumer компонент Wrapped для передачи через контекс swapiService 
// также ф-ия передаст компоненту полученые в аргументах {...props} 
//и {...serviceProps} - ето те св-ва которые вернет ф-ия mapMethodsToProps
//Ф-ия mapMethodsToProps получает в аргументах swapiService 
//и в обернутый компонент достанет из swapiService только нужные для конкретного 
//компонента ф-ии 


//Форма записи  (withSwapiService) - єто ф-ия которая возвращает ф-ии
// Эта форма записи для читабельности, чтобы разнести аргументы в ряб последовательных ф-ий
//const add=(a+b)=>a+b и вызов ф-ии add(1,2) -- равносильно
//const add=(a)=>(b)=>a+b и вызов ф-ии add(1)(2)
const withSwapiService = (mapMethodsToProps) => (Wrapped) => {
  return (props) => {
    return (
      <SwapiServiceConsumer>
        {
          (swapiService) => {
            const serviceProps = mapMethodsToProps(swapiService);
            return (
              <Wrapped {...props} {...serviceProps} />
            )
          }
        }
      </SwapiServiceConsumer>
    )
  }
};

export default withSwapiService;