import React from 'react';

function PopupWithForm(props) {
    return (
        <section className={`popup popup_function_${props.name} ${props.isOpen ? 'popup_opened' : false}`}>
            <div className={`popup__container popup__container_function_${props.name}`}>
                <button className="popup__close" onClick={props.onClose} type="button"></button>
                <h2 className="popup__title">{props.title}</h2>
                <form className="popup__form" name={`popup-form-${props.name}`} noValidate>
                    <fieldset className="popup__input-area">
                        <>{props.children}</>
                        <button className="popup__submit-btn" type="submit">{props.buttonName}</button>
                    </fieldset>
                </form>
            </div>
        </section>
    )
}

export default PopupWithForm;