export function addCard(name, link, deleteCard, likeFunction, expandImageFunction) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  cardElement.querySelector('.card__title').textContent = name;
  cardImage.alt = name;
  cardImage.src = link;
  deleteButton.addEventListener('click', deleteCard);
  cardElement.querySelector('.card__like-button').addEventListener('click', likeFunction);
  cardImage.addEventListener('click', () => {
    expandImageFunction(name, cardImage.src);
  });
  return cardElement;
}

export function likeCard(event) {
  event.target.classList.toggle('card__like-button_is-active');
}

export function deleteCard(event) {
  const card = event.target.closest('.card');
  card.remove();
}