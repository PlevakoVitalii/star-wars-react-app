import React from "react";

//Это НОС который принимае(берет) любой компонент Wrapped
//и задает ему в качестве Child заданую ф-ию fn
//а потом возвращает етот компонент


const withChildFunction = (fn) => (Wrapped) => {
  return (props) => {
    return (
      <Wrapped {...props}>
        {fn}
      </Wrapped>
    )
  };
};

export default withChildFunction;