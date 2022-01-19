import React from "react";

import { SwapiServiceConsumer } from '../swapi-service-context';

// withSwapiService - это НОС который принимает компонент Wrapped для передачи через контекс swapiService 


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