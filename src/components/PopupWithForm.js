import React from 'react';

function PopupWithForm({name, title, buttonName, children, isOpen, onClose}) {
    return (
        <section className={`popup popup_function_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className={`popup__container popup__container_function_${name}`}>
                <button className="popup__close" onClick={onClose} type="button" />
                <h2 className="popup__title">{title}</h2>
                <form className="popup__form" name={`popup-form-${name}`} noValidate>
                    <fieldset className="popup__input-area">
                        {children}
                        <button className="popup__submit-btn" type="submit">{buttonName}</button>
                    </fieldset>
                </form>
            </div>
        </section>
    )
}

export default PopupWithForm;