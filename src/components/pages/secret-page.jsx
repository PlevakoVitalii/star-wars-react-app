import React from 'react';
import { Navigate } from 'react-router-dom';

//Страница к которой будут иметь  доступ только залогиненые пользователи

const SecretPage = ({ isLoggedIn }) => {

  if (isLoggedIn) {
    return (
      <div className="jumbotron text-center">
        <h3>This page is full of secrets!!!</h3>
      </div>
    );
  }

  return <Navigate to="/login" />;

};

export default SecretPage;
