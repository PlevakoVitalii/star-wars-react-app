//Ф-ия compose приймет в аргументах набор ф-ий и какойто компонент
//набор ф-ий благодаря spred оператору (...funcs) превратит их в масив
 //а потом благодаря ф-ии reduceRight пройдеться п масиву етих ф-ий
 //в крайнюю правую передаст как аргумент оборачиваемій компонент
 //в следуюцюю ф-ию результат вічесления предідущей
 //и так далее и в конце вернет результат вічисления 
 //крайней левой ф-ии

const compose = (...funcs) => (comp) => {
  return funcs.reduceRight(
    (wrapped, f) => f(wrapped), comp);
};

export default compose;