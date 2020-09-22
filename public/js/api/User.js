/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {

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
    const response = createRequest({
      url: "",
      data,
      responseType: "json",
      method: "GET",
      callback: (err, response) => {
        if (err) console.log("Ошибка, если есть", err);
        else console.log("Данные, если нет ошибки", response);
      },
    });
    console.log(data);
    if ( data !== undefined) {
      console.log(data)
    } // это совсе не то что нужно, но не понимаю как пользоваться функцией createRequest в этом методе
    // как работает параметр callback, каким образом он получает responce или error?
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = f => f ) {

  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f ) {
  
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f ) {

  }
}



const user = {
  id: 12,
  name: 'Vlad'
};

User.setCurrent( user );

User.fetch(User.current(), ( err, response ) => {
  console.log(response); 
});