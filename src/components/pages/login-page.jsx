import React from 'react';
import { Navigate } from 'react-router-dom';

//Компонент для выполненя авторизации для доступа к SecretPage  

const LoginPage = ({ isLoggedIn, onLogin }) => {

  if (isLoggedIn) {
    return <Navigate to="/"/>;
  } 

  return (
    <div className="jumbotron">
      <p>Login to see secret page!</p>
      <button
        className="btn btn-primary"
        onClick={onLogin}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;
