

class Api {
  constructor({ address, token, groupId }) {
    // стандартная реализация -- объект options
    this._token = token;
    this._groupId = groupId;
    this._address = address;

    // Запросы в примере работы выполняются к старому Api, в новом URL изменены.
  }

  getAppInfo() {
    return Promise.all([this.getUserInfo()]);
  }


  getUserInfo() {
    console.log('getUserInfo jwt', this._token);
    return fetch(`${this._address}/users/me`, {
      headers: {
        authorization: this._token,
      },
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }


}

const api = new Api({
  address: '/api',
  groupId: '',
  token: '',
});

export default api;
