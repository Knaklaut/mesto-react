import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function DeletePlacePopup({ deleteCard: { isOpen, card }, onClose, onDeletePlace, isSaving }) {
    function handleSubmit(evt) {
        evt.preventDefault();
        onDeletePlace(card);
    }

    return (
        <PopupWithForm title="Вы уверены?" name='delete-photo' isOpen={ isOpen } onClose={ onClose } buttonName={ isSaving ? 'Удаление...' : 'Да' } onSubmit={ handleSubmit } />
    );
}

export default DeletePlacePopup;