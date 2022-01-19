import React from 'react';
import { StarshipList } from '../sw-components';

import { useNavigate } from "react-router-dom";

const StarshipsPage = () => {
  let navigate = useNavigate();
  return (
    <StarshipList
      onItemSelected={(id) => navigate(id)} />
  );
}



export default StarshipsPage;