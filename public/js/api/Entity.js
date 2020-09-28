


/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  constructor(){
  this.URL = '';

  }
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list( data, callback = f => f ) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', this.URL);
    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(xhr.response);
      } else if (xhr.readyState === 4 && xhr.status === 500) {
        callback(xhr.response);
      }
    })
    xhr.send(data);
    // createRequest({
    //   url:  Entity.URL,
    //   data,
    //   responseType: "json",
    //   method: "GET",
    //   callback,
    //   })
  };

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create( data, callback = f => f ) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', this.URL);
    let dataCopy = Object.assign(data);
    dataCopy._method = "PUT";
    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(xhr.response);
      } else if (xhr.readyState === 4 && xhr.status === 500){
        callback(xhr.response);
      }
      xhr.send(data);
    })
    // let dataCopy = Object.assign(data); // скопировал ради иммутабильности
    // dataCopy._method = "PUT";   // Спросить про свойство, т.к. в CR не учитывается такое свойство(1)
    // createRequest({
    //   url:  Entity.URL,
    //   dataCopy,
    //   responseType: "json",
    //   method: "POST",
    //   callback,
    //   })
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id = '', data, callback = f => f ) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    this.URL = id;
    xhr.open('GET', `/${this.URL}`);
    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(response);
      } else if (xhr.readyState === 4 && xhr.status === 200) {
        callback(response);
      }
    });
    xhr.send(data);
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
    xhr.open('POST', `${this.URL}`);
    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(response);
      } else if (xhr.readyState === 4 && xhr.status === 200) {
        callback(response);
      };
    });
    xhr.send(dataCopy);
  }
}



