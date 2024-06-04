import "./pages/index.css";
import { openPopup, closePopup } from "./scripts/modal.js";
import { addCard, likeFunction, deleteCard } from "./scripts/card.js";
import {
  enableValidation,
  clearValidation,
} from "./scripts/validation.js";
import {
  getInitialCards,
  getUserInfo,
  changeUserName,
  postNewCard,
  changeAvatar,
} from "./scripts/api.js";

//переменные
const place = document.querySelector(".places__list");
const formProfile = document.forms["edit-profile"];
const formCard = document.forms["new-place"];
const formAvatar = document.forms["avatar-form"];
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const popupProfileEdit = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupsClosures = document.querySelectorAll(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const placeInput = document.querySelector(".popup__input_type_card-name");
const linkInput = document.querySelector(".popup__input_type_url");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const avatarButton = document.querySelector(".profile__image-changer");
const popupAvatar = document.querySelector(".popup_type_avatar");
const profileAvatar = document.querySelector(".profile__image");
const popupImageContainer = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");
const inputAvatar = document.querySelector(".popup__input-avatar");
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_active'
}
let userId = "";

//функции
enableValidation(validationConfig);

Promise.all([getInitialCards(), getUserInfo()])
  .then(([initialCards, userInfo]) => {
    let userAvatar = "";
    userId = userInfo._id;
    userAvatar = userInfo.avatar;

    profileName.textContent = userInfo.name;
    profileJob.textContent = userInfo.about;
    profileAvatar.style.backgroundImage = `url(${userAvatar})`;

    initialCards.forEach((card) => {
      const newCard = addCard(
        card,
        deleteCard,
        likeFunction,
        expandImage,
        userId
      );
      place.append(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });

function expandImage(name, src) {
  popupImage.src = src;
  popupImage.alt = name;
  popupImageCaption.textContent = name;
  openPopup(popupImageContainer);
}
function addCardSubmit(event) {
  event.preventDefault();
  const name = placeInput.value;
  const link = linkInput.value;
  renderSaving(true);

  postNewCard({ name: name, link: link, owner: userId })
    .then((response) => {
      const newCard = addCard(
        response,
        deleteCard,
        likeFunction,
        expandImage,
        userId
      );
      place.prepend(newCard);
    })
    .catch((error) => console.error("Ошибка при создании карточки:", error))
    .finally(() => {
      renderSaving(false);
      closePopup(popupAddCard);
    });
}

function editProfileSubmit(event) {
  event.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  renderSaving(true);

  changeUserName({ name: nameValue, about: jobValue })
    .then(() => {
      profileName.textContent = nameValue;
      profileJob.textContent = jobValue;
    })
    .catch((error) => console.error("Ошибка при изменении профиля:", error))
    .finally(() => {
      renderSaving(false);
      closePopup(popupProfileEdit);
    });
}

function changeAvatarSubmit(event) {
  event.preventDefault();
  renderSaving(true);

  changeAvatar({ avatar: inputAvatar.value })
    .then((res) => {
      profileAvatar.style = `background-image: url(${res.avatar})`;
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => {
      renderSaving(false);
      closePopup(popupAvatar);
    });
}

function renderSaving(isSaving) {
  const popupActive = document.querySelector(".popup_is-opened");
  const saveButton = popupActive.querySelector(".popup__button");
  if (isSaving) {
    saveButton.textContent = "Cохранение...";
  } else {
    saveButton.textContent = "Сохранить";
  }
}

//слушатели
avatarButton.addEventListener("click", () => {
  openPopup(popupAvatar);
  formAvatar.reset();
  clearValidation(popupAvatar, validationConfig);
});

profileEditButton.addEventListener("click", () => {
  openPopup(popupProfileEdit);
  formProfile.reset();
  clearValidation(popupProfileEdit, validationConfig);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

addCardButton.addEventListener("click", () => {
  openPopup(popupAddCard);
  formCard.reset();
  clearValidation(popupAddCard, validationConfig);
});

popupsClosures.forEach((popupsClosure) => {
  popupsClosure.addEventListener("click", (event) => {
    event.preventDefault();
    const popup = popupsClosure.closest(".popup_is-opened");
    closePopup(popup);
  });
});

formProfile.addEventListener("submit", editProfileSubmit);

formCard.addEventListener("submit", addCardSubmit);

formAvatar.addEventListener("submit", changeAvatarSubmit);
