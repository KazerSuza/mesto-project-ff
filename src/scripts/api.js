const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-14',
  headers: {
    authorization: 'bcbaa021-a148-43a7-937c-5a065ec8f81c',
    'Content-Type': 'application/json'
  }
}
/*Прошу прощения за неисправленные замечания, это была не наглость. Ошибку в api.js я проглядел,
а с closePopup не разобрался. Был уверен что о finally и шла речь, раз надо было после 
ответа от сервера обработать.*/

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
} 

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(checkResponse)
} 

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(checkResponse)
}

export const changeUserName = (userData) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(userData)
  })
  .then(checkResponse)
}

export const postNewCard = (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(cardData)
  })
  .then(checkResponse)
}

export const changeAvatar = (userData) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(userData)
  })
  .then(checkResponse)
}

export const removeCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then(checkResponse)
}

export const putLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  })
  .then(checkResponse)
}

export const deleteLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then(checkResponse)
}