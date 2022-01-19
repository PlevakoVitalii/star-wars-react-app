import React from 'react';

import ItemDetails, { Record } from '../item-details';

import { SwapiServiceConsumer } from '../swapi-service-context';

import { useParams } from "react-router-dom";

const StarshipDetails = () => {

  let { id } = useParams();
  return (

    <SwapiServiceConsumer>
      {
        ({ getStarship, getStarshipImage }) => {
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

