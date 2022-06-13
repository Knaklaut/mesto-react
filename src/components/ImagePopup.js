function ImagePopup(props) {
    return (
        <section className={`popup popup_function_increase-photo ${props.card.isOpen ? 'popup_opened' : false}`}>
            <div className="popup__elements">
                <button className="popup__close" type="button" onClick={props.onClose}></button>
                <img className="popup__photo" src={props.card.element.link} alt={props.card.element.name} />
                <h2 className="popup__photo-title">{props.card.element.name}</h2>
            </div>
        </section>
    )
}

export default ImagePopup;