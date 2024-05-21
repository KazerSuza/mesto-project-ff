import { formProfile, formCard, place } from "../index.js";
import { addCard, deleteCard, expandImage, like } from "./cards.js";

 export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByEsc);
  document.addEventListener('click', closePopupByOverlay);
}

export function closePopup() {
  const openedPopup = document.querySelector('.popup_is-opened');
  openedPopup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupByEsc);
  document.removeEventListener('click', closePopupByOverlay);
  formProfile.reset();
  formCard.reset();
};

export function closePopupByOverlay(event) {
  const openedPopup = document.querySelector('.popup_is-opened');
  const isClickedOnOverlay = event.target === openedPopup;
  if (isClickedOnOverlay) {
    closePopup();
  };
};

export function closePopupByEsc(event) {
  if (event.key === 'Escape') {
    closePopup();
  }
};

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

 export function handleFormSubmit(event) {
  event.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  let profileName = document.querySelector('.profile__title');
  let profileJob = document.querySelector('.profile__description');
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  closePopup();
}

const placeInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_url');

export function addCardSubmit(event) {
  event.preventDefault();
  const name = placeInput.value;
  const link = linkInput.value;
  place.prepend(addCard(name, link, deleteCard, like, expandImage));
  closePopup();
  };