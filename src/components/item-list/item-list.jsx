import React from 'react';
import PropTypes from 'prop-types'

import './item-list.css';


//Используем ItemList как универсальный компонент рендеринга  списка елементов
//и для кораблей и для плпнет и людей, что бы не дублировать код
//ItemList даже не делает запрос к серверу, это делает SwapiService

const ItemList = (props) => {

  const { data, onItemSelected, children: renderLabel } = props;

  //прошлись  map по полуенома обьекту данных
  //и для каждого елеента отрисуем <li></li>

  const items = data.map((item) => {

    //деструктурировали id из item
    const { id } = item

    //Создали const label котарая будет в себе содержать полученую 
    //из тела компонента <ItemList>ТЕЛО</ItemList> ф-ию, которая будет получать благодаря map 
    //каждые елемент списка поочередно и рендерить его на страние по разному
    //для разных сущьностей(люди, корабли, ...), учитывая разную форму шаблонных строк
    //которые мы передаем в теле компонента  <ItemList/>  в тех компонентах
    //Обращаемся к етой ф-ии через this.props.children(item)
    // const label = renderLabel(item)
    const label = renderLabel(item)

    return (
      <li className="list-group-item"
        key={id}
        onClick={() => onItemSelected(id)}>
        {label}
      </li>
    );
  });

  return (
    <ul className="item-list list-group">
      {items}
    </ul>
  );
};

// defaultProps определяет дефолные пропсі на то случай если
//в пропсах мі не передадим какието данные или ф-ию и при обращении к ним проект не упал
//здесь onItemSelected если не передать тото компонент 
  //получит undefinite вместо onItemSelected(), вызовет ее в приложени упадет
  //а так дефолное onItemSelected: () => { }, просто ничего не будет происходит при клике на елемент списка
ItemList.defaultProps = {
  onItemSelected: () => { }
}

ItemList.propTypes={
  onItemSelected:PropTypes.func,
  data:PropTypes.arrayOf(PropTypes.object).isRequired, // data - это массив обьектов, обязательное
  children:PropTypes.func.isRequired
}



export default ItemList;

