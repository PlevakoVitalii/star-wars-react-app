import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { PersonDetails, PersonList } from '../sw-components';
import Row from '../row';

const PeoplePage = () => {
  let navigate = useNavigate()
  let { id } = useParams();
  const path = "/people/"
  return (

    <Row
      left={<PersonList onItemSelected={(id) => navigate(`${path + id}`)} />}
      right={<PersonDetails itemId={id} />} />
  );
}

export default PeoplePage
