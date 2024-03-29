class Api {
  constructor(data) {
    this._baseUrl = data.serverUrl;
    this._headers = data.headers;
  }

  //* Проверка статуса запроса
  _requestResult(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(
        `Что-то пошло не так: Ошибка ${response.status} - ${response.statusText}`
      );
    }
  }

  //* Запрос для получение данных профеля
  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers,
    })
      .then((response) => this._requestResult(response))
  }

  //* Запрос для обновление профиля
  editProfile(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((response) => this._requestResult(response));
  }

  //* Запрос для карточек
  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers,
    })
      .then((response) => this._requestResult(response))
  }

  //* Запрос для добавление карточек
  addNewCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((response) => this._requestResult(response));
  }

  //* Запрос для добавление лайков
  addCardLike(data) {
    return fetch(`${this._baseUrl}cards/likes/${data}`, {
      method: "PUT",
      headers: this._headers,
    }).then((response) => this._requestResult(response));
  }

  //* Запрос для удаление лайка карточки
  deleteCardLike(data) {
    return fetch(`${this._baseUrl}cards/likes/${data}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((response) => this._requestResult(response));
  }

  //* Запрос для удаление карточек
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((response) => this._requestResult(response));
  }

  //* Запрос для обновление аватара
  editAvatar(data) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((response) => this._requestResult(response));
  }
}

export default new Api({
  serverUrl: 'https://mesto.nomoreparties.co/v1/cohort-52/',
  headers: {
    authorization: "4313ac51-7853-47ce-b5c6-6d8de79244e3",
    "Content-Type": "application/json",
  },
});
