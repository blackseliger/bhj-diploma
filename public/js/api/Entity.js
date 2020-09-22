/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {

  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list( data, callback = f => f ) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', `${Entity.URL}`);
    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === 4 && xhr.status === 200){
        try {
          let data = JSON.parse(xhr.response);
          return data;
        } catch (e) {
          callback(`Произошла ошибка ${data}`);
        }
      } 
    })
    xhr.send(data);
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create( data, callback = f => f ) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    let dataCopy = Object.assign(data); // скопировал ради иммутабильности
    dataCopy._method = "PUT";
    xhr.open('POST', `${Entity.URL}`);
    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === 4 && xhr.status === 200){
        try {
          let data = JSON.parse(xhr.response);
          return data;
        } catch (e) {
          callback(`Произошла ошибка ${data}`);
        }
      } 
    })
    xhr.send(dataCopy);
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id = '', data, callback = f => f ) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', `${Entity.URL}`);
    //  что делать с id нужно? Как с ним работать?                    !!!!!!!! Вопрос
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id = '', data, callback = f => f ) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    let dataCopy = Object.assign(data);
    dataCopy._method = "DELETE";
    dataCopy.id = 21;
    xhr.open('POST', `${Entity.URL}`);
    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === 4 && xhr.status === 200){
        try {
          let data = JSON.parse(xhr.response);
          return data;
        } catch (e) {
          callback(`Произошла ошибка ${data}`);
        }
      } 
    })
    xhr.send(dataCopy);
  }
}

