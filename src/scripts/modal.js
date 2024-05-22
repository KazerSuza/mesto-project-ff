export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByEsc);
  document.addEventListener('mousedown', closePopupByOverlay);
}

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupByEsc);
  document.removeEventListener('mousedown', closePopupByOverlay);
};

export function closePopupByOverlay(event) {
  const openedPopup = document.querySelector('.popup_is-opened');
  const isClickedOnOverlay = event.target === openedPopup;
  if (isClickedOnOverlay) {
    closePopup(openedPopup);
  };
};

export function closePopupByEsc(event) {
  const openedPopup = document.querySelector('.popup_is-opened');
  if (event.key === 'Escape') {
    closePopup(openedPopup);
  }
};
