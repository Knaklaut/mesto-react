import React from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({isOpen: false, element: {}});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({...selectedCard, isOpen: true, element: card});
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({...selectedCard, isOpen: false});
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditAvatar = {handleEditAvatarClick}
        onEditProfile = {handleEditProfileClick}
        onAddPlace = {handleAddPlaceClick}
        onCardClick = {handleCardClick}
      />
      <Footer />

      <PopupWithForm title="Редактировать профиль" name="user-info" isOpen={isEditProfilePopupOpen} buttonName="Сохранить" onClose={closeAllPopups}>
        <input id="name-input" type="text" className="popup__input popup__input_el_name" placeholder="Введите ваше имя" name="userName" minLength="2" maxLength="40" required />
        <span id="name-input-error" className="popup__input-error"></span>
        <input id="about-input" type="text" className="popup__input popup__input_el_about" placeholder="Введите вашу профессию" name="userAbout" minLength="2" maxLength="200" required />
        <span id="about-input-error" className="popup__input-error"></span>
      </PopupWithForm>

      <PopupWithForm title="Новое место" name="new-place-info" isOpen={isAddPlacePopupOpen} buttonName="Создать" onClose={closeAllPopups}>
        <input id="place-input" type="text" className="popup__input popup__input_el_place" placeholder="Название" name="name" minLength="2" maxLength="30" required />
        <span id="place-input-error" className="popup__input-error"></span>
        <input id="link-input" type="url" className="popup__input popup__input_el_link" placeholder="Ссылка на фото" name="link" required />  
        <span id="link-input-error" className="popup__input-error"></span>
      </PopupWithForm>

      <PopupWithForm title="Вы уверены?" name="confirm-deletion" buttonName="Да" />

      <PopupWithForm title="Обновить аватар" name="change-avatar" isOpen={isEditAvatarPopupOpen} buttonName="Сохранить" onClose={closeAllPopups}>
        <input id="avatar-input" type="url" className="popup__input popup__input_avatar_link" placeholder="Ссылка на аватар" name="url" required />
        <span id="avatar-input-error" className="popup__input-error"></span>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

    </div>
  );
}

export default App;
