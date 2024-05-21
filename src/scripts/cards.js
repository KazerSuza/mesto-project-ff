import { cardTemplate } from "../index.js";
import { openPopup } from "./popups.js";

const arhyz = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg', import.meta.url);
const chelyabinsk = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg', import.meta.url);
const ivanovo = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg', import.meta.url);
const kamchatka = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg', import.meta.url);
const holmogory = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg', import.meta.url);
const baikal = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg', import.meta.url);

export const initialCards = [
    {
      name: "Архыз",
      link: arhyz,
    },
    {
      name: "Челябинская область",
      link: chelyabinsk,
    },
    {
      name: "Иваново",
      link: ivanovo,
    },
    {
      name: "Камчатка",
      link: kamchatka,
    },
    {
      name: "Холмогорский район",
      link: holmogory,
    },
    {
      name: "Байкал",
      link: baikal,
    }
];

export function addCard(name, link, deleteCard, likeFunction, expandImageFunction) {
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

 export function expandImage(name, src) {
  const popupImage = document.querySelector('.popup_type_image');
  const image = document.querySelector('.popup__image');
  const caption = document.querySelector('.popup__caption');
  image.src = src;
  caption.textContent = name;
  openPopup(popupImage);
}

export function like(event) {
  event.target.classList.toggle('card__like-button_is-active');
}

export function deleteCard(event) {
  const card = event.target.closest('.card');
  card.remove();
}