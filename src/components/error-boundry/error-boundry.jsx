import React, { Component } from 'react';

import ErrorIndicator from '../error-indicator'

import './error-boundry.css';

//Данный компонент будет обертывать наши любые компоненты
//которые будут передаваться ему в тело <ErrorBoundry>Тело<ErrorBoundry/>
//а доступ к компоненту из ТЕЛА получим через (this.props.children)
//В <ErrorBoundry> можно оборачивать любой вложености компонент
//что бы не падало все целяком
export default class ErrorBoundry extends Component {

  state = {
    hasError: false
  };

  //Если компонент вернет ошибку, этот метод 
  //словит в рендеринге или жизненом цикле React компонента и 
  //установит в state  hasError: true а метод жизненого цикла  
  //componentDidCatch() словит ошибку
  // конкретно в этом компоненте и не даст сломаться всему  приложению
  componentDidCatch() {
    this.setState({
      hasError: true
    });
  }

  render() {
    // Если в state hasError: true, то вместо компонента 
    // отрендарим <ErrorIndicator />
    if(this.state.hasError){
      return <ErrorIndicator/>
    }
    return this.props.children;
  }
}

 