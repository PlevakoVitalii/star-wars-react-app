//создали класс сервис для работы с сетью
//получение данных с базы данных

export default class SwapiService {

  //создали переменные (отдельные поля класса) _apiBase и _imageBase
  // что бы не дублировать url
  _apiBase = 'https://swapi.dev/api';
  _imageBase = 'https://starwars-visualguide.com/assets/img';


  //асинхр. функция делает fetch запрос по url
  //эта ф-ия стрелка для сохранения контекста
  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`)

    //проверяем если результат не ok (т.е. 200-299) то вернем
    //ошибку new Error()
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }

    //иначе  вернуть res.json() - результат преобразованый в JSON
    return await res.json();
  }

  //далее создали ф-ии для получения всех людей, планет и кораблей
  //и отдельно каждого человека, корабля и планеты
  //ето асинхронные ф-ии которые дождутся ответа от 
  // ф-ии getResource(`/people/`) 
  // и в конце вернут данные преобразованые с помощью  _transformPerson(person)
  // и таких же ф-ий для кораблей и планет 
  //все они являються ф-иями стрелками, для того что бы, где бы 
  //мы их не вызывали, контекстом было то место где их вызывают

  getAllPeople = async () => { 
    const res = await this.getResource(`/people/`);
    return res.results.map(this._transformPerson);
  };

  getPerson = async (id) => {
    const person = await this.getResource(`/people/${id}`);
    return this._transformPerson(person);
  };

  getAllPlanets = async () => {
    const res = await this.getResource(`/planets/`);
    return res.results.map(this._transformPlanet)
  }

  getPlanet = async (id) => {
    const planet = await this.getResource(`/planets/${id}`);
    return this._transformPlanet(planet);
  }

  getAllStarships = async () => {
    const res = await this.getResource(`/starships/`);
    return res.results.map(this._transformStarship)
  }

  getStarship = async (id) => {
    const starship = await this.getResource(`/starships/${id}`);
    return this._transformStarship(starship);
  }

//Создали ф-ии которые будут возвращать картинки по 
// заданому {id}
  getPersonImage=({id})=>{
    return  `${this._imageBase}/characters/${id}.jpg`
  }

  getStarshipImage = ({id}) => {
    return `${this._imageBase}/starships/${id}.jpg`
  };

  getPlanetImage = ({id}) => {
    return `${this._imageBase}/planets/${id}.jpg`
  };


  // Из url, которы который содержиться в обькте данных извлекаем последние две цифры
  // и присваиваем их с помощью регулярного выражения 
  _extractId = (item) => {
    const idRegEx = /\/([0-9]*)\/$/;
    return item.url.match(idRegEx)[1];
  }


  //Ф-ия  _transformPlanet(planet) берет полученые данные 
  // с сервера и преобразует их в нужный формат
  // 1) rotationPeriod: planet.rotation_period - приеоразует 
  // полученные данные в нужной формат записи (кэмл.кайс, подчеркивание и т.д.)
  // 2) Вибирает только нужные данные из обьекта данных
  // 3) Т.к. обьект данных не содержит id берем его из ф-ии _extrtactId(planet)

  _transformPlanet = (planet) => {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    }
  }

  //Такая же ф-ия для по выбору нужных данных из
  //полученого ответа с сервера для кораблей
  _transformStarship = (starship) => {
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.costInCredits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargoCapacity
    }
  }



  //Такая же ф-ия для по выбору нужных данных из
  //полученого ответа с сервера для людей
  _transformPerson = (person) => {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color
    }
  }
}





