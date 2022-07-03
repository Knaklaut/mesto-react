import React, { useEffect } from 'react';
import '../index.css';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeletePlacePopup from './DeletePlacePopup.js';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = React.useState({isOpen: false, element: {}});
  const [isDataSaving, setIsDataSaving] = React.useState(false);
  const [confirmCardDeletion, setConfirmCardDeletion] = React.useState({isOpen: false, card: {}});

  React.useEffect(() => {
    api.getUserInfo()
      .then(data => {
        setCurrentUser(data);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  React.useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  React.useEffect(() => {
    if(isEditAvatarPopupOpen || isEditProfilePopupOpen || isCardPopupOpen || isAddPlacePopupOpen || confirmCardDeletion) {
      function handleEscClose(evt) {
        if(evt.key === 'Escape') {
          closeAllPopups();
        }
      }
      document.addEventListener('keydown', handleEscClose);
      
      return () => {
        document.removeEventListener('keydown', handleEscClose);
      }
    }
  }, [isEditAvatarPopupOpen, isEditProfilePopupOpen, isCardPopupOpen, isAddPlacePopupOpen, confirmCardDeletion]);

  function handleChangeAvatar() {
    setEditAvatarPopupOpen(true);
  }

  function handleChangeProfile() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlace() {
    setAddPlacePopupOpen(true);
  }

  function handleOpenCard(card) {
    setIsCardPopupOpen({ ...isCardPopupOpen, element: card, isOpen: true });
  }

  function handleDeletePlace(card) {
    setConfirmCardDeletion({ ...confirmCardDeletion, card: card, isOpen: true });
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setIsCardPopupOpen({ ...isCardPopupOpen, isOpen: false });
    setConfirmCardDeletion({ ...confirmCardDeletion, isOpen: false });
  }

  function handleUpdateAvatar(updatedAvatar) {
    setIsDataSaving(true);
    api.changeAvatar(updatedAvatar)
      .then((data) => {
        setCurrentUser({ ...currentUser, avatar: data.avatar });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsDataSaving(false);
      });
  }

  function handleUpdateUser(updatedUserInfo) {
    setIsDataSaving(true);
    api.updateUserInfo(updatedUserInfo)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsDataSaving(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards(cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    setIsDataSaving(true);
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id === card._id ? false : true));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsDataSaving(false);
      });
  }

  function handleAddPlaceSubmit(newPlaceInfo) {
    setIsDataSaving(true);
    api.postNewCard(newPlaceInfo)
      .then((newPlace) => {
        setCards([newPlace, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsDataSaving(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={ currentUser }>
    <div className="page">
      <Header />
      <Main
        onChangeAvatar = { handleChangeAvatar }
        onChangeProfile = { handleChangeProfile }
        onAddPlace = { handleAddPlace }
        cards = { cards }
        onCardClick = { handleOpenCard }
        onCardLike = { handleCardLike }
        onDeletePlace = { handleDeletePlace }
      />
      <Footer />

      <ImagePopup card={ isCardPopupOpen } onClose={ closeAllPopups } />

      <EditProfilePopup 
        isOpen = { isEditProfilePopupOpen }
        onClose = { closeAllPopups }
        onUpdateUser = { handleUpdateUser }
        isSaving = { isDataSaving }
      />

      <EditAvatarPopup 
        isOpen = { isEditAvatarPopupOpen }
        onClose = { closeAllPopups }
        onUpdateAvatar = { handleUpdateAvatar }
        isSaving = { isDataSaving }
      />

      <AddPlacePopup
        isOpen = { isAddPlacePopupOpen }
        onClose = { closeAllPopups }
        onAddPlace = { handleAddPlaceSubmit }
        isSaving = { isDataSaving }
      />

      <DeletePlacePopup
        deleteCard = { confirmCardDeletion }
        onClose = { closeAllPopups }
        onDeletePlace = { handleCardDelete }
        isSaving = { isDataSaving }
      />

    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
