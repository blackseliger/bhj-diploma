const { response } = require("express");

/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const {url, headers = undefined, data = null, responseType, method, callback} = options;
    let xhr =  new XMLHttpRequest();
    let methodCheck = true;
    xhr.responseType = `${responseType}`;
    xhr.withCredentials = true;
    if ( headers !== undefined) {
        const keyHeader = Object.keys(headers);
        const valueHeader = Object.values(headers);
        xhr.setRequestHeader(`${keyHeader}`, `${valueHeader}`);
    };

    if (method === `GET`){
        if (data !== null) {
            xhr.open(`${method}`, `${url}?mail=${data.mail}=${data.password}`);
        } else {
            xhr.open(`${method}`, `${url}`);
        };   
    } else {
        let formData = new FormData();
        formData.append('mail', `${data.mail}`);
        formData.append('password', `${data.password}`);
        xhr.open(`${method}`, `${url}`);
        methodCheck = false;

    }

    xhr.addEventListener('readystatechange', () => {
        if (this.readyState === 4 && this.status === 200){
            let data = JSON.parse(this.response);
            callback(console.log(`С данными все хорошо,  ${data}`));
            return data;
        } else if (this.status === 400 || this.status === 500){
            callback(console.log(`Произошла ошибка,  ${this.status}`));
        }
    });
    (methodCheck === true) ? xhr.send() : xhr.send(formData)
};

// как осуществлять проверку написанного?