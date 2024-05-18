import './pages/index.css';
import { initialCards } from "./scripts/cards.js";

const cardTemplate = document.querySelector('#card-template').content;
const place = document.querySelector('.places__list');

function addCard(name, link, deleteCard) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');

  cardElement.querySelector('.card__title').textContent = name;
  cardImage.alt = name;
  cardImage.src = link;
  deleteButton.addEventListener('click', deleteCard);

  return cardElement;
}

function deleteCard(event) {
  const card = event.target.closest('.card');
  card.remove();
}

initialCards.forEach((element) => {
  place.append(addCard(element.name, element.link, deleteCard));
  })
