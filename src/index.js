import { event } from 'jquery';
import './pages/index.css';
import { initialCards } from "./scripts/cards.js";

const cardTemplate = document.querySelector('#card-template').content;
const place = document.querySelector('.places__list');

function addCard(name, link, deleteCard, likeFunction, expandImageFunction) {
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

function expandImage(name, src) {
  const popupImage = document.querySelector('.popup_type_image');
  const image = document.querySelector('.popup__image');
  const caption = document.querySelector('.popup__caption');
  image.src = src;
  caption.textContent = name;
  openPopup(popupImage);
}

function like(event) {
  event.target.classList.toggle('card__like-button_is-active');
}

function deleteCard(event) {
  const card = event.target.closest('.card');
  card.remove();
}

initialCards.forEach((element) => {
  place.append(addCard(element.name, element.link, deleteCard, like, expandImage));
  })

//открытие и закрытие попапов
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupClosers = document.querySelectorAll('.popup__close');

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByEsc);
  document.addEventListener('click', closePopupByOverlay);
}

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

function closePopup() {
  const openedPopup = document.querySelector('.popup_is-opened');
  openedPopup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupByEsc);
  document.removeEventListener('click', closePopupByOverlay);
  formProfile.reset();
  formCard.reset();
};

function closePopupByOverlay(event) {
  const openedPopup = document.querySelector('.popup_is-opened');
  const isClickedOnOverlay = event.target === openedPopup;
  if (isClickedOnOverlay) {
    closePopup();
  };
};

function closePopupByEsc(event) {
  if (event.key === 'Escape') {
    closePopup();
  }
};

//Форма редактирования профиля
const formProfile = document.forms['edit-profile'];
const nameInput = formProfile.elements.name;
const jobInput = formProfile.elements.description;

function handleFormSubmit(event) {
  event.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  let profileName = document.querySelector('.profile__title');
  let profileJob = document.querySelector('.profile__description');
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  closePopup();
}

formProfile.addEventListener('submit', handleFormSubmit); 

//Форма добавления карточки
const formCard = document.forms['new-place'];
const placeInput = formCard.elements['place-name'];
const linkInput = formCard.elements['link'];

function addCardSubmit(event) {
  event.preventDefault();
  const name = placeInput.value;
  const link = linkInput.value;
  place.prepend(addCard(name, link, deleteCard, like, expandImage));
  closePopup();
  };

formCard.addEventListener('submit', addCardSubmit);