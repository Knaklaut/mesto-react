// Класс Api описывает функциональность для обмена данными с сервером
class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._token = headers['authorization'];
    this._userUrl = `${this._baseUrl}/users/me`;
    this._cardsUrl = `${this._baseUrl}/cards`;
    this._likesUrl = `${this._baseUrl}/cards/likes`;
  }

  _checkServerData(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getUserInfo() {
    return fetch(this._userUrl, {
      headers: this._headers
    })
    .then(this._checkServerData)
  }

  getInitialCards() {
    return fetch(this._cardsUrl, {
      headers: this._headers
    })
    .then(this._checkServerData)
  }

  updateUserInfo({ name, about }) {
    return fetch(this._userUrl, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name: name, about: about })
    })
    .then(this._checkServerData)
  }

  changeAvatar({ avatar }) {
    return fetch(`${this._userUrl}/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar: avatar })
    })
    .then(this._checkServerData)
  }

  postNewCard({ name, link }) {
    return fetch(this._cardsUrl, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name: name, link: link })
    })
    .then(this._checkServerData)
  }

  changeLikeCardStatus(cardId, isNotLiked) {
    return fetch(`${this._likesUrl}/${cardId}`, {
      method: isNotLiked ? 'PUT' : 'DELETE',
      headers: this._headers
    })
    .then(this._checkServerData)
  }

  deleteCard(cardId) {
    return fetch(`${this._cardsUrl}/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkServerData)
  }
}

// Создание экземпляра класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: 'c5343f9b-1222-4d59-8c9a-f8d4405cea98',
    'Content-Type': 'application/json'
  }
});

export default api;