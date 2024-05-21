import { event } from 'jquery';
import './pages/index.css';
import { initialCards, addCard, expandImage, like, deleteCard } from "./scripts/cards.js";
import { openPopup, closePopup, handleFormSubmit, addCardSubmit} from './scripts/popups.js';

export const cardTemplate = document.querySelector('#card-template').content;
export const place = document.querySelector('.places__list');

initialCards.forEach((element) => {
  place.append(addCard(element.name, element.link, deleteCard, like, expandImage));
  })

const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupClosers = document.querySelectorAll('.popup__close');

profileEditButton.addEventListener('click', () => {
  openPopup(popupProfileEdit);
  formProfile.elements.name.value = document.querySelector('.profile__title').textContent;
  formProfile.elements.description.value = document.querySelector('.profile__description').textContent;
});
addCardButton.addEventListener('click', () => {
openPopup(popupAddCard);
});

popupClosers.forEach((popupCloser) => {
  popupCloser.addEventListener('click', (event) => {
    event.stopPropagation();
    closePopup();
  })
});

export const formProfile = document.forms['edit-profile'];
formProfile.addEventListener('submit', handleFormSubmit); 

export const formCard = document.forms['new-place'];
formCard.addEventListener('submit', addCardSubmit);