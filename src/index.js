import { event } from 'jquery';
import './pages/index.css';
import { initialCards } from "./scripts/cards.js";
import { openPopup, closePopup } from './scripts/modal.js';
import { addCard, likeCard, deleteCard } from './scripts/card.js';

const place = document.querySelector('.places__list');
const formProfile = document.forms['edit-profile'];
const formCard = document.forms['new-place'];
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupsClosures = document.querySelectorAll('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const placeInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_url');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

function expandImage(name, src) {
  const popupImageContainer = document.querySelector('.popup_type_image');
  const popupImage = document.querySelector('.popup__image');
  const popupImageCaption = document.querySelector('.popup__caption');
  popupImage.src = src;
  popupImage.alt = name;
  popupImageCaption.textContent = name;
  openPopup(popupImageContainer);
};

function editProfileSubmit(event) {
  event.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  closePopup(popupProfileEdit);
}

function addCardSubmit(event) {
  event.preventDefault();
  const name = placeInput.value;
  const link = linkInput.value;
  place.prepend(addCard(name, link, deleteCard, likeCard, expandImage));
  closePopup(popupAddCard);
  };

initialCards.forEach((element) => {
  place.append(addCard(element.name, element.link, deleteCard, likeCard, expandImage));
  })

profileEditButton.addEventListener('click', () => {
  openPopup(popupProfileEdit);
  formProfile.reset();
  formProfile.elements.name.value = profileTitle.textContent;
  formProfile.elements.description.value = profileDescription.textContent;
});

addCardButton.addEventListener('click', () => {
openPopup(popupAddCard);
formCard.reset();
});

popupsClosures.forEach((popupsClosure) => {
  popupsClosure.addEventListener('click', (event) => {
    event.preventDefault()
    const popup = popupsClosure.closest('.popup_is-opened');
    closePopup(popup);
  })
});

formProfile.addEventListener('submit', editProfileSubmit); 

formCard.addEventListener('submit', addCardSubmit);