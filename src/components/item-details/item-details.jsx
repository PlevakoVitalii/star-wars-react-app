import React, { Component } from 'react';

import ErrorButton from '../error-button';



import './item-details.css';

//Создали компонент Record который описывает что именно будет отображаться
//внутри компонента  описания елемента (  )
//field и label получаем в пропсах, а
//а item мы не можем передать сверху в пропсах т.к. item появляеться 
//только после запроса getData из этого компонента
//поэтому item добавляем в Record в ф-ии React.cloneElement(child, { item })
const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};

export {
  Record
};

//Используем ItemDetails как универсальный компонент рендеринга  деталей елементов
//и для кораблей и для плпнет и людей, что бы не дублировать код
//ItemDetails даже не делает запрос к серверу, это делает SwapiService

export default class ItemDetails extends Component {


  state = {
    item: null,
    image: null
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId ||
      this.props.getData !== prevProps.getData ||
      this.props.getImageUrl !== prevProps.getImageUrl) {
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) {
      return
    }
    getData(itemId)
      .then((item) => {
        this.setState({
          item,
          image: getImageUrl(item)
        });
      });
  }

  render() {

    const { item, image } = this.state;
    //Если в state нет item, выведем сообщение
    if (!item) {
      return <span>Select a person from a list</span>;
    }

    const { name } = item;

    return (
      <div className="item-details card">
        <img className="item-image"
          src={image}
          alt="item" />

        <div className="card-body">
          <h4>{name} {this.props.personId}</h4>
          <ul className="list-group list-group-flush">

            {/* Ф-ия  React.Children.map пройдеться по всем children елементам
          вернет их копию благодаря React.cloneElement и каждой копии елемента child добавит дополнительное св-во { item }
          */}
            {
              React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, { item });
              })
            }
          </ul>
          <ErrorButton />
        </div>
      </div>
    )
  }
}




