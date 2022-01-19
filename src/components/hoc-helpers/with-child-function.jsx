import React from "react";

//Это НОС который принимае(берет) любой компонент Wrapped
//и задает ему в качестве Child заданую ф-ию fn
//а потом возвращает етот компонент
//Делаем так чтобы не передавать в app.jsx в каждом компоненте <PlanetList/>...
//рендер ф-ии {({name})=><span>{name</span>}
const withChildFunction = (fn) => (Wrapped) => {
  return (props) => {
    return (
      <Wrapped {...props}>
        {fn}
      </Wrapped>
    )
  };
};

export default  withChildFunction;