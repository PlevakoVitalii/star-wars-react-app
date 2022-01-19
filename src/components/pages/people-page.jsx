import React from 'react';
import {useNavigate, useParams } from "react-router-dom";
// import { withRouter } from "react-router";
import { PersonDetails, PersonList } from '../sw-components';
import Row from '../row';

const PeoplePage =()=> { 
  let  navigate = useNavigate()
  let { id } = useParams();
  const path ="/people/"
    return (

      //  Используем компонент Row который отвечает за расположение на странице компонентов
      // т.к. компоненты (планеты, люди, корабли) подобны,
      // Функциональный компонент <Row /> расоложит для каждого из них список слева, подробности справа 
      <Row
        left={<PersonList onItemSelected={(id) =>  navigate(`${path+id}`)} />}
        right={<PersonDetails itemId={id} />} />
    );
  }

export default  PeoplePage
