const cardTemplate = document.querySelector('#card-template').content;
const places = document.querySelector('.places__list')

function addCard(name, link, deleteCard) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button')

  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__image').src = link;
  deleteButton.addEventListener('click', (event) => deleteCard(event));

  return cardElement;
  
}

function deleteCard() {
  const card = event.target.closest('.card');
  card.remove();
}

initialCards.forEach(function(element) {
  places.append(addCard(element.name, element.link, deleteCard));
  })

