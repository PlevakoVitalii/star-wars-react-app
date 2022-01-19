import React from 'react';

import ItemDetails, { Record } from '../item-details';

import { SwapiServiceConsumer } from '../swapi-service-context';

import { useParams} from "react-router-dom";
// В етом файле создали компоненты которые
// будут отображать детали для PersonDetails

const StarshipDetails = () => {
  
// //Ф-ия благодаря хуку useParams() получит id из URL
// // и передасте ее в  <StarshipDetails itemId={id} />

  let { id } = useParams();
  return (
//Для передачи контекста (swapiService) можно исользовать props, Provider-Consumer или HOC
//В єто компоненте мі используем Provider-Consumer 
    //Испозуем SwapiServiceConsumer для получения swapiService,
    // переданного через контекст из app.js из SwapiServiceProvider на
    //Дале деструктруируем из  swapiService нужные ф-ии {getPlanet, getPlanetImage}
    //По правилам SwapiServiceConsumer должен принимать ф-ию
 

    <SwapiServiceConsumer>
      {
        ({ getStarship, getStarshipImage}) => {
          return (
            <ItemDetails
              itemId={id}
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


export default StarshipDetails;

