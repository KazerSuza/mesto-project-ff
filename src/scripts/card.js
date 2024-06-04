import { deleteLike, putLike, removeCard } from "./api";

const cardTemplate = document.querySelector('#card-template').content;

export function addCard(card, deleteCard, likeFunction, expandImageFunction, userId) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likesCounter = cardElement.querySelector('.card__likes-counter');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  let likedCard = card.likes.some(like => like._id === userId);
  
  if (likedCard) {
    likeButton.classList.add("card__like-button_is-active");
  } else { 
    likeButton.classList.remove("card__like-button_is-active");
  }

  likesCounter.textContent = card.likes.length;
  cardTitle.textContent = card.name;
  cardImage.alt = card.name;
  cardImage.src = card.link;
  cardElement.id = card._id;
  
  deleteButton.addEventListener('click',(event) => {
    deleteCard(event, cardElement.id)
  });
  if (card.owner._id !== userId) {
    deleteButton.remove();
  }

  likeButton.addEventListener('click', () => 
    {likeFunction(cardElement.id, likeButton, likesCounter)
    });

  cardImage.addEventListener('click', () => {
    expandImageFunction(card.name, cardImage.src);
  });

  return cardElement;
}

export function likeFunction(card, likeButton, likesCounter) {
  const likedCard = likeButton.classList.contains('card__like-button_is-active');

  if (likedCard) {
    deleteLike(card)
      .then((refreshed) => {
        likeButton.classList.remove('card__like-button_is-active');
        likesCounter.textContent = refreshed.likes.length;
      })
      .catch((err) => {
        console.log('Ошибка снятия лайка:', err)
      })
  } else {
    putLike(card)
      .then((refreshed) => {
        likeButton.classList.add('card__like-button_is-active');
        likesCounter.textContent = refreshed.likes.length;
      })
      .catch((err) => {
        console.log('Ошибка добавления лайка:', err)
      })
  }
}

export function deleteCard(event, id) {
  
  removeCard(id)
    .then(() => {
      event.target.closest('.card').remove();
    })
    .catch((err) => {
      console.log('Error', err)
    })
}