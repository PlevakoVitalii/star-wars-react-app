import React, { Component } from 'react';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator'


//Это НОС компонент высшего порядка который создает компоненты <View/>
//с передачей в них данных полученых  с сервера

const withData = (View) => {
  return class extends Component {

    state = {
      data: null,
      loading: true,
      error: false
    }
    //Ф-ии жизненного цикла componentDidUpdate контролирует 
    //измененени в getDate и если ф-ия для получения данніх обновилась
    //то скорее всего и данніе обновились
    componentDidUpdate(prevProps) {
      if (this.props.getData !== prevProps.getData) {
        this.update();
      }
    }


    //после того как компонент будет полностью проинициализирован,
    // это обеспечивает метод жизненого  цикла componentDidMount()
    //вызываем update()
    componentDidMount() {
      this.update()
    }

    //изменяя значения свойства (loading и error)  в state отрисуеться нужный елемент
    //достали из props ф-ию getData() которая "достает" из компонента SwapiService
    //нужные ф-ии запроса с сервера планет, кораблей или людей 
    //и потом (.then) устанавливает их в State.
    update() {
      this.setState({
        loading: true,
        error: false
      })
      this.props.getData()
        .then((data) => {
          this.setState({
            data,
            loading: false
          });
        })
        .catch(() => {
          this.setState({
            error: true,
            loading: false
          })
        });
    }


    render() {
      const { data, loading, error  } = this.state

      if (loading) {
        return <Spinner />
      }
      if (error) {
        return <ErrorIndicator />
      }

      return <View {...this.props} data={data} />
    }
  }
}

export default withData;