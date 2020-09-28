
/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  constructor(){
    this.URL = '/user';
  }
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    const userKeys = Object.keys(user);
    const userValue = Object.values(user);
    localStorage.user = `{${userKeys[0]}: ${userValue[0]}, ${userKeys[1]}: ${userValue[1]}}`;
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.clear();
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    const user = localStorage.getItem('user');
    if (user !== null) return user;
    return undefined;
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = f => f ) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', `/user/current`);  /// сначала вместо /user писал User.URL или this.URL, но Network был показан путь как undefined/current  Почему так выходит?
    xhr.addEventListener('readystatechange', () => {
      if( xhr.readyState === 4 && xhr.status === 200){
        callback(response => {
          if (response.success === true){
            User.current().response.user.name
          } else if (response.success === false){
            User.unsetCurrent();
          }
        })
      } else if (xhr.readyState === 4 && xhr.status === 500){
        callback(response);
      }
    })
    xhr.send(data);
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = f => f ) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', `/user/login`)
    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === 4 && xhr.status === 200){
        callback(response => {
          if (response.success === true){
            let {name, id} = response.user;
            let userSet = {
              id: id,
              name: name,
            };
            User.setCurrent(userSet);
          };
        })
      }
    })
    xhr.send(data);
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f ) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', `/user/register`);
    xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === 4 && xhr.status === 200){
      callback(response => {
        if (response.success === true){
          let {name, id} = response.user;
          let userSet = {
            id: id,
            name: name,
          };
          User.setCurrent(userSet);
        };
      })
    };
    });
    xhr.send(data);
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f ) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', `/user/logout`);
    xhr.addEventListener('readystatechange', () => {
      callback(response => {
        if (response.success === true){
          User.unsetCurrent();
        }
      })
    })
    xhr.send(data);
  }
}

