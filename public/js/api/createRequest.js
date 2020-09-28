



/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const {url, headers = undefined, data = null, responseType, method, callback = (f) => f} = options;
    console.log(method);
    let xhr = new XMLHttpRequest();
    xhr.responseType = responseType;
    xhr.withCredentials = true;

        if (method === 'GET') {
            if (headers !== undefined) {
                const keyHeader = Object.keys(data);
                const valueHeader = Object.values(data);
                xhr.setRequestHeader(`${keyHeader}`, `${valueHeader}`);
            };
            if (data !== null) {
                xhr.open(method, `${url}?mail=${data.mail}&password=${data.password}`)
            } else {
                xhr.open(method, url);
            };
            xhr.addEventListener('readystatechange', () => {
                if (xhr.readyState === 4 && xhr.status === 200){
                    callback(xhr.response);
                } else if (xhr.readyState === 4 && xhr.status === 500){
                    callback(xhr.response);
                }
            })
            xhr.send();

        } else if (method === 'POST') {
            let formData = new FormData();
            formData.append('mail', data.mail);
            formData.append('password', data.password);
            xhr.open(method, url);
            xhr.addEventListener('readystatechange' , () => {
                if (xhr.readyState === 4 && xhr.status === 200){
                    callback(xhr.response);
                } else if (xhr.readyState === 4 && xhr.status === 500){
                    callback(xhr.response);
                }
            })
            xhr.send( formData );
        }
};



createRequest({
    url: "/user/login",
    data: {
      mail: "test@test",
      password: "12345",
    },
    responseType: "json",
    method: "POST",
    callback: (err, response) => {
      if (err) console.log("Ошибка, если есть", err);
      else console.log("Данные, если нет ошибки", response);
    },
  });

  createRequest({
    url: "/user/login",
    data: {
      mail: "test@test",
      password: "12345",
    },
    responseType: "json",
    method: "GET",
    callback: (err, response) => {
      if (err) console.log("Ошибка, если есть", err);
      else console.log("Данные, если нет ошибки", response);
    },
  });