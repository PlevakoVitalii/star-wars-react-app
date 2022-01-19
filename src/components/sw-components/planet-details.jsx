import React from 'react';
import ItemDetails, { Record } from '../item-details';
import { withSwapiService } from '../hoc-helpers';
// В етом файле создали компоненты которые
// будут отображать детали для PlanetDetails

const PlanetDetails = (props) => {
  return (
    <ItemDetails {...props}>

      {/* Передаем в теле компонента <ItemDetails>
несколько компонентов <Record>, который определяет какие данные отображать,
а доступ к ним получим через (this.props.children)*/}
      {/* field - это поле в обьекте который возвращает ф-ия  _transformStarship
в SwapiService, а label - это просто название строки в компоненте при отрисовке на странице*/}

      <Record field="population" label="Population" />
      <Record field="rotationPeriod" label="Rotation Period" />
      <Record field="diameter" label="Diameter" />
    </ItemDetails>
  )
};

const mapMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getPlanet,
    getImageUrl: swapiService.getPlanetImage
  }
}

export default withSwapiService(mapMethodsToProps)(PlanetDetails);

